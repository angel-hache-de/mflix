import React, { useCallback, useEffect, useState } from "react";
import { Grid, Pagination, Skeleton } from "@mui/material";

import { GET_MOVIES_ENDPOINT, RUNTIMES_INTERVALS } from "../../utils/endpoints";
import SimpleMovie from "../SimpleMovie/SimpleMovie";
import FullMovie from "../FullMovie/FullMovie";
import { Box } from "@mui/system";
import CustomAlert from "../CustomAlert/CustomAlert";

const MOVIES_PER_PAGE = 20;

function Movies({ filters, runtimeFilter, setRuntimesAmount }) {
  const [movies, setMovies] = useState([]);
  const [movie, setMovie] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [openAlert, setOpenAlert] = useState(false);
  const [error, setError] = useState("");

  const fetchMovies = useCallback(
    async (filters = {}, page = 0) => {
      setIsLoading(true);
      try {
        const params = new URLSearchParams({
          countries: Object.values(filters.country),
          cast: Object.values(filters.cast),
          genres: Object.values(filters.genre),
          text: filters.text,
          page,
        }).toString();
        const response = await fetch(GET_MOVIES_ENDPOINT + "?" + params);
        if (!response.ok) throw new Error("Error fetching movies");

        const movies = await response.json();
        if (!movies.movies) throw new Error("No movies found");
        setMovies([...movies.movies]);
        setTotalPages(Math.ceil(movies.total_results / MOVIES_PER_PAGE));

        const runtimesAmount = {};
        movies.facets.runtime.forEach((runtime) => {
          if (runtime._id !== "other")
            runtimesAmount[runtime._id] = runtime.count;
          else runtimesAmount[180] = runtime.count;
        });

        setRuntimesAmount({ ...runtimesAmount });
        setError("");
      } catch (error) {
        setOpenAlert(true);
        setError(error.message);
        setMovies([]);
        setTotalPages(1);
        setRuntimesAmount({});
      } finally {
        setIsLoading(false);
      }
    },
    [setRuntimesAmount]
  );

  useEffect(() => {
    fetchMovies(filters);
    setPage(1);
  }, [fetchMovies, filters]);

  const handleOnChangePage = (e, value) => {
    fetchMovies(filters, value - 1);
    setPage(value);
  };

  const handleClickOnMovie = (movie) => {
    setMovie(movie);
  };

  const handleOnCloseDialog = () => {
    setMovie(null);
  };

  const handleCloseAlert = () => {
    setOpenAlert(false);
  };

  return (
    <>
      <CustomAlert
        open={openAlert}
        handleClose={handleCloseAlert}
        message={error}
      />
      <Grid
        container
        mt={0.5}
        spacing={4}
        columns={{ xs: 4, sm: 8, md: 12, lg: 12 }}
      >
        {isLoading &&
          Array.apply(null, Array(8)).map((_, index) => (
            <Grid item xs={4} lg={3} key={index}>
              <Skeleton variant="rectangular" width="80%" height={118} />
              <Skeleton width="80%" />
              <Skeleton width="60%" />
            </Grid>
          ))}
        {!isLoading &&
          !error &&
          movies
            .filter((movie) => isInRuntimeRange(movie.runtime, runtimeFilter))
            .map((movie) => (
              <Grid item xs={4} lg={3} key={movie._id}>
                <SimpleMovie
                  cast={movie.cast}
                  genres={movie.genres}
                  imdb={movie.imdb}
                  plot={movie.plot}
                  poster={movie.poster}
                  title={movie.title}
                  onClick={(e) => handleClickOnMovie(movie)}
                />
              </Grid>
            ))}
        {!!movie && (
          <FullMovie
            handleClose={handleOnCloseDialog}
            open={!!movie}
            movie={movie}
          />
        )}
      </Grid>
      <Box sx={{ my: 2, display: "flex", justifyContent: "center" }}>
        <Pagination
          count={totalPages}
          color="secondary"
          onChange={handleOnChangePage}
          page={page}
        />
      </Box>
    </>
  );
}

const isInRuntimeRange = (value, index) => {
  return (
    value >= RUNTIMES_INTERVALS[index].lowLimit &&
    value < RUNTIMES_INTERVALS[index].upLimit
  );
};

export default Movies;

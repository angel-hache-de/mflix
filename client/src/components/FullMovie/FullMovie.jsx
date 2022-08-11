import React from "react";
import PropTypes from "prop-types";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Dialog,
  Typography,
} from "@mui/material";
import { Grade, Timer } from "@mui/icons-material";
import FullMovieChipsSection from "./FullMovieChipsSection/FullMovieChipsSection";

function FullMovie({ open, handleClose, movie }) {
  const { fullplot, imdb, poster, runtime, title } = movie;

  return (
    <Dialog onClose={handleClose} open={open}>
      <Card
        sx={{ bgcolor: "background.fullMovie", height: "80vh", maxWidth: 660 }}
      >
        <CardMedia
          component="img"
          height="35%"
          image={poster}
          alt={`${title}'s poster`}
        />
        <CardContent sx={{ overflowY: "scroll", height: "65%" }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              pb: 2,
            }}
            component="div"
          >
            <Typography gutterBottom variant="h5">
              {title || ""}
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <Chip
                label={(!!runtime && `runtime: ${runtime}`) || ""}
                icon={<Timer />}
                color="runtime"
                sx={{mb: 0.2}}
              />
              <Chip
                label={(!!imdb && `imdb: ${imdb.rating}`) || ""}
                icon={<Grade />}
                color="imdb"
              />
            </Box>
          </Box>
          <Typography variant="body2" color="text.secondary">
            {fullplot || ""}
          </Typography>

          {!!movie.genres && (
            <FullMovieChipsSection values={movie.genres} section="Genres" />
          )}
          {!!movie.cast && (
            <FullMovieChipsSection values={movie.cast} section="Cast" />
          )}
          {!!movie.countries && (
            <FullMovieChipsSection
              values={movie.countries}
              section="Countries"
            />
          )}
          {!!movie.languages && (
            <FullMovieChipsSection
              values={movie.languages}
              section="Languages"
            />
          )}
          {!!movie.directors && (
            <FullMovieChipsSection
              values={movie.directors}
              section="Directors"
            />
          )}
          {!!movie.awards && (
            <Box sx={{ mt: 2, mb: 4 }}>
              <Typography variant="h6" gutterBottom>
                Awards:
              </Typography>
              <Typography variant="body2" gutterBottom>
                {movie.awards.text}
              </Typography>
            </Box>
          )}
        </CardContent>
      </Card>
    </Dialog>
  );
}

FullMovie.propTypes = {
  open: PropTypes.bool,
  handleClose: PropTypes.func,
  movie: PropTypes.object,
  // Movie props
  // awards: PropTypes.object,
  // cast: PropTypes.arrayOf(PropTypes.string),
  // countries: PropTypes.arrayOf(PropTypes.string),
  // directors: PropTypes.arrayOf(PropTypes.string),
  // fullplot: PropTypes.string,
  // genres: PropTypes.arrayOf(PropTypes.string),
  // imdb: PropTypes.object,
  // languages: PropTypes.arrayOf(PropTypes.string),
  // poster: PropTypes.string,
  // title: PropTypes.string,
};

export default FullMovie;

import React, { useState, useEffect } from "react";
import { Autocomplete, TextField } from "@mui/material";
import { GET_GENRES_ENDPOINT } from "../../utils/endpoints";

function GenresInput({ onAddGenre }) {
  const [genres, setGenres] = useState([]);
  const [genre, setGenre] = useState("");

  useEffect(() => {
    const getGenres = async () => {
      try {
        const res = await fetch(GET_GENRES_ENDPOINT);
        const fetchedGenres = (await res.json()).genres;

        const genres = fetchedGenres.map((fg) => ({
          label: fg._id,
        }));

        setGenres(genres);
      } catch (error) {}
    };

    getGenres();
  }, []);

  const handleOnChangeInput = (e) => {
    setGenre(e.target.value);
  };

  const handleOnKeyUp = (e) => {
    if (e.key !== "Enter") return;
    onAddGenre(genre, "genre");
    setGenre("");
  };

  return (
    <Autocomplete
      disablePortal
      id="combo-box-demo"
      options={genres}
      sx={{ width: 300 }}
      renderInput={(params) => (
        <TextField
          label="Genre"
          {...params}
          value={genre}
          onChange={handleOnChangeInput}
          onKeyUp={handleOnKeyUp}
        />
      )}
    />
  );
}

export default GenresInput;

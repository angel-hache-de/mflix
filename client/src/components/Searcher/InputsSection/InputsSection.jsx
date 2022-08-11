import React, { useMemo, useRef } from "react";
import {
  Box,
  Grid,
  IconButton,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { Clear, Info, Search } from "@mui/icons-material";

import {
  GET_CAST_ENDPOINT,
  GET_COUNTRIES_ENDPOINT,
  GET_GENRES_ENDPOINT,
} from "../../../utils/endpoints";
import FilterInput from "../../FilterInput/FilterInput";

function InputsSection({
  onAddFilter,
  handleOnClickSearch,
  handleOnClickClear,
}) {
  const inputs = useMemo(
    () => [
      {
        filter: "country",
        endpoint: GET_COUNTRIES_ENDPOINT,
        endpointKey: "countries",
      },
      {
        filter: "genre",
        endpoint: GET_GENRES_ENDPOINT,
        endpointKey: "genres",
      },
      {
        filter: "cast",
        endpoint: GET_CAST_ENDPOINT,
        endpointKey: "castMembers",
      },
    ],
    []
  );
  const searchRef = useRef(null);
  const textInputRef = useRef(null);

  const handleOnAddFilter = (value, filter) => {
    onAddFilter(value, filter);
    searchRef.current.focus();
  };

  return (
    <>
      <Box sx={{ border: "2px dashed gray", mb: 1, pb: 1 }}>
        <Typography
          variant="h6"
          align="center"
          sx={{ mb: 1 }}
          color="text.primary"
        >
          Filters
        </Typography>
        <Grid container spacing={2} columns={{ xs: 4, sm: 8, md: 12, lg: 12 }}>
          {inputs.map(({ endpoint, endpointKey, filter }) => (
            <Grid item xs={4} md={3} key={endpoint}>
              <FilterInput
                endpoint={endpoint}
                endpointKey={endpointKey}
                filter={filter}
                onAddFilter={handleOnAddFilter}
                placeholder={filter === "cast" ? "Use the same format" : ""}
              />
            </Grid>
          ))}
          <Grid item xs={4} md={2}>
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <TextField
                label="Serach by text"
                variant="outlined"
                inputRef={textInputRef}
                sx={{
                  width: "80%",
                  margin: "auto auto",
                }}
              />
            </Box>
          </Grid>
          <Grid item xs={4} sm={8} md={1}>
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <IconButton
                color="secondary"
                aria-label="Search"
                ref={searchRef}
                size="large"
                onClick={(e) => handleOnClickSearch(textInputRef.current.value)}
                sx={{ mx: -0.5 }}
              >
                <Search />
              </IconButton>
              <IconButton
                color="secondary"
                aria-label="Clear"
                size="large"
                onClick={handleOnClickClear}
                sx={{ mx: -0.5 }}
              >
                <Clear />
              </IconButton>
              <Tooltip
                sx={{ mr: 1, ml: -0.5 }}
                title="Cast list only contains a few examples to show the format in wich you can search for your favorites actors!"
              >
                <IconButton color="primary">
                  <Info />
                </IconButton>
              </Tooltip>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}

export default InputsSection;

import React, { useState } from "react";
import { Box, Container, Stack } from "@mui/material";

import Header from "../components/Header/Header";
import Movies from "../components/Movies/Movies";
import Searcher from "../components/Searcher/Searcher";

const initialState = { country: {}, cast: {}, genre: {}, text: "" };

function Home() {
  const [currentFilters, setCurrentFilters] = useState(initialState);
  /**
   * Index of the actual runtime interval filter
   */
  const [runtimeFilter, setRuntimeFilter] = useState(0);
  const [runtimesAmount, setRuntimesAmount] = useState({});

  const updateFilters = (newFilters) => {
    if (JSON.stringify(newFilters) === JSON.stringify(currentFilters)) return;
    setCurrentFilters({
      cast: {
        ...newFilters.cast,
      },
      country: {
        ...newFilters.country,
      },
      genre: {
        ...newFilters.genre,
      },
      text: newFilters.text,
    });
  };

  return (
    <Stack sx={{ minHeight: "100vh", bgcolor: "background.default" }}>
      <Header />
      <Box component="div" sx={{ py: 2 }}>
        <Container maxWidth="xl">
          <Searcher
            updateFilters={updateFilters}
            runtimesAmount={runtimesAmount}
            updateRuntimeFilter={setRuntimeFilter}
          />
          <Movies
            filters={currentFilters}
            setRuntimesAmount={setRuntimesAmount}
            runtimeFilter={runtimeFilter}
          />
        </Container>
      </Box>
    </Stack>
  );
}

export default Home;

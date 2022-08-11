import React from "react";
import { Box, Chip, Typography } from "@mui/material";

function FullMovieChipsSection({ values, section }) {
  return (
    <Box sx={{ mt: 2 }}>
      <Typography variant="h6" gutterBottom>
        {section}:
      </Typography>
      {values.map((value) => (
        <Chip key={value} label={value} variant="outlined" />
      ))}
    </Box>
  );
}

export default FullMovieChipsSection;

import React from "react";

import { Box, Chip } from "@mui/material";

/**
 * Display the values selected for one of the following
 * filters: Cast, Genre, Country
 */
function FiltersSelected({ values, onRemoveValue, filter }) {
  return (
    <Box sx={{ border: "1px dashed grey" }}>
      {Object.keys(values).map((value) => (
        <Chip
          key={value}
          label={value}
          variant="outlined"
          onDelete={(e) => onRemoveValue(value, filter)}
        />
      ))}
    </Box>
  );
}

export default FiltersSelected;

import { Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import FiltersSelected from "../../FiltersSelected/FiltersSelected";

function ActiveFilters({ filters, onRemoveFilter }) {
  return (
    <Box sx={{ border: "2px dashed gray", py: 2, mb: 2 }}>
      <Typography variant="h6" align="center" color="text.primary">
        Active filters
      </Typography>
      <Grid
        container
        spacing={2}
        columns={{ xs: 4, sm: 8, md: 12 }}
        direction="row"
        justifyContent="space-evenly"
      >
        {Object.keys(filters).map((key) => (
          <Grid item xs={4} md={3} key={key}>
            <FiltersSelected
              filter={key}
              onRemoveValue={onRemoveFilter}
              values={filters[key]}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default ActiveFilters;

import React, { useMemo, useState } from "react";
import { Grid } from "@mui/material";

import InputsSection from "./InputsSection/InputsSection";
import ActiveFilters from "./ActiveFilters/ActiveFilters";
import SecondaryFilters from "./SecondaryFilters/SecondaryFilters";
import { copyFiltersObject } from "../../utils/objectHandler";
import CustomAlert from "../CustomAlert/CustomAlert";

function Searcher({ updateFilters, updateRuntimeFilter, runtimesAmount }) {
  const initialState = useMemo(
    () => ({ cast: {}, country: {}, genre: {} }),
    []
  );
  const [alertOpen, setAlertOpen] = useState(false);
  const [filters, setFilters] = useState({ cast: {}, country: {}, genre: {} });
  /**
   * Add an element to the filters object depending the
   * filter param
   * @param {string} value Value to add to one of the filter objects
   * @param {string} filter indicates to wich filter add the value
   */
  const onAddFilter = (value, filter) => {
    if (!value.trim().length) return;
    if (Object.keys(filters[filter]).length >= 3) {
      setAlertOpen(true);
      return;
    }
    const newFilters = copyFiltersObject(filters);
    newFilters[filter][value] = value;
    setFilters({ ...newFilters });
  };

  const onRemoveFilter = (value, filter) => {
    delete filters[filter][value];
    setFilters({ ...copyFiltersObject(filters) });
  };

  const handleOnClickSearch = (textToSearch) => {
    updateFilters({ ...copyFiltersObject(filters), text: textToSearch });
  };

  const handleOnClickClear = (e) => {
    setFilters(initialState);
    updateFilters({ ...copyFiltersObject(initialState), text: "" });
  };

  const handleClose = () => {
    setAlertOpen(false);
  };

  return (
    <>
      <CustomAlert
        open={alertOpen}
        handleClose={handleClose}
        message="Only 3 values per filter are allowed."
      />
      <InputsSection
        onAddFilter={onAddFilter}
        handleOnClickSearch={handleOnClickSearch}
        handleOnClickClear={handleOnClickClear}
      />
      <Grid container columns={{ xs: 4, sm: 8, md: 12 }} spacing={2}>
        <Grid item xs={4} md={8}>
          <ActiveFilters filters={filters} onRemoveFilter={onRemoveFilter} />
        </Grid>
        <Grid item xs={4}>
          <SecondaryFilters
            updateRuntimeFilter={updateRuntimeFilter}
            runtimesAmount={runtimesAmount}
          />
        </Grid>
      </Grid>
    </>
  );
}

export default Searcher;

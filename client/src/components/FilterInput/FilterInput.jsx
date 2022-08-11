import React, { useState, useEffect } from "react";
import { Autocomplete, TextField } from "@mui/material";

function FilterInput({
  endpoint,
  endpointKey,
  onAddFilter,
  filter,
  placeholder,
}) {
  const [options, setOptions] = useState([]);
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    if (!endpoint || !endpointKey) return;
    const getOptions = async () => {
      try {
        const res = await fetch(endpoint);
        const fetchedOptions = (await res.json())[endpointKey];

        const options = fetchedOptions.map((fo) => ({
          label: fo._id,
        }));

        setOptions(options);
      } catch (error) {}
    };

    getOptions();
  }, [endpoint, endpointKey]);

  const handleOnInputChange = (e, newValue) => {
    setInputValue(newValue);
  };

  const handleOnKeyUp = (e) => {
    if (e.key !== "Enter") return;
    onAddFilter(inputValue, filter);
    setInputValue("");
  };

  return (
    <Autocomplete
      disablePortal
      options={options}
      onInputChange={handleOnInputChange}
      inputValue={inputValue}
      onKeyUp={handleOnKeyUp}
      sx={{
        width: "80%",
        mx: "auto",
      }}
      renderInput={(params) => (
        <TextField
          label={filter === "cast" ? "cast (examples)" : filter}
          {...params}
          placeholder={placeholder}
        />
      )}
    />
  );
}

export default FilterInput;

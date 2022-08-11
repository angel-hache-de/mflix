import React, { useState, useEffect, useRef } from "react";
import { Autocomplete, TextField } from "@mui/material";
import { GET_COUNTRIES_ENDPOINT } from "../../utils/endpoints";

function CountriesInput({ onAddCountry }) {
  const [countries, setCountries] = useState([]);
  const countryRef = useRef(null);

  useEffect(() => {
    const getCountries = async () => {
      try {
        const res = await fetch(GET_COUNTRIES_ENDPOINT);
        const fetchedCountries = (await res.json()).countries;

        const countries = fetchedCountries.map((fc) => ({
          label: fc._id,
        }));

        setCountries(countries);
      } catch (error) {}
    };

    getCountries();
  }, []);

  const handleOnKeyUp = (e) => {
    if (e.key !== "Enter") return;
    onAddCountry(countryRef.current.value, "country");
    countryRef.current.value = "";
  };

  return (
    <Autocomplete
      disablePortal
      id="combo-box-demo"
      options={countries}
      sx={{ width: 300 }}
      renderInput={(params) => (
        <TextField
          label="Country"
          {...params}
          ref={countryRef}
          onKeyUp={handleOnKeyUp}
        />
      )}
    />
  );
}

export default CountriesInput;

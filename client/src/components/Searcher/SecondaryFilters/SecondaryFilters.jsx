import React, { useMemo, useState } from "react";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { RUNTIMES_INTERVALS } from "../../../utils/endpoints";

function SecondaryFilters({ updateRuntimeFilter, runtimesAmount }) {
  const [runtime, setRuntime] = useState("");
  const runtimeIntervals = useMemo(() => RUNTIMES_INTERVALS, []);

  const handleOnChangeRuntime = (e) => {
    setRuntime(e.target.value);
    updateRuntimeFilter(e.target.value);
  };

  return (
    <Box sx={{ border: "2px dashed gray", padding: 2 }}>
      <Typography variant="h6" align="center" color="text.primary">
        More Filters
      </Typography>
      <FormControl fullWidth>
        <InputLabel id="select-label">By Runtime (minutes)</InputLabel>
        <Select
          labelId="select-label"
          value={runtime}
          label="By Runtime (minutes)"
          onChange={handleOnChangeRuntime}
        >
          {runtimeIntervals.map((runtime, index) => (
            <MenuItem value={index} key={`${runtime.upLimit}`}>
              {/* Index 0 is the all option */}
              {index === 0
                ? "All"
                : `${runtime.lowLimit}${
                    index === runtimeIntervals.length - 1
                      ? "+"
                      : "-" + runtime.upLimit
                  }(${runtimesAmount[runtime.lowLimit] || "0"})`}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}

export default SecondaryFilters;

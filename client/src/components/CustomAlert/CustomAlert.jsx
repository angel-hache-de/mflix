import { Alert, Snackbar } from "@mui/material";
import React from "react";

function CustomAlert({ open, handleClose, message, ...props }) {
  return (
    <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
      <Alert
        onClose={handleClose}
        severity="error"
        sx={{
          width: "100%",
          bgcolor: "background.alert",
          color: "primary.main",
        }}
        {...props}
      >
        {message}
      </Alert>
    </Snackbar>
  );
}

export default CustomAlert;

import React from "react";
import { AppBar, Divider, Toolbar, Typography } from "@mui/material";

function Header() {
  return (
    <>
      <AppBar
        position="static"
        sx={{ backgroundColor: "background.navbar", my: 0 }}
      >
        <Toolbar variant="dense">
          <Typography
            variant="h4"
            component="div"
            color="text.header"
            sx={{ flexGrow: 1, textAlign: "center", mt: 1 }}
          >
            Mflix
            <img
              src="/pixelatedLeaf.svg"
              alt="Mflix logo"
              width={40}
              height={35}
            />
          </Typography>
        </Toolbar>
      </AppBar>
      <Divider color="white" />
    </>
  );
}

export default Header;

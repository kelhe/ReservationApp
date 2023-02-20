import React from "react";
import AppBar from "@mui/material/AppBar";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import TableRestaurantIcon from '@mui/icons-material/TableRestaurant';

function Header() {
  return (
    <AppBar position="static">
      <Container maxWidth="xl" sx={{display: "flex"}}>
        <TableRestaurantIcon sx={{ mt: 1 , mr: 2 }}/>
        <Typography
          variant="h4"
          noWrap
          component="a"
          href="/"
          sx={{
            mr: 2,
            display: "flex",
            fontFamily: "monospace",
            fontWeight: 700,
            letterSpacing: ".3rem",
            color: "inherit",
            textDecoration: "none",
          }}
        >
          Periodic Tables
        </Typography>
      </Container>
    </AppBar>
  );
}

export default Header;

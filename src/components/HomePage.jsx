import * as React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import SideBar from "./SideBar";

function HomePage() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid item xs={2}>
          <SideBar />
        </Grid>
        <Grid
          item
          xs={10}
          sx={{ backgroundColor: "lightblue", color: "black" }}
        >
          <Box sx={{ p: 10 }}>Welcome to Our Chat App</Box>
        </Grid>
      </Grid>
    </Box>
  );
}

export default HomePage;

import React, { useState } from "react";
import Typography from "@mui/material/Typography";
import { Box, Grid, TextField, Button } from "@mui/material";
import postingUserLoginData from "../../Hooks/postingUserLoginData";

function LoginPage() {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();

  const handleUserName = (e) => {
    setUsername(e.target.value);
  };

  const handlePassword = (e) => {
    setUsername(e.target.value);
  };
  const submit = async () => {
    if ([username, password].some((field) => !field.trim())) {
      alert("fill the fields");
    } else {
      const dataObject = {
        username: username,
        password: password,
      };

      setUsername("");
      setPassword("");

      try {
        const loginData = await postingUserLoginData(dataObject);
      } catch (error) {
        console.log("err sending data", error);
      }
    }
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid
          item
          xs={12}
          sx={{ backgroundColor: "lightblue", color: "black" }}
        >
          <Box sx={{ p: 2 }}>
            <Typography variant="h4">Log in</Typography>
          </Box>
        </Grid>

        <Grid item xs={12} sx={{ display: "flex", justifyContent: "center" }}>
          <Box
            component="form"
            sx={{
              "& .MuiTextField-root": { m: 2, width: "40ch" },
              p: 4,
              width: "50%",
              height: "auto",
              margin: "auto",
              boxShadow: 3,
              backgroundColor: "#fff",
              borderRadius: 2,
            }}
          >
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  required
                  id="user-name"
                  label="UserName"
                  variant="filled"
                  value={username}
                  onChange={handleUserName}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  id="password"
                  label="Password"
                  type="password"
                  variant="filled"
                  value={password}
                  onChange={handlePassword}
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  onClick={submit}
                >
                  Submit
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}

export default LoginPage;

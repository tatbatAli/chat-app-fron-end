import React, { useState } from "react";
import SideBar from "./SideBar";
import Typography from "@mui/material/Typography";
import { Box, Grid, TextField, Button } from "@mui/material";
import postingUserData from "../../Hooks/postingUserData";

function SingInPage() {
  const [userData, setUserData] = useState([]);
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");

  const handleUserName = (e) => {
    setUserName(e.target.value);
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handlePasswordConfirmation = (e) => {
    setPasswordConfirmation(e.target.value);
  };

  const submit = async () => {
    if (
      !userName ||
      !userName.trim() ||
      !password ||
      !password.trim() ||
      !passwordConfirmation ||
      !passwordConfirmation.trim()
    ) {
      alert("fill the fields");
    } else {
      const passwordPattern =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
      if (
        password !== passwordConfirmation ||
        !passwordPattern.test(password)
      ) {
        alert("Invalid Password");
      } else {
        const dataObject = {
          username: userName,
          password: password,
          passwordConfirmation: passwordConfirmation,
        };

        setUserData([...userData, dataObject]);
        setUserName("");
        setPassword("");
        setPasswordConfirmation("");

        try {
          const bodyData = await postingUserData(dataObject);
          console.log(bodyData);
        } catch (error) {
          console.log("err sending user data", error);
        }
      }
    }
  };

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
          <Box sx={{ p: 2 }}>
            <Typography variant="h4">Sign In</Typography>
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
                  value={userName}
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

              <Box sx={{ color: "gray", fontSize: "0.9rem", ml: 5 }}>
                Your password must include:
                <ul>
                  <li>At least 8 characters</li>
                  <li>At least one uppercase letter</li>
                  <li>At least one lowercase letter</li>
                  <li>At least one number</li>
                  <li>
                    At least one special character (e.g., @, $, !, %, *, ?, &)
                  </li>
                </ul>
              </Box>

              <Grid item xs={12}>
                <TextField
                  required
                  id="password-confirmation"
                  label="Password Confirmation"
                  type="password"
                  variant="filled"
                  value={passwordConfirmation}
                  onChange={handlePasswordConfirmation}
                />
              </Grid>

              <Box sx={{ color: "gray", fontSize: "0.9rem", ml: 5 }}>
                The confirmation password must match the password exactly.
              </Box>

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

export default SingInPage;

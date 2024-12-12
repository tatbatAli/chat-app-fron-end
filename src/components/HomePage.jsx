import * as React from "react";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Stack from "@mui/material/Stack";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import Input from "@mui/material/Input";
import { useState, useRef } from "react";
import SendIcon from "@mui/icons-material/Send";
import Button from "@mui/material/Button";
import SideBar from "./SideBar";
import TextField from "@mui/material/TextField";

function ResponsiveDrawer() {
  const [messages, setMessages] = useState([]);
  const [showmessage, setShowMessage] = useState(false);
  const [textMessage, setTextMessage] = useState();

  const sendingMessage = () => {
    if (!textMessage || textMessage.trim() === "") {
      alert("field is empty");
      console.log(textMessage);
    } else {
      const messagesArray = {
        id: Math.random().toString(36).substr(2, 10),
        date: new Date().toString(),
        message: textMessage,
      };
      setMessages([...messages, messagesArray]);
      setTextMessage("");
      setShowMessage(true);
    }
  };

  const handlEnter = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      sendingMessage();
    }
  };

  const ariaLabel = { "aria-label": "description" };
  const drawerWidth = 240;

  return (
    <>
      <SideBar />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          backgroundColor: "lightblue",
          marginLeft: 70,
          marginTop: 1,
          maxWidth: "500px",
        }}
      >
        <Stack
          sx={{
            height: "40pc",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Chip avatar={<Avatar>H</Avatar>} label="Avatar" />
          {showmessage && (
            <List
              sx={{
                backgroundColor: "white",
                width: "100px",
                overflow: "auto",
              }}
            >
              {messages.map((item) => (
                <ListItem key={item.id}>
                  <ListItemText
                    primary={"User 1"}
                    secondary={
                      <React.Fragment>
                        <Typography
                          component="span"
                          variant="body2"
                          sx={{ color: "text.primary", display: "inline" }}
                        >
                          {item.message}
                        </Typography>
                        {""}
                      </React.Fragment>
                    }
                  />
                </ListItem>
              ))}
            </List>
          )}
          <Stack
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Box
              component="form"
              sx={{
                "& > :not(style)": { m: 1 },
              }}
              noValidate
              autoComplete="off"
            >
              <Input
                id="standard-basic"
                label="Standard"
                variant="standard"
                placeholder="Enter Your Message"
                onKeyDown={handlEnter}
                onChange={(e) => setTextMessage(e.target.value)}
                value={textMessage}
              />

              <Button
                variant="contained"
                size="small"
                onClick={() => {
                  sendingMessage();
                }}
                endIcon={<SendIcon />}
              >
                Send
              </Button>
            </Box>
          </Stack>
        </Stack>
      </Box>
    </>
  );
}

export default ResponsiveDrawer;

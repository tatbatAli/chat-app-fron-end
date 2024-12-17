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
import { useState, useRef, useEffect } from "react";
import SendIcon from "@mui/icons-material/Send";
import Button from "@mui/material/Button";
import SideBar from "./SideBar";
import Grid from "@mui/material/Grid";
import fetchData from "../../Hooks/axios";

function ResponsiveDrawer() {
  const [messages, setMessages] = useState([]);
  const [textMessage, setTextMessage] = useState("");
  const ListMessage = useRef(null);

  const sendingMessage = async () => {
    const date = new Date();
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const hours = date.getHours();
    const min = date.getMinutes();
    if (!textMessage || textMessage.trim() === "") {
      alert("field is empty");
    } else {
      const messagesArray = {
        message: textMessage,
        timeOfMessage: date.toLocaleTimeString(),
        dayOfMessage: date.toLocaleDateString(),
        typeOfMessage: { S: "Sender", R: "Reciever" },
      };
      const conversation = [...messages, messagesArray];
      setMessages(conversation);
      setTextMessage("");
      console.log(conversation, typeof conversation);

      try {
        const bodyMessage = await fetchData(conversation);
        console.log("message been created", bodyMessage); // output : message been created {msg: 'a message has been sent', recieveData: {…}}
      } catch (error) {
        throw error;
      }
    }
  };

  const handlEnter = async (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      sendingMessage();
    }
  };

  useEffect(() => {
    if (ListMessage.current) {
      ListMessage.current.scrollTop = ListMessage.current.scrollHeight;
    }
  }, [messages]);

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
          }}
        >
          <Chip avatar={<Avatar>H</Avatar>} label="User 1" />

          {messages.length > 0 && (
            <List
              ref={ListMessage}
              sx={{
                backgroundColor: "white",
                overflow: "auto",
                display: "flex",
                flexDirection: "column",
                height: "700px",
                mt: 2,
              }}
            >
              {messages.map((item, index) => (
                <>
                  <Grid container spacing={1}>
                    <Grid
                      size={5}
                      key={index}
                      sx={{
                        backgroundColor: "#f0f0f0",
                        borderRadius: 2,
                        p: 1,
                        m: 1,
                      }}
                    >
                      {item.dayOfMessage}
                    </Grid>
                  </Grid>
                  <ListItem
                    key={item.id}
                    sx={{
                      display: "flex",
                      justifyContent: "flex-start",
                      mb: 1,
                    }}
                  >
                    <Box
                      sx={{
                        backgroundColor: "#f0f0f0",
                        borderRadius: 2,
                        p: 1,
                        maxWidth: "80%",
                        wordWrap: "break-word",
                      }}
                    >
                      <ListItemText
                        primary={item.message}
                        secondary={
                          <Typography
                            component="span"
                            variant="body2"
                            sx={{
                              color: "text.secondary",
                              display: "block",
                              fontSize: "0.75rem",
                              textAlign: "right",
                            }}
                          >
                            {item.timeOfMessage}
                          </Typography>
                        }
                        primaryTypographyProps={{
                          sx: {
                            fontSize: "0.875rem",
                          },
                        }}
                      />
                    </Box>
                  </ListItem>
                </>
              ))}
            </List>
          )}

          <Stack
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              mt: 2,
            }}
          >
            <Box
              component="form"
              sx={{
                "& > :not(style)": { m: 1 },
                display: "flex",
                alignItems: "center",
              }}
              noValidate
              autoComplete="off"
            >
              <Input
                fullWidth
                id="standard-basic"
                label="Standard"
                variant="standard"
                placeholder="Enter Your Message"
                onKeyDown={handlEnter}
                onChange={(e) => setTextMessage(e.target.value)}
                value={textMessage}
                sx={{ flex: 1 }}
              />

              <Button
                variant="contained"
                size="small"
                onClick={sendingMessage}
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

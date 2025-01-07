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
import postingMessages from "../../Hooks/postingMessages";
import fetchUser from "../../Hooks/fetchingUser";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { io } from "socket.io-client";
import axios from "axios";

const socket = io("http://localhost:5000");

function ResponsiveDrawer() {
  const [messages, setMessages] = useState([]);
  const [textMessage, setTextMessage] = useState("");
  const [currentUsername, setCurrentUsername] = useState("");
  const [port, setPort] = useState(null);
  const ListMessage = useRef(null);

  socket.on("connect", () => {
    socket.on("recieved message", (messages) => {
      setMessages(messages);
    });
  });

  useEffect(() => {
    const determinPort = () => {
      const currentPort = window.location.port;
      setPort(currentPort);

      switch (currentPort) {
        case "5173":
          setCurrentUsername("user 1");
          break;
        case "4000":
          setCurrentUsername("user 2");
          break;
        default:
          break;
      }
    };

    determinPort();
  }, []);

  const sendingMessage = async () => {
    const date = new Date();
    if (!textMessage || textMessage.trim() === "") {
      alert("field is empty");
    } else {
      const messageObject = {
        user: currentUsername,
        message: textMessage,
        timeOfMessage: date.toLocaleTimeString(),
        dayOfMessage: date.toLocaleDateString(),
      };

      const conversation = [...messages, messageObject];
      setMessages(conversation);
      socket.emit("send message", conversation);
      setTextMessage("");

      try {
        const bodyMessage = await postingMessages(messageObject);
      } catch (error) {
        console.log("err sending message", error);
      }
    }
  };

  const handlEnter = async (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      sendingMessage();
      handleUserSubmit();
    }
  };

  useEffect(() => {
    if (ListMessage.current) {
      ListMessage.current.scrollTop = ListMessage.current.scrollHeight;
    }
  }, [messages]);

  const handleUserSubmit = async (e) => {
    if (e) {
      e.preventDefault();
      try {
        const fetchedUser = await fetchUser({ user: currentUsername });
      } catch (error) {
        console.log("cheking user err", error);
      }
    }
  };

  useEffect(() => {
    const chekingMessages = async () => {
      try {
        const response = await axios.get("http://localhost:5000/checkMessages");
        if (response.data.hasMessages) {
          const messages = await axios.get("http://localhost:5000");
          const fetchedData = messages.data;
          setMessages(fetchedData);
        } else {
          console.log("no messages in db");
        }
      } catch (error) {
        console.log("cheking user err", error);
      }
    };
    chekingMessages();
  }, []);

  const handleUserChange = (e) => {
    setCurrentUsername(e.target.value);
  };

  return (
    <Grid container spacing={2} sx={{ height: "100vh" }}>
      <Grid item xs={2}>
        <SideBar />
      </Grid>

      <Grid item xs={10}>
        <Grid container spacing={2}>
          <Grid item xs={5}>
            <Card sx={{ backgroundColor: "lightblue" }}>
              <CardHeader title="Personal Users" />
              <CardContent>
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                  <Avatar sx={{ bgcolor: "orange", width: 56, height: 56 }}>
                    N
                  </Avatar>
                  <Typography
                    variant="body2"
                    sx={{
                      color: "text.secondary",
                      borderRadius: 5,
                      backgroundColor: "white",
                      p: 2,
                      flex: 1,
                      cursor: "pointer",
                    }}
                  >
                    <Typography variant="h6" sx={{ fontWeight: "bolder" }}>
                      User 2
                    </Typography>
                    Be the First To Send Message!!
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          {/* Chat Box */}
          <Grid item xs={6}>
            <Box
              component="main"
              sx={{
                backgroundColor: "lightblue",
                borderRadius: 2,
                height: "100%",
                p: 3,
              }}
            >
              <Stack
                sx={{
                  height: "calc(100vh - 100px)",
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <Chip
                  avatar={<Avatar sx={{ bgcolor: "orange" }}>N</Avatar>}
                  label="User 2"
                />

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
                      borderRadius: 1,
                    }}
                  >
                    <Grid container spacing={1}>
                      <Grid>
                        <Box
                          sx={{
                            backgroundColor: "#f0f0f0",
                            borderRadius: 2,
                            p: 1,
                            m: 1,
                          }}
                        >
                          {new Date().toLocaleDateString()}
                        </Box>
                      </Grid>
                    </Grid>
                    {messages.map((item, index) => (
                      <Box key={index}>
                        {/* <Grid container spacing={1}>
                          <Grid>
                            <Box
                              sx={{
                                backgroundColor: "#f0f0f0",
                                borderRadius: 2,
                                p: 1,
                                m: 1,
                              }}
                            >
                              {item.dayOfMessage}
                            </Box>
                          </Grid>
                        </Grid> */}
                        <ListItem
                          sx={{
                            display: "flex",
                            justifyContent:
                              item.user === currentUsername
                                ? "flex-end"
                                : "flex-start",
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
                      </Box>
                    ))}
                  </List>
                )}

                {/* Message Input */}
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
                      width: "100%",
                      p: 2,
                      display: "flex",
                      gap: 2,
                      alignItems: "center",
                    }}
                    noValidate
                    autoComplete="off"
                  >
                    <Input
                      fullWidth
                      placeholder="Enter Your Message"
                      onKeyDown={handlEnter}
                      onChange={(e) => setTextMessage(e.target.value)}
                      value={textMessage}
                    />
                    <Button
                      variant="contained"
                      size="small"
                      onClick={sendingMessage}
                      endIcon={<SendIcon />}
                    >
                      Send
                    </Button>
                    <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                      <InputLabel id="demo-select-small-label">User</InputLabel>
                      <Select
                        labelId="demo-select-small-label"
                        id="demo-select-small"
                        value={currentUsername}
                        label="User"
                        onChange={handleUserChange}
                      >
                        <MenuItem value={currentUsername}>
                          {currentUsername}
                        </MenuItem>
                      </Select>
                    </FormControl>
                  </Box>
                </Stack>
              </Stack>
            </Box>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default ResponsiveDrawer;

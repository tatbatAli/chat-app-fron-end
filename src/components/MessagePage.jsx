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
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";

function ResponsiveDrawer() {
  const [messages, setMessages] = useState([]);
  const [textMessage, setTextMessage] = useState("");
  const ListMessage = useRef(null);

  const sendingMessage = async () => {
    const date = new Date();
    if (!textMessage || textMessage.trim() === "") {
      alert("field is empty");
    } else {
      const messagesArray = {
        message: textMessage,
        timeOfMessage: date.toLocaleTimeString(),
        dayOfMessage: date.toLocaleDateString(),
      };
      const conversation = [...messages, messagesArray];
      setMessages(conversation);
      setTextMessage("");
      console.log(conversation);

      try {
        const bodyMessage = await fetchData(messagesArray);
        console.log("message been created", bodyMessage);
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
                    {messages.map((item, index) => (
                      <Box key={index}>
                        <Grid container spacing={1}>
                          <Grid item>
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
                        </Grid>
                        <ListItem
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

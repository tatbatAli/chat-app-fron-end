import * as React from "react";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MailIcon from "@mui/icons-material/Mail";
import Badge from "@mui/material/Badge";
import NotificationsIcon from "@mui/icons-material/Notifications";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import Avatar from "@mui/material/Avatar";
import HomeIcon from "../Icons/homeIcon";

function SideBar() {
  const drawerWidth = 240;

  const arrayIcon = [
    <Avatar>H</Avatar>,
    <HomeIcon />,
    <Badge badgeContent={4} color="primary">
      <MailIcon />
    </Badge>,
    <NotificationsIcon />,
    <SettingsIcon />,
  ];
  const items = ["", "Home", "Messages", "Notification", "Settings"];

  const drawer = (
    <div>
      <List>
        {items.map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>{arrayIcon[index % arrayIcon.length]}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <ListItemButton>
        <ListItemIcon>
          <LogoutIcon />
        </ListItemIcon>
        <ListItemText primary={"Log Out"} />
      </ListItemButton>
    </div>
  );

  return (
    <Box>
      <Box>
        <Box
          sx={{
            display: "flex",
          }}
        >
          <CssBaseline />
          <Box
            component="nav"
            sx={{
              width: { sm: drawerWidth },
              flexShrink: { sm: 0 },
            }}
            aria-label="mailbox folders"
          >
            <Drawer
              variant="permanent"
              sx={{
                "& .MuiDrawer-paper": {
                  backgroundColor: "lightblue",
                  width: drawerWidth,
                },
              }}
            >
              {drawer}
            </Drawer>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default SideBar;

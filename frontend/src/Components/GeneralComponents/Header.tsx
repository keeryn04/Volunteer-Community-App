import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Avatar from "@mui/material/Avatar";

const Header: React.FC = () => {
  return (
    <AppBar
      position="static"
      color="default"
      elevation={2}
      sx={{
        position: "fixed",
        top: 0,
        width: "100vw",        
        left: 0,
        overflowX: "hidden", 
        margin: 0,
      }}
    >
      <Toolbar sx={{ position: "relative", justifyContent: "space-between" }}>
        {/* Left: Nav*/}
        <Box sx={{ display: "flex", gap: 2 }}>
          <Button color="inherit">Volunteer</Button>
          <Button color="inherit">Rewards</Button>
          <Button color="inherit">My Stuff</Button>
        </Box>

        {/* Center: Title*/}
        <Typography
          variant="h6"
          component="div"
          sx={{
            position: "absolute",
            left: "50%",
            transform: "translateX(-50%)",
            fontWeight: 600,
          }}
        >
          SideQuest
        </Typography>

        {/* Right: Profile*/}
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <IconButton sx={{ ml: 1 }}>
            <Avatar alt="Profile" src="/static/images/avatar/1.jpg" />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;

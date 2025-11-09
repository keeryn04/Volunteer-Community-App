import React, { useState } from "react";
import { Menu, MenuItem, Typography, Box, Button, IconButton, Avatar } from "@mui/material";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

interface ProfileDropdownProps {
  username: string;
  hours: number;
  points: number;
}

const ProfileDropdown: React.FC<ProfileDropdownProps> = ({ username, hours, points}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const [cookies, setCookie, removeCookie] = useCookies(['USER_ID']);
  const navigate = useNavigate();
  //TODO: We need to get user information here

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleSignOut = () => {
    removeCookie("USER_ID");
    navigate("/");
  }

  return (
    <Box>
      <IconButton sx={{ ml: 1, minWidth: 0, padding: 0 }} onClick={handleClick}>
          <Avatar alt="Profile" src="/static/images/avatar/1.jpg" />
      </IconButton>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <MenuItem disabled>
          <Typography variant="subtitle1">{username}</Typography>
        </MenuItem>
        <MenuItem disabled>
          <Typography variant="body2">Hours: {hours}</Typography>
        </MenuItem>
        <MenuItem disabled>
          <Typography variant="body2">Points: {points}</Typography>
        </MenuItem>

        <MenuItem
            onClick={handleSignOut}
            sx={{
                color: "black",
                "&:hover": {
                color: "red", // text turns red
                },
            }}
        >
          Sign Out
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default ProfileDropdown;

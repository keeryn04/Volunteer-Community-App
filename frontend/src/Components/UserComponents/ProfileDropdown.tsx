import React, { useState } from "react";
import { Menu, MenuItem, Typography, Box, Button, IconButton, Avatar } from "@mui/material";

interface ProfileDropdownProps {
  username: string;
  hours: number;
  points: number;
  onSignOut: () => void;
}

const ProfileDropdown: React.FC<ProfileDropdownProps> = ({ username, hours, points, onSignOut }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box>
      <Button
        onClick={handleClick}
        sx={{ minWidth: 0, padding: 0 }}
      >
        <IconButton sx={{ ml: 1 }}>
            <Avatar alt="Profile" src="/static/images/avatar/1.jpg" />
        </IconButton>
      </Button>

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
            onClick={handleClose}
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

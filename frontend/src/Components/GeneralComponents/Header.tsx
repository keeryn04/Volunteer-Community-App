import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {AppBar, Toolbar, Typography, Button, Box} from "@mui/material";

import ProfileDropdown from "../UserComponents/ProfileDropdown.tsx";
interface HeaderProps {
    availablePages?: string[]; 
}
  
const defaultPages = ["volunteer", "rewards", "profile"];

const Header: React.FC<HeaderProps> = ({ availablePages = defaultPages }) => {
const navigate = useNavigate();
const location = useLocation();

const formatPageName = (page: string) =>
    page.charAt(0).toUpperCase() + page.slice(1).toLowerCase();

const handleSignOut = () => {
    console.log("Sign out clicked!");
    // sign in logic later
    };

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
            {availablePages.map((page) => {
                const isActive = location.pathname === `/${page}`;
                return (
                <Button
                    key={page}
                    color={isActive ? "primary" : "inherit"}
                    variant={isActive ? "outlined" : "text"}
                    onClick={() => navigate(`/${page}`)}
                    sx={{
                    textTransform: "none",
                    fontWeight: isActive ? 600 : 400,
                    }}
                >
                    {formatPageName(page)}
                </Button>
                );
            })}
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
          <ProfileDropdown
            username="JohnDoe"
            hours={42}
            points={1200}
            onSignOut={handleSignOut}
          />
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;

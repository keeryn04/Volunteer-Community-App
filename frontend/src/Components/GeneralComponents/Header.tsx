import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import ProfileDropdown from "../UserComponents/ProfileDropdown.tsx";

interface HeaderProps {
  availablePages?: string[];
}

const defaultPages = ["volunteer", "rewards", "profile", "myEvents", "createEvent"];
import { getPages } from "../../services/user.service.tsx";
import type { Pages } from "../../enums/Pages.enum.tsx";
import type { CookieValues } from "../../interfaces/Cookies.tsx";

const Header: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Converts a page string (from backend) into display-friendly format (e.g. "my events" → "My Events")
  const formatDisplayName = (page: string) =>
    page
      .replace(/([a-z])([A-Z])/g, "$1 $2") // add space before capitals in camelCase
      .replace(/[_-]+/g, " ")              // replace underscores/dashes with spaces
      .split(" ")
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");

  // Converts a page string into a valid route path (e.g. "My Events" → "myEvents")
  const formatPath = (page: string) => {
    const words = page.trim().split(/\s+/);
    return (
      words[0].toLowerCase() +
      words
        .slice(1)
        .map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
        .join("")
    );
  };

  const [cookies, setCookie, removeCookie] = useCookies<'USER_ID', CookieValues>(['USER_ID']);

  const [availablePages, setAvailablePages] = useState([""])
  useEffect(() => {
    const getAvailablePages = async (): Promise<void> => {
      const userId = cookies.USER_ID;
      if (!userId || userId === "-1"){
        console.log("Bad userId, redirecting to Login Page", userId);
        navigate("/");
        return;
      }

      const availablePages: Pages[] = (await getPages(userId)).availablePages;
      setAvailablePages(availablePages);
    }
    getAvailablePages();
  }, []);

  return (
    <AppBar
      position="static"
      color="primary"
      elevation={2}
      sx={{
        position: "fixed",
        zIndex: 2,
        top: 0,
        width: "100vw",
        left: 0,
        overflowX: "hidden",
        margin: 0,
        bgcolor: "#123D33",
      }}
    >
      <Toolbar sx={{ position: "relative", justifyContent: "space-between" }}>
        {/* Left: nav buttons */}
        <Box sx={{ display: "flex", gap: 2 }}>
          {availablePages.map((page) => {
            const displayName = formatDisplayName(page);
            const routePath = formatPath(page);
            const isActive = location.pathname === `/${routePath}`;

            return (
              <Button
                key={page}
                
                variant={isActive ? "contained" : "contained"}
                onClick={() => navigate(`/${routePath}`)}
                sx={{
                  bgcolor:isActive ? "primary.dark" : "primary.light",
                  textTransform: "none",
                  fontWeight: isActive ? 600 : 400,
                }}
              >
                {displayName}
              </Button>
            );
          })}
        </Box>

        {/* Center: title */}
        <Box sx={{display:"flex", alignItems:"center", transform: "translateX(-65%)", }}>
          <img  width="50px" height="auto" src="/SideQuest_Logo-Circle.png"/>
          <Typography
          variant="h5"
          component="div" 
          sx={{
            paddingLeft:2,
            fontWeight: 600,
            color: "#FAF8F7"
          }}
          >
            SideQuest
          </Typography>
        </Box>
        

        {/* Right: profile dropdownw */}
        <Box sx={{ 
          display: "flex", 
          justifyContent:"center", 
          alignItems:"center", 
          width:"40px", 
          height:"40px", 
          padding:"5px", 
          bgcolor:"primary.light",
          borderRadius:"1000px",
          transition: "background-color 0.3s ease",
          "&:hover":{bgcolor:"primary.dark"}
        }}>
          <ProfileDropdown/>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;

import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import ProfileDropdown from "../UserComponents/ProfileDropdown.tsx";

interface HeaderProps {
  availablePages?: string[];
}

const defaultPages = ["volunteer", "rewards", "profile", "my events", "create event"];
import { getPages } from "../../services/user.service.tsx";
import type { Pages } from "../../enums/Pages.enum.tsx";
import type { CookieValues } from "../../interfaces/Cookies.tsx";

const Header: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Converts a page string (from backend) into display-friendly format (e.g. "my events" → "My Events")
  const formatDisplayName = (page: string) =>
    page
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
      color="default"
      elevation={2}
      sx={{
        position: "fixed",
        zIndex: 2,
        top: 0,
        width: "100vw",
        left: 0,
        overflowX: "hidden",
        margin: 0,
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
                color={isActive ? "primary" : "inherit"}
                variant={isActive ? "outlined" : "text"}
                onClick={() => navigate(`/${routePath}`)}
                sx={{
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

        {/* Right: profile dropdownw */}
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <ProfileDropdown
            username="JohnDoe"
            hours={42}
            points={1200}
          />
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;

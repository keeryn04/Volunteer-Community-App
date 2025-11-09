import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {AppBar, Toolbar, Typography, Button, Box} from "@mui/material";
import { useState, useEffect } from "react";
import { useCookies } from "react-cookie";

import ProfileDropdown from "../UserComponents/ProfileDropdown.tsx";
import { getPages } from "../../services/user.service.tsx";
import type { Pages } from "../../enums/Pages.enum.tsx";
import type { CookieValues } from "../../interfaces/Cookies.tsx";

const Header: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const formatPageName = (page: string) =>
    page.charAt(0).toUpperCase() + page.slice(1).toLowerCase();

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
          />
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;

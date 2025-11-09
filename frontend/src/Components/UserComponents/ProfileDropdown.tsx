import React, { useEffect, useState } from "react";
import { Menu, MenuItem, Typography, Box, Button, IconButton, Avatar, Modal } from "@mui/material";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import type GetUserResponse from "../../interfaces/api/response/GetUserResponse";
import { getUserDetails } from "../../services/user.service";

const ProfileDropdown: React.FC = () => {
  const [modalOpen, setModalOpen] = useState(false)
    const handleModalOpen = () => setModalOpen(true);
    const handleModalClose = () => setModalOpen(false);


  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const [cookies, setCookie, removeCookie] = useCookies(['USER_ID']);
  const [userData, setUserData] = useState<GetUserResponse>();
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
  useEffect(() => {
    const fetchUserData = async () => {
      const userId = cookies.USER_ID;
      const userDetails: GetUserResponse = await getUserDetails(userId);
      setUserData(userDetails);
    }
    fetchUserData();
  }, [])

  function stringToColor(string: string) {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = '#';

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
}

  function stringAvatar(name: string) {
  return {
    sx: {
      bgcolor: stringToColor(name),width:"90px", height:"90px", marginRight:"10px", fontSize:"2rem"
    },
    children: `${name[0][0]}`,
  };
}

function smallStringAvatar(name: string) {
  return {
    sx: {
      bgcolor: stringToColor(name),width:"40px", height:"40px", marginRight:"10px", fontSize:"1rem"
    },
    children: `${name[0][0]}`,
  };
}

  return (
    
    <Box sx={{width:"100%", height:"100%"}}>
      <Modal open={modalOpen} onClose={handleModalClose}>
        <Box sx={{
                    width: 600,
                    height:450,
                    bgcolor:"white",
                    borderRadius: 3,
                    boxShadow: 3,
                    position: "absolute" as "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    padding:"10px"
                }}
        >
          <Box sx={{display:"flex", flexDirection:"row", alignItems:"center", padding:"10px ", borderRadius:"10px", marginBottom:"15px", bgcolor:"secondary.light"}}>
            <Avatar {...stringAvatar((!!userData && userData.username).toString())}/>
            <Typography variant="h4" fontWeight={"bold"}>{!!userData && userData.username}</Typography>
              <Box sx={{ flexGrow: 1 }} />

              {/* Right side: Image */}
              <Box sx={{display:"flex", alignItems:"center", marginRight:"10px"}}>
                <Typography
                          variant="h5"
                          component="div" 
                          sx={{
                            marginRight:2,
                            fontWeight: 600,
                          }}
                          >
                            SideQuest
                          </Typography>
                <img  width="70px" height="auto" src="/SideQuest_Logo-Circle.png"/>
              </Box>
          </Box>
          <Box sx={{display:"flex", justifyContent:"space-evenly"}}>
            <Typography variant="h6" fontWeight={"bold"}>Total Points Earned: {!!userData && userData.points.toString()}</Typography>
            <Typography variant="h6" fontWeight={"bold"}>Total Hours Worked: {!!userData && userData.hours.toString()}</Typography>
          </Box>
          <Box sx={{display:"flex", alignItems:"center", flexDirection:"column", marginTop:"5px"}}>
            <Typography fontWeight={"bold"}>Hours worked this year</Typography>
            <img width="500" height="auto" src="/placeholderUserStatsGraph.png"/>
          </Box>
          
          
        </Box>
      </Modal>
      <IconButton sx={{ minWidth: 0, padding: 0 }} onClick={handleClick}>
          <Avatar {...smallStringAvatar((!!userData && userData.username).toString())}/>
      </IconButton>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <MenuItem disabled>
          <Typography variant="subtitle1">{!!userData && userData.username}</Typography>
        </MenuItem>
        <MenuItem disabled>
          <Typography variant="body2">Hours: {!!userData && userData.hours.toString()}</Typography>
        </MenuItem>
        <MenuItem disabled>
          <Typography variant="body2">Points: {!!userData && userData.points.toString()}</Typography>
        </MenuItem>

        <MenuItem
            onClick={handleModalOpen}
            sx={{
                color: "secondary",
                transition: "color 0.2s ease",
                "&:hover": {
                color: "green", // text turns red
                },
            }}
        >
          Export Profile
        </MenuItem>

        <MenuItem
            onClick={handleSignOut}
            sx={{
                color: "black",
                transition: "color 0.2s ease",
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

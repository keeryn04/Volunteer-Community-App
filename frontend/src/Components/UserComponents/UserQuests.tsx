import React from "react";
import { Typography } from "@mui/material";
import UserQuestsBoard from "./UserQuestsBody/UserQuestsBoard"

const UserQuest: React.FC = () => {
  return (
    <div>
        <Typography variant="h5" sx={{ mb: 2}}>
            My Quests
        </Typography>
        <UserQuestsBoard />
    </div>
  );
};

export default UserQuest;

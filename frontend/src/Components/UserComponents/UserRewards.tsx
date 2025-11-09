import React from "react";
import { Typography } from "@mui/material";
import UserRewardsBoard from "./UserRewardsBody/UserRewardsBoard";

const UserRewards: React.FC = () => {
  return (
    <div>
        <Typography variant="h5" sx={{ mb: 2, color:"white" }}>
            My Rewards
        </Typography>
        <UserRewardsBoard />
    </div>
  );
};

export default UserRewards;

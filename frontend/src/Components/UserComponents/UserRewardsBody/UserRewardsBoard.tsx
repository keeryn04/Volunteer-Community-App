import React, { useEffect, useState } from "react";

import {Box, Grid} from "@mui/material";
import type Reward from "../../../interfaces/Reward";
import UserRewardsRewardCard from "./UserRewardsRewardCard";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { getAllRewards, getUserRewards } from "../../../services/reward.service";
import type GetUserRewardsResponse from "../../../interfaces/api/response/GetUserRewardsResponse";
import type { CookieValues } from "../../../interfaces/Cookies";

const UserRewardsBoard: React.FC = () => {

  const [loadedRewards, setLoadedRewards] = useState<Reward[]>()
  const [claimedRewardIds, setClaimedRewardIds] = useState<String[]>([])
  const [userPoints, setUserPoints] = useState<Number>(0);
  const [cookies, setCookie, removeCookie] = useCookies<'USER_ID', CookieValues>(['USER_ID']);
  const navigate = useNavigate();

  useEffect(() => {
      const userId = cookies.USER_ID;
      if(!userId || userId === "-1"){
        console.log("Invalid UserId", userId);
        navigate("/");
        return;
      }
      // Fetch rewards and claimed rewards / points
      const getReward = async() => {
        const allRewards = ( await getAllRewards()).rewards;
        setLoadedRewards(allRewards);
      };
      const getClaimedRewards = async() => {
        const userRewardsReponse: GetUserRewardsResponse = (await getUserRewards(userId));
        setClaimedRewardIds(userRewardsReponse.claimedRewardIds);
        setUserPoints(userPoints);
      }
  
      getReward();
      getClaimedRewards();
    }, []);

  return (
    <div>
      <main style={{ paddingTop: "70px" }}>
        <Box width="100%" height="100%" sx={{display:"flex", justifyContent:"center"}}>
          <Grid container rowSpacing={6} columnSpacing={7} justifyContent="center">
            {loadedRewards && loadedRewards.map((item, index) => (
              claimedRewardIds.includes(item.rewardId) && (
              <Grid key={index}>
                <UserRewardsRewardCard
                  reward={item}
                />
              </Grid>
              )
            ))}
          </Grid>
        </Box>
      </main>
    </div>
  );
};

export default UserRewardsBoard;

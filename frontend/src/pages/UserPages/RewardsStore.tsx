import React, { useCallback, useEffect, useState } from "react";
import Header from "../../Components/GeneralComponents/Header";

import {Box, Grid, Typography} from "@mui/material";
import type Reward from "../../interfaces/Reward";
import RewardsCard from "../../Components/UserComponents/RewardsCard";
import { useCookies } from "react-cookie";
import type { CookieValues } from "../../interfaces/Cookies";
import { useNavigate } from "react-router-dom";
import { getAllRewards, getUserRewards, redeemReward } from "../../services/reward.service";
import type GetUserRewardsResponse from "../../interfaces/api/response/GetUserRewardsResponse";

const RewardsStore: React.FC = () => {

  const [loadedRewards, setLoadedRewards] = useState<Reward[]>()
  const [claimedRewardIds, setClaimedRewardIds] = useState<String[]>([])
  const [reloadClaimedRewards, setReloadClaimedRewards] = useState<boolean>(false);
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
      setUserPoints(userRewardsReponse.userPoints);
    }
    getReward();
    getClaimedRewards();
  }, []);

  useEffect(() => {
    const fetchClaimedRewards = async() => {
      const userId = cookies.USER_ID;
      const userRewardsReponse: GetUserRewardsResponse = (await getUserRewards(userId));
      if(reloadClaimedRewards){
        setClaimedRewardIds(userRewardsReponse.claimedRewardIds);
        setUserPoints(userRewardsReponse.userPoints);
      }
    }
    fetchClaimedRewards();
  }, [reloadClaimedRewards])
  const reloadClaimed = () => {
    setReloadClaimedRewards(true);
  }

  return (
    <div>
      <Header />
      <main style={{ paddingTop: "70px" }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "left",
          mb: 4,
        }}
      >
        <Box
          sx={{
            backgroundColor: "#8BC86F", // green
            borderRadius: "16px",
            padding: "8px 20px",
            boxShadow: 2,
            marginLeft:"88px",
            marginTop: "12px"
          }}
        >
          <Typography
            variant="h6"
            component="div"
            color="#191919"
            sx={{ fontWeight: 600 }}
          >
            POINTS: {userPoints && userPoints.toString()}
          </Typography>
        </Box>
      </Box>
        <Box maxWidth="100%" maxHeight="100%" padding="48px" sx={{display:"flex", justifyContent:"center"}}>
          <Grid container rowSpacing={6} columnSpacing={7} justifyContent="center">
            {loadedRewards && loadedRewards.map((item, index) => (
              <Grid key={index}>
                <RewardsCard
                  reward={item}
                  redeemed={claimedRewardIds.includes(item.rewardId)}
                  onRedeem={reloadClaimed}
                />
              </Grid>
            ))}
          </Grid>
        </Box>
      </main>
    </div>
  );
};

export default RewardsStore;

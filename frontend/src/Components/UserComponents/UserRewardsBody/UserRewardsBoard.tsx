import React, { useState } from "react";

import {Box, Grid} from "@mui/material";
import type Reward from "../../../interfaces/Reward";
import UserRewardsRewardCard from "./UserRewardsRewardCard";

const UserRewardsBoard: React.FC = () => {

  const [loadedRewards, setLoadedRewards] = useState<Reward[]>(
    [
        {
            "rewardId": "0",
            "numPoints": 50,
            "title": "Free Coffee Voucher",
            "description": "Enjoy a free medium coffee from BeanWorks CafÃ©.",
            "imageURL": "https://example.com/images/coffee.png"
        },
        {
            "rewardId": "1",
            "numPoints": 100,
            "title": "Movie Ticket",
            "description": "Redeem a single movie pass at CineMax Theatres.",
            "imageURL": "https://example.com/images/movie-ticket.png"
        },
        {
            "rewardId": "2",
            "numPoints": 150,
            "title": "Bakery Treat Pack",
            "description": "Receive a box of pastries from SweetCrumbs Bakery.",
            "imageURL": "https://example.com/images/pastries.png"
        },
        {
            "rewardId": "3",
            "numPoints": 250,
            "title": "Gym Day Pass",
            "description": "Access FitZone Gym for one full day, including sauna use.",
            "imageURL": "https://example.com/images/gym-pass.png"
        },
        {
            "rewardId": "4",
            "numPoints": 300,
            "title": "Restaurant Gift Card",
            "description": "Enjoy a $20 meal voucher for The Local Table restaurant.",
            "imageURL": "https://example.com/images/restaurant-card.png"
        },
        {
            "rewardId": "5",
            "numPoints": 400,
            "title": "Bookstore Credit",
            "description": "Get $25 credit at PageTurner Books for your next read.",
            "imageURL": "https://example.com/images/bookstore.png"
        },
        {
            "rewardId": "6",
            "numPoints": 500,
            "title": "Clothing Store Discount",
            "description": "Receive 30% off your next purchase at UrbanWear Co.",
            "imageURL": "https://example.com/images/clothing.png"
        },
        {
            "rewardId": "7",
            "numPoints": 600,
            "title": "Spa Voucher",
            "description": "Enjoy a relaxing 30-minute massage at Serenity Spa.",
            "imageURL": "https://example.com/images/spa.png"
        },
        {
            "rewardId": "8",
            "numPoints": 750,
            "title": "Tech Store Gift Card",
            "description": "Redeem a $50 gift card at TechWorld Electronics.",
            "imageURL": "https://example.com/images/tech-card.png"
        },
        {
            "rewardId": "9",
            "numPoints": 900,
            "title": "Hotel Stay Discount",
            "description": "Save $75 on your next stay at BlueSky Hotel.",
            "imageURL": "https://example.com/images/hotel.png"
        },
        {
            "rewardId": "10",
            "numPoints": 1000,
            "title": "Weekend Getaway Package",
            "description": "Enjoy a 2-night weekend stay for two at Lakeside Resort.",
            "imageURL": "https://example.com/images/resort.png"
        }
    ]
  )

  return (
    <div>
      <main style={{ paddingTop: "70px" }}>
        <Box width="100%" height="100%" sx={{display:"flex", justifyContent:"center"}}>
          <Grid container rowSpacing={6} columnSpacing={7} justifyContent="center">
            {loadedRewards.map((item, index) => (
              <Grid>
                <UserRewardsRewardCard
                  key={index}
                  reward={item}
                />
              </Grid>
            ))}
          </Grid>
        </Box>
      </main>
    </div>
  );
};

export default UserRewardsBoard;

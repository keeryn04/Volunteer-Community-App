import React, { useState } from "react";
import {
  Modal,
  Card,
  CardMedia,
  CardContent,
  CardActionArea,
  Typography,
  Box,
  Button,
} from "@mui/material";
import type Reward from "../../../interfaces/Reward";

type RewardCardProps = {
  reward: Reward;
};

const RewardsCard: React.FC<RewardCardProps> = ({ reward }) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Box>
      {/* Modal */}
      <Modal open={open} onClose={handleClose}>
        <Card
          sx={{
            width: 500,
            borderRadius: 3,
            boxShadow: 4,
            position: "absolute" as const,
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "secondary.light",
          }}
        >
          {/* Reward Image */}
        <CardMedia
            component="img"
            src={reward.imageURL?.toString() || "/RewardImgPlaceholder.jpg"}
            alt="Reward image"
            sx={{ objectFit: "cover", width: "100%", height: "auto" }}
        />

          {/* Modal Content */}
          <CardContent>
            <Typography variant="h5" sx={{ fontWeight: 600, mb: 1 }}>
              {reward.title}
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 1 }}>
              {reward.description}
            </Typography>

          </CardContent>
        </Card>
      </Modal>

      {/* Main Card */}
      <Card
        sx={{
          position: "relative",
          zIndex: 1,
          maxWidth: 250,
          borderRadius: 3,
          boxShadow: 3,
          overflow: "hidden",
          bgcolor: "secondary.light",
          cursor: "pointer",
        }}
      >
        <CardActionArea onClick={handleOpen}>
          <CardContent>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                mb: 0.5,
              }}
            >
              <Typography
                variant="h6"
                component="div"
                sx={{ fontWeight: 600, mr: 1 }}
              >
                {reward.title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {reward.description}
              </Typography>
            </Box>
          </CardContent>

          <CardMedia
            component="img"
            height="200"
            image={"/EventImgPlaceholder.jpg"}
            alt={"Img not found"}
            sx={{ objectFit: "cover" }}
          />
        </CardActionArea>
      </Card>
    </Box>
  );
};

export default RewardsCard;

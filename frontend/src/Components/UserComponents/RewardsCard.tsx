import React, { useState } from "react";
import { Modal, Card, CardMedia, CardContent, CardActionArea, Typography, Box, Button } from "@mui/material";
import type Reward from "../../interfaces/Reward";

type RewardCardProps = {
    reward: Reward
}

const rewardModalStyle = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };

const RewardsCard: React.FC<RewardCardProps> = ({reward}) => {

    const [open, setOpen] = useState(false)
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    

    return(
        <Box>
            {/* Main Card */}
            <Card
            
            sx={{
                position: "relative",
                zIndex:1,
                maxWidth: 250,
                borderRadius: 3,
                boxShadow: 3,
                overflow: "hidden",
                bgcolor: "secondary.light"
            }}
            >
                {/* Text Content */}
                <CardContent>
                    {/* Title + Organization */}
                    <Box sx={{ display: "flex", flexDirection:"column", alignItems: "left", mb: 0.5 }}>
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
                {/* Top Image */}
                <CardMedia
                    component="img"
                    height="200"
                    image={"/EventImgPlaceholder.jpg"}
                    alt={"Img not found"}
                    sx={{ objectFit: "cover" }}
                />
                {/* Text Content */}
                <CardContent>
                    {/* Title + Organization */}
                    <Box sx={{ display: "flex", flexDirection:"column", alignItems: "left", mb: 0.5 }}>
                        <Typography
                            variant="h6"
                            component="div"
                            sx={{ fontWeight: 600, mr: 1 }}
                        >
                            Point Needed: {reward.numPoints.toString()}
                        </Typography>
                    </Box>
                    <Button variant="contained" color="secondary">Redeem</Button>
                </CardContent>
                
            </Card>
        </Box>
    )
}

export default RewardsCard

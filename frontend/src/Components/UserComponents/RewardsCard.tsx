import React, { useState } from "react";
import { Modal, Card, CardMedia, CardContent, CardActionArea, Typography, Box, Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions} from "@mui/material";
import type Reward from "../../interfaces/Reward";
import { redeemReward } from "../../services/reward.service";
import { Cookies, useCookies } from "react-cookie";
import type { CookieValues } from "../../interfaces/Cookies";

type RewardCardProps = {
    reward: Reward,
    redeemed: boolean,
    onRedeem: () => void,
}

const rewardModalStyle = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: '#13625B',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };

const RewardsCard: React.FC<RewardCardProps> = ({reward, redeemed, onRedeem}) => {
    const [cookies, setCookie, removeCookie] = useCookies<'USER_ID', CookieValues>(['USER_ID']);
    const [openConfirm, setOpenConfirm] = useState(false);

    const [open, setOpen] = useState(false)
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleRedeemClick = () => setOpenConfirm(true);
    const handleCloseConfirm = () => setOpenConfirm(false);
    const handleConfirmRedeem = () => {
        handleRedeem();
    };
    const handleRedeem = async () => {
        const userId = cookies.USER_ID;
        const rewardId = reward.rewardId;
        if(!userId || userId === "-1"){
            console.log("Invalid userId");
            return
        }
        const response = await redeemReward(userId, rewardId);
        onRedeem();
        handleCloseConfirm()
    }

    return(
        <Box>
            {/* Main Card */}
            <Card
                sx={{
                position: "relative",
                zIndex: 1,
                maxWidth: 250,
                height: 450,
                borderRadius: 3,
                boxShadow: 3,
                overflow: "hidden",
                bgcolor: redeemed ? "grey.300" : "secondary.light",
                opacity: redeemed ? 0.6 : 1,
                transition: "0.3s ease",
                }}
            >
                {/* Reward Info */}
                <CardContent>
                <Box sx={{ display: "flex", flexDirection: "column", mb: 0.5 }}>
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

                {/* Reward Image */}
                <CardMedia
                    component="img"
                    height="200"
                    src={reward.imageURL?.toString() || "/RewardImgPlaceholder.jpg"}
                    alt={reward.title}
                    sx={{ objectFit: "cover" }}
                />

                {/* Points and Redeem Button */}
                <CardContent>
                <Typography
                    variant="h6"
                    component="div"
                    sx={{ fontWeight: 600, mb: 1 }}
                >
                    Points Needed: {reward.numPoints.toString()}
                </Typography>

                {redeemed ? (
                    <Button variant="contained" color="inherit" disabled fullWidth>
                    Redeemed
                    </Button>
                ) : (
                    <Button variant="contained" color="secondary" fullWidth onClick={handleRedeemClick}>
                    Redeem
                    </Button>
                )}
                </CardContent>
            </Card>

            {/* Confirmation Dialog */}
            <Dialog open={openConfirm} onClose={handleCloseConfirm}>
                <DialogTitle>Confirm Redemption</DialogTitle>
                <DialogContent>
                <DialogContentText>
                    Are you sure you want to redeem <b>{reward.title}</b> for{" "}
                    <b>{reward.numPoints.toString()}</b> points?
                </DialogContentText>
                </DialogContent>
                <DialogActions>
                <Button onClick={handleCloseConfirm}>Cancel</Button>
                <Button
                    onClick={handleConfirmRedeem}
                    color="secondary"
                    variant="contained"
                >
                    Confirm
                </Button>
                </DialogActions>
            </Dialog>
        </Box>
    )
}

export default RewardsCard

import React, { use, useState } from "react";
import { Modal, Card, CardMedia, CardContent, CardActionArea, Typography, Box, Button } from "@mui/material";
import type Event from "../../interfaces/Event";
import { useCookies } from "react-cookie";
import type { CookieValues } from "../../interfaces/Cookies";
import { applyToEvent } from "../../services/event.service";

type EventCardProps = {
    event: Event,
    onReloadEvents: () => void,
}

const eventModalStyle = {
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

const EventCard: React.FC<EventCardProps> = ({event, onReloadEvents}) => {

    const [open, setOpen] = useState(false)
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [cookies] = useCookies<'USER_ID', CookieValues>(['USER_ID']);

    const handleApply = async () => {
        const userId: String = cookies.USER_ID;
        if(!userId || userId === "-1"){
            return;
        }
        const success = await applyToEvent(userId, event.eventId);
        if(success){
            onReloadEvents();
            console.log("Succesfully Applied to Event");
        }
        handleClose();
    }    

    return(
        <Box>
            {/* Card Modal when focused on it */}
            <Modal 
                open={open}
                onClose={handleClose}
            >
                <Card
            
                sx={{
                    width: 600,
                    borderRadius: 3,
                    boxShadow: 3,
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    bgcolor: "#13625B"
                }}
                >
                    {/* Top Image */}
                    <CardMedia
                        component="img"
                        image={event.eventImg?.toString() || "/EventImgPlaceholder.jpg"}
                        alt={"Img not found"}
                        sx={{ objectFit: "cover", width:"100%", height:"auto", maxHeight:"300px" }}
                    />

                    {/* Text Content */}
                    <CardContent>
                        {/* Title + Organization */}
                        <Box sx={{ display: "flex", alignItems: "center", mb: 0.5 }}>
                            <Typography
                                variant="h6"
                                component="div"
                                color="#FAF8F7"
                                sx={{ fontWeight: 600, mr: 1 }}
                            >
                                {event.title}
                            </Typography>
                            <Typography variant="body2" color="#8BC86F">
                                {event.organizationLabel}
                            </Typography>
                        </Box>

                        {/* Location + Time */}
                        <Typography
                        variant="body2"
                        color="#8BC86F"
                        sx={{ mb: 1 }}
                        >
                        {event.location} • {event.time}
                        </Typography>

                        {/* Description */}
                        <Typography variant="body2" color="#FAF8F7">
                        {event.description}
                        </Typography>
                        <Box sx={{display:"flex", justifyContent:"right"}}>
                            <Button variant="contained" color="secondary" onClick={handleApply}>Apply</Button>
                        </Box>
                        
                    </CardContent>
                </Card>
            </Modal>

            {/* Main Card */}
            <Card
            
            sx={{
                position: "relative",
                zIndex:1,
                maxWidth: 400,
                borderRadius: 3,
                boxShadow: 3,
                overflow: "hidden",
            }}
            >
                <CardActionArea onClick={handleOpen}>
                {/* Top Image */}
                <CardMedia
                    component="img"
                    height="200"
                    src={event.eventImg?.toString() || "/EventImgPlaceholder.jpg"}
                    alt={"Img not found"}
                    sx={{ objectFit: "cover" }}
                />

                {/* Text Content */}
                <CardContent>
                    {/* Title + Organization */}
                    <Box sx={{ display: "flex", alignItems: "center", mb: 0.5 }}>
                        <Typography
                            variant="h6"
                            component="div"
                            sx={{ fontWeight: 600, mr: 1 }}
                        >
                            {event.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {event.organizationLabel}
                        </Typography>
                    </Box>

                    {/* Location + Time */}
                    <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mb: 1 }}
                    >
                    {event.location} • {event.time}
                    </Typography>
                </CardContent>
                </CardActionArea>
            </Card>
        </Box>
    )
}

export default EventCard

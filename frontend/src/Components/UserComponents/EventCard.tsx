import React, { useState } from "react";
import { Modal, Card, CardMedia, CardContent, CardActionArea, Typography, Box, Button } from "@mui/material";
import type Event from "../../interfaces/Event";

type EventCardProps = {
    event: Event
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

const EventCard: React.FC<EventCardProps> = ({event}) => {

    const [open, setOpen] = useState(false)
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    

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
                    position: "absolute" as "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)"
                }}
                >
                    {/* Top Image */}
                    <CardMedia
                        component="img"
                        image={"/EventImgPlaceholder.jpg"}
                        alt={"Img not found"}
                        sx={{ objectFit: "cover", width:"100%", height:"auto" }}
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

                        {/* Description */}
                        <Typography variant="body2" color="text.primary">
                        {event.description}
                        </Typography>
                        <Box sx={{display:"flex", justifyContent:"right"}}>
                            <Button variant="contained" color="secondary">Apply</Button>
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
                    image={"/EventImgPlaceholder.jpg"}
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

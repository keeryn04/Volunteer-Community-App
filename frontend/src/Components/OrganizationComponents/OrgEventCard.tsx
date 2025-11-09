import React, { useState } from "react";
import { Modal, Card, CardMedia, CardContent, CardActionArea, Typography, Box, Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, List, ListItem, ListItemText, Divider} from "@mui/material";
import type Event from "../../interfaces/Event";
import { useCookies } from "react-cookie";
import type { CookieValues } from "../../interfaces/Cookies";
import axios from "axios";

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

const OrgEventCard: React.FC<EventCardProps> = ({event}) => {

    const [open, setOpen] = useState(false)
    const [openConfirm, setOpenConfirm] = useState(false);
    const [completed, setCompleted] = useState(false);
    const [cookies] = useCookies<'USER_ID', CookieValues>(['USER_ID']);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleCompleteClick = () => setOpenConfirm(true);
    const handleCloseConfirm = () => setOpenConfirm(false);
    const handleConfirmComplete = () => {
        const userId: String = cookies.USER_ID;
        approveEvent(event.eventId);
        setCompleted(true);
        setOpenConfirm(false);
        setOpen(false); 
    };
    const approveEvent = async (eventId: String) => {
        try{
            const response = await axios.post(`/api/${eventId}/events/approve`);
            console.log("Response: ",response.data)
        }catch (error){
            console.log("Error", error);
        }
        
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
                    position: "absolute" as "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)"
                }}
                >
                    {/* Top Image */}
                    <CardMedia
                        component="img"
                        src={event.eventImg?.toString() || "/EventImgPlaceholder.jpg"}
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

                        {/*volunteer list*/}
                        {event.volunteers && event.volunteers.length > 0 ? (
                        <Box sx={{ mt: 2, mb: 2 }}>
                            <Typography
                            variant="subtitle1"
                            sx={{
                                mb: 0.5,
                                fontWeight: 600,
                                color: "primary.main",
                                display: "inline-block",
                            }}
                            >
                            Volunteers
                            </Typography>

                            <List 
                                dense
                                sx={{
                                    mt: 0.1, 
                                    p: 0,  
                                }}
                            >
                            {event.volunteers.map((volunteer) => (
                                <React.Fragment key={volunteer.userId}>
                                <ListItem>
                                    <ListItemText primary={`• ${volunteer.username}`}/>
                                </ListItem>
                                <Divider />
                                </React.Fragment>
                            ))}
                            </List>
                        </Box>
                        ) : (
                        <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
                            No volunteers have signed up yet.
                        </Typography>
                        )}

                        {/* Description */}
                        <Typography variant="body2" color="text.primary">
                        {event.description}
                        </Typography>
                        <Box sx={{ display: "flex", justifyContent: "right" }}>
                        <Button
                            variant="contained"
                            color={completed ? "inherit" : "secondary"}
                            disabled={completed}
                            onClick={handleCompleteClick}
                        >
                            {completed ? "COMPLETED" : "COMPLETE EVENT"}
                        </Button>
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
                bgcolor: completed ? "grey.300" : "white",
                opacity: completed ? 0.6 : 1,
                transition: "0.3s ease",
            }}
            >
                <CardActionArea onClick={handleOpen} disabled={completed}>
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

            {/* Confirmation Dialog */}
            <Dialog open={openConfirm} onClose={handleCloseConfirm}>
                <DialogTitle>Confirm Completion</DialogTitle>
                <DialogContent>
                <DialogContentText>
                    Are you sure you want to mark <b>{event.title}</b> as completed?
                </DialogContentText>
                </DialogContent>
                <DialogActions>
                <Button onClick={handleCloseConfirm}>Cancel</Button>
                <Button
                    onClick={handleConfirmComplete}
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

export default OrgEventCard

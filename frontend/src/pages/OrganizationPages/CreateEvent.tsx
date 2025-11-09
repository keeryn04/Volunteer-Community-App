import React, { useState } from "react";
import Header from "../../Components/GeneralComponents/Header";

import { Box, TextField, Typography, Button } from "@mui/material";
import dayjs, { Dayjs } from "dayjs";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from "@mui/x-date-pickers";

import type Event from "../../interfaces/Event";

const textFieldStyle = {
    width:"350px",
    marginBottom:"10px",
    marginRight:"15px",
    marginLeft:"15px",
    bgcolor:"white",
    borderRadius:"5px",
    "& .MuiFilledInput-root": {
      bgcolor: "white", // inner background
    },
}

const CreateEvent: React.FC = () => {

    const [formData, setFormData] = useState({
        title:"",
        description:"",
        location:"",
        time:""

    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleDateChange = (newValue: Dayjs | null) => {
        if (newValue) {
            const formatted = newValue.format("YYYY-MM-DDTHH:mm:ss");
            setFormData((prev) => ({ ...prev, eventTime: formatted }));
        }
    };

    return (
    <div>
      <Header />
      <main style={{ display:"flex", paddingTop: "70px", justifyContent:"center", flexDirection:"column", paddingLeft:"60px", paddingRight:"60px" }}>

        <form>
            <Box bgcolor="secondary.main" sx={{display:"flex", flexDirection:"column", alignItems:"center", padding:"35px", borderRadius:"15px"}}>
                <Typography width="100%" variant="h4" sx={{paddingBottom:"10px"}}>Create a new event</Typography>
                <Typography width="100%" variant="body2" color="text.secondary">* Indicates a required field</Typography>
                <Box>
                    <TextField 
                    variant="filled"
                    label="Event Title" 
                    name="title"
                    placeholder="Please enter your event's title..."
                    onChange={(handleChange)}
                    required
                    sx={textFieldStyle}
                    >

                    </TextField>
                    <TextField 
                    variant="filled"
                    label="Description" 
                    name="description"
                    placeholder="Please enter a description of your event..."
                    onChange={(handleChange)}
                    required
                    sx={textFieldStyle}
                    >

                    </TextField>
                </Box>

                <Box>
                    <TextField 
                    variant="filled"
                    label="Location" 
                    name="location"
                    placeholder="Please enter the location of the event..."
                    onChange={(handleChange)}
                    required
                    sx={textFieldStyle}
                    >

                    </TextField>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DateTimePicker 
                        label="Date / Time of the event *" 
                        onChange={handleDateChange}
                        sx={{width:"350px", bgcolor:"white", borderRadius:"5px", marginRight:"15px", marginLeft:"15px"}}
                    />
                    </LocalizationProvider>
                </Box>

                <Button variant="contained" color="primary">Upload an event image</Button>
                <Typography variant="body2" color="text.secondary">(Optional)</Typography>
                
                <Box width="100%" sx={{display:"flex", justifyContent:"right"}}>
                    <Button variant="contained" sx={{marginTop:"10px"}} onClick={() => {console.log(formData)}}>Submit for Approval</Button>
                </Box>
                
            </Box>
        </form>
        <Typography variant="body2" color="text.secondary" sx={{paddingX:"85px"}}>* Note that all submitted events will be processed by our moderation staff. These events will be pending approval until aspects such as the organization legitimacy, selected location and tasks have been confirmed. Until this point Side Quest reserves the right to disapprove of any events without notice.</Typography>
      </main>
    </div>
  );
};

export default CreateEvent;
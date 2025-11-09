import { Box, TextField, Typography, Button } from "@mui/material"
import { useState } from "react";
import { userLogin } from "../../services/user.service";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import type { CookieValues } from "../../interfaces/Cookies";
const LoginPage = () => {
    const [cookies, setCookie, removeCookie] = useCookies<'USER_ID', CookieValues>(['USER_ID']);
    
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const userId: String = (await userLogin(username, password)).userId
        if(userId === "-1")
            return null;
        //Setting expiry date for tomorrow (24hrs from now)
        const today: Date = new Date();
        const tomorrow: Date = new Date(today);
        tomorrow.setDate(today.getDate() + 1);
        
        setCookie('USER_ID', userId, {expires: tomorrow});
        navigate('/volunteer');
    }
    
    return(
        <Box sx={{display:"flex", alignItems:"center", flexDirection:"column"}}>
            {/* Title */}
            <Box bgcolor="primary.main" sx={{padding:"20px", margin:"10px", borderRadius:"50px"}}>
                <Typography variant="h1" >Side Quest</Typography>
            </Box>

            {/* Subtitle */}
            <Typography width="550px" variant="h4" textAlign="center">A volunteering opportunities dashboard</Typography>

            {/* Login Section */}
            <Box 
                width="550px" 
                sx={{display:"flex", flexDirection:"column", margin:"10px", alignItems:"center"}}
                component="form"
                onSubmit={handleSubmit}    
            >
                <Box sx={{display:"flex", flexDirection:"row", margin:"5px"}}>
                    <Typography width="90px" sx={{marginRight:"10px"}}>Username:</Typography>
                    <TextField
                        label="Username"
                        type="username"
                        variant="outlined"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    ></TextField>
                </Box>
                <Box sx={{display:"flex", flexDirection:"row", paddingBottom:"10px"}}>
                    <Typography width="90px" sx={{marginRight:"10px"}}>Password:</Typography>
                    <TextField
                        label="Password"
                        type="password"
                        variant="outlined"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    ></TextField>
                </Box>
                <Button color="secondary" variant="contained" type="submit">Login</Button>
            </Box>
        </Box>
    )
}

export default LoginPage
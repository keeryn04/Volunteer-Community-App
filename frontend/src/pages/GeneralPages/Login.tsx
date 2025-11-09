import { Box, TextField, Typography, Button } from "@mui/material"
import { useState } from "react";
import { getUserDetails, userLogin } from "../../services/user.service";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import type { CookieValues } from "../../interfaces/Cookies";
import { UserType, type User } from "../../interfaces/User";
const LoginPage = () => {
    const [cookies, setCookie, removeCookie] = useCookies<'USER_ID', CookieValues>(['USER_ID']);
    
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [inputError, setInputError] = useState(false);

    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const userId: String = (await userLogin(username, password)).userId
        if(userId === "-1"){   
            setInputError(true);         
            return null;
        }
        setInputError(false);
        //Setting expiry date for tomorrow (24hrs from now)
        const today: Date = new Date();
        const tomorrow: Date = new Date(today);
        tomorrow.setDate(today.getDate() + 1);
        
        setCookie('USER_ID', userId, {expires: tomorrow});

        //Check the type of the user
        const user = (await getUserDetails(userId))

        console.log(user)

        if (user.userType == UserType.Volunteer)
            navigate('/volunteer');
        else
            navigate('/myEvents');
    }
    
    return(
        <Box
        sx={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            minHeight: "100vh",
            minWidth: "100vw",
            backgroundColor: "#ebebebff", // dark base background
            justifyContent: "center",
            color: "#FAF8F7",
        }}
        >
        {/* Title */}
        <Box
            sx={{
            backgroundColor: "#13625B", // teal-green accent
            display:"flex",
            alignItems:"center",
            padding: "20px 50px",
            marginBottom: "20px",
            borderRadius: "40px",
            boxShadow: "0 6px 20px rgba(0, 0, 0, 0.3)",
            }}
        >
            <img  width="70px" height="auto" src="/SideQuest_Logo-Circle.png"/>
            <Typography
            variant="h1"
            sx={{
                marginLeft:"10px",
                fontSize: "3rem",
                fontWeight: 700,
                letterSpacing: "2px",
                color: "#FAF8F7",
                textShadow: "0 2px 5px rgba(0,0,0,0.3)",
            }}
            >
            Side Quest
            </Typography>
        </Box>

        {/* Subtitle */}
        <Typography
            width="550px"
            variant="h5"
            textAlign="center"
            sx={{
            color: "#51813bff",
            marginBottom: "40px",
            fontWeight: 400,
            }}
        >
            A volunteering opportunities dashboard
        </Typography>

        {/* Login Section */}
        <Box
            width="500px"
            component="form"
            onSubmit={handleSubmit}
            sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            backgroundColor: "#123D33",
            padding: "40px 30px",
            borderRadius: "20px",
            boxShadow: "0 4px 15px rgba(0,0,0,0.4)",
            }}
        >
            {/* Username */}
            <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center", marginBottom: "20px", width: "100%" }}>
            <Typography
                width="90px"
                sx={{ marginRight: "10px", fontWeight: 500, color: "#FAF8F7" }}
            >
                Username:
            </Typography>
            <TextField
                fullWidth
                label="Username"
                type="username"
                variant="outlined"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                sx={{
                "& .MuiOutlinedInput-root": {
                    "& fieldset": { borderColor: "#8BC86F" },
                    "&:hover fieldset": { borderColor: "#13625B" },
                    "&.Mui-focused fieldset": { borderColor: "#8BC86F" },
                },
                "& .MuiInputLabel-root": { color: "#FAF8F7" },
                "& .MuiInputBase-input": { color: "#FAF8F7" },
                }}
            />
            </Box>

            {/* Password */}
            <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center", marginBottom: "30px", width: "100%" }}>
            <Typography
                width="90px"
                sx={{ marginRight: "10px", fontWeight: 500, color: "#FAF8F7" }}
            >
                Password:
            </Typography>
            <TextField
                fullWidth
                label="Password"
                type="password"
                variant="outlined"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                error={inputError}
                sx={{
                "& .MuiOutlinedInput-root": {
                    "& fieldset": { borderColor: "#8BC86F" },
                    "&:hover fieldset": { borderColor: "#13625B" },
                    "&.Mui-focused fieldset": { borderColor: "#8BC86F" },
                },
                "& .MuiInputLabel-root": { color: "#FAF8F7" },
                "& .MuiInputBase-input": { color: "#FAF8F7" },
                }}
            />
            </Box>

            {/* Button */}
            <Button
            color="secondary"
            variant="contained"
            type="submit"
            sx={{
                backgroundColor: "#8BC86F",
                color: "#191919",
                fontWeight: 600,
                width: "100%",
                padding: "12px",
                borderRadius: "10px",
                "&:hover": {
                backgroundColor: "#13625B",
                color: "#FAF8F7",
                },
            }}
            >
            Login
            </Button>
        </Box>
        </Box>

    )
}

export default LoginPage
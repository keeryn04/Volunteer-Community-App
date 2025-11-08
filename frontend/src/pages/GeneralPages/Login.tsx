import { Box, TextField, Typography, Button } from "@mui/material"

const LoginPage = () => {
    return(
        <Box sx={{display:"flex", alignItems:"center", flexDirection:"column"}}>
            {/* Title */}
            <Box bgcolor="primary.main" sx={{padding:"20px", margin:"10px", borderRadius:"50px"}}>
                <Typography variant="h1" >Side Quest</Typography>
            </Box>

            {/* Subtitle */}
            <Typography width="550px" variant="h4" textAlign="center">A volunteering opportunities dashboard</Typography>

            {/* Login Section */}
            <Box width="550px" sx={{display:"flex", flexDirection:"column", margin:"10px", alignItems:"center"}}>
                <Box sx={{display:"flex", flexDirection:"row", margin:"5px"}}>
                    <Typography width="90px" sx={{marginRight:"10px"}}>Username:</Typography>
                    <TextField></TextField>
                </Box>
                <Box sx={{display:"flex", flexDirection:"row", paddingBottom:"10px"}}>
                    <Typography width="90px" sx={{marginRight:"10px"}}>Password:</Typography>
                    <TextField></TextField>
                </Box>
                <Button color="secondary" variant="contained">Login</Button>
            </Box>
            
        </Box>
    )
}

export default LoginPage
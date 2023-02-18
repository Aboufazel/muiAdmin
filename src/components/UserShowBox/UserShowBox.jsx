import {Box} from "@mui/system";
import {Avatar, FormControlLabel, FormGroup, IconButton, Switch, Typography} from "@mui/material";
import Theme from "../Theme/Theme";
import DeleteIcon from '@mui/icons-material/Delete';
import ModeIcon from '@mui/icons-material/Mode';

const UserShowBox = ({username , email , mobile , user , active}) => {


    return(
        <Box>
            <Box mb={2} paddingX={2}
                 display={"flex"}
                 gap={6}
                 alignItems={"center"}
                 justifyContent={'center'}
                 bgcolor={"white"}
                 sx={{height:75 ,width:'100%' , borderRadius:3}}>
                {
                    user !== 4 ? <Avatar sx={{fontSize:12 , bgcolor: Theme.palette.error.main }}>admin</Avatar> :
                        <Avatar sx={{fontSize:15 , bgcolor: Theme.palette.warning.main }}>user</Avatar>
                }
                <Typography fontSize={16} fontWeight={"bold"} variant={'h6'}>
                    {username}
                </Typography>
                <Typography fontSize={16} fontWeight={"bold"} variant={'h6'}>
                    {email}
                </Typography>
                <Typography fontSize={16} fontWeight={"bold"} variant={'h6'}>
                    {mobile}
                </Typography>
                <Typography fontSize={16} fontWeight={"bold"} variant={'h6'}>
                    {user === 4 ?  "کاربر عادی" : "مدیر"}
                </Typography>
                <FormGroup>
                    {
                        active === 1 ?
                            <FormControlLabel
                                control={<Switch defaultChecked color={"success"} />}
                                label="فعال" />
                            :<FormControlLabel
                                control={<Switch  color={"success"} />}
                            />
                    }
                </FormGroup>
                <Box display={"flex"} gap={2}>
                    <IconButton aria-label="delete" size="large">
                        <ModeIcon color={"warning"} fontSize="inherit" />
                    </IconButton>
                    <IconButton aria-label="delete" size="large">
                        <DeleteIcon color={"error"} fontSize="inherit" />
                    </IconButton>
                </Box>
            </Box>
        </Box>
    )
}


export default UserShowBox;
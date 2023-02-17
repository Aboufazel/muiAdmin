import {Box} from "@mui/system";
import {Avatar, Button, FormControlLabel, FormGroup, Switch, Typography} from "@mui/material";

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
                <Avatar sx={{fontSize:15 , bgcolor: "#ed6c02" }}>user</Avatar>
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
                    <Button variant={"contained"} color={"warning"}>
                        {'ویرایش'}
                    </Button>
                    <Button variant={"contained"} color={"error"}>
                        {'حذف'}
                    </Button>
                </Box>
            </Box>
        </Box>
    )
}


export default UserShowBox;
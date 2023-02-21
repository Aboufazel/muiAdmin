import {Box, flexbox} from "@mui/system";
import {Button, Icon, Typography} from "@mui/material";
import {Link} from "react-router-dom";
import React from "react";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import Theme from "../Theme/Theme";

const MainCard = ({id, name, icon, price, link}) => {
    const style = {
        bgcolor: Theme.palette.secondary.main,
        display: 'flex',
        flexDirection: 'column',
        alignItems:'center',
        height: 200,
        boxShadow: '0 0 8px rgba(0,0,0,0.15)',
        width: 200,
        padding: 3,
        borderRadius: 5,
        marginX: 2
    };


    return (
        <Box key={id} sx={style}>
            <Box bgcolor={Theme.palette.primary.contrastText}
                 sx={{display:'flex' , alignItems:'center' , justifyContent:'center' , padding:0.8 , borderRadius:50}}
                 >
                {icon}
            </Box>
            <Typography fontWeight={"bold"} mt={2} fontSize={18} variant={"h4"}>
                {name}
            </Typography>
            <Typography sx={{color: '#ed6c02'}} marginY={2}>
                {price}
            </Typography>
            <Link to={link}>
                <Button fullWidth  variant={"contained"}>
                    {"مشاهده"}
                </Button>
            </Link>
        </Box>
    )
}

export default MainCard;
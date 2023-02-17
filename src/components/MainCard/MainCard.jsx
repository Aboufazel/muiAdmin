import {Box} from "@mui/system";
import {Button, Icon, Typography} from "@mui/material";
import {Link} from "react-router-dom";
import React from "react";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";

const MainCard = ({id, name, icon, price, link}) => {
    const style = {
        bgcolor: '#D0E1E9',
        display: 'flex',
        flexDirection: 'column',
        height: 200,
        boxShadow: '0 0 8px rgba(0,0,0,0.15)',
        width: 200,
        padding: 3,
        borderRadius: 5,
        marginX: 2
    };


    return (
        <Box key={id} sx={style}>
            <AccountBalanceWalletIcon fontSize={'large'}/>
            <Typography fontWeight={"bold"} mt={2} fontSize={18} variant={"h4"}>
                {name}
            </Typography>
            <Typography sx={{color: '#ed6c02'}} marginY={3}>
                {price}
            </Typography>
            <Link to={link}>
                <Button fullWidth color={"warning"} variant={"contained"}>
                    {"مشاهده"}
                </Button>
            </Link>
        </Box>
    )
}

export default MainCard;
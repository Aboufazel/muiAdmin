import PeopleIcon from "@mui/icons-material/People";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import WalletIcon from "@mui/icons-material/Wallet";
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import React from "react";


export const CardData = [
    {id:1 , title:"کاربران" , icon:<PeopleIcon fontSize={'large'}/>},
    {id:2 , title:"حساب کل" , icon:<AccountTreeIcon fontSize={'large'}/>},
    {id:3 , title:"حساب معین" , icon:<WalletIcon fontSize={'large'}/>},
    {id:4 , title:"گروه حساب" , icon:<AccountBalanceWalletIcon fontSize={'large'}/>},
    {id:5 , title:"فروش محصول" , icon:<AttachMoneyIcon fontSize={'large'}/>},
]
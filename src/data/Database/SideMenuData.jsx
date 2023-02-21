import PeopleIcon from '@mui/icons-material/People';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';

export const SideMenuData = [
    {id:1 , name:'کاربران' , icon: <PeopleIcon/> , link:'/users'},
]


export const SideMenuCollapse = [
    {id:1 , name:'گروه', icon: <AccountBalanceWalletIcon/> , link:'/accountingGroup'},
    {id:2 , name:'نوع', icon: <MenuBookIcon/> , link:'/accountType'},
]
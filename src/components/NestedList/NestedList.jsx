import * as React from "react";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import {
    BrowserRouter as Router,
    Link,
    Link as RouterLink,
} from "react-router-dom";

import PeopleIcon from "@mui/icons-material/People";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import {SideMenuCollapse, SideMenuData} from "../../data/Database/SideMenuData";
import {ExpandLess, ExpandMore} from "@mui/icons-material";
import Theme from "../Theme/Theme";

export default function NestedList() {
    const [open, setOpen] = React.useState(true);

    const handleClick = () => {
        setOpen(!open);
    };

    return (
        <List
            sx={{display: "flex", flexDirection: "column", alignItems: "center"}}
        >

            {
                SideMenuData.map(item => (
                    <Link key={item.id} component={RouterLink} to={item.link}>
                        <ListItemButton>
                            <ListItemIcon sx={{color: "white", minWidth: 35}}>
                                {item.icon}
                            </ListItemIcon>
                            <ListItemText primary={item.name}/>
                        </ListItemButton>
                    </Link>
                ))
            }

            <ListItemButton onClick={handleClick}>
                <ListItemIcon sx={{color: Theme.palette.primary.contrastText, minWidth: 35}}>
                    <AccountBalanceIcon/>
                </ListItemIcon>
                <ListItemText primary="حساب"/>
                {/*{open ? <ExpandLess /> : <ExpandMore />} */}
            </ListItemButton>
            <Collapse in={!open} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    {
                        SideMenuCollapse.map(item => (
                            <Link key={item.id} component={RouterLink} to={item.link}>
                                <ListItemButton sx={{pl: 4}}>
                                    <ListItemIcon sx={{color: "white", minWidth: 35}}>
                                        {item.icon}
                                    </ListItemIcon>
                                    <ListItemText primary={item.name}/>
                                </ListItemButton>
                            </Link>
                        ))
                    }
                </List>
            </Collapse>
        </List>
    );
}

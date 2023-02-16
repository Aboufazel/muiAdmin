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

export default function NestedList() {
  const [open, setOpen] = React.useState(true);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <List
      sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <Router>
        <Link component={RouterLink} to={"/users"}>
          <ListItemButton>
            <ListItemIcon sx={{ color: "white", minWidth: 35 }}>
              <PeopleIcon />
            </ListItemIcon>
            <ListItemText primary="کاربران" />
          </ListItemButton>
        </Link>
      </Router>
      <ListItemButton onClick={handleClick}>
        <ListItemIcon sx={{ color: "white", minWidth: 35 }}>
          <AccountBalanceIcon />
        </ListItemIcon>
        <ListItemText primary="حساب" />
        {/* {open ? <ExpandLess /> : <ExpandMore />} */}
      </ListItemButton>
      <Collapse in={!open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemButton sx={{ pl: 4 }}>
            <ListItemIcon sx={{ color: "white", minWidth: 35 }}>
              <AccountBalanceWalletIcon />
            </ListItemIcon>
            <ListItemText primary="گروه" />
          </ListItemButton>
          <ListItemButton sx={{ pl: 4 }}>
            <ListItemIcon sx={{ color: "white", minWidth: 35 }}>
              <MenuBookIcon />
            </ListItemIcon>
            <ListItemText primary="نوع" />
          </ListItemButton>
        </List>
      </Collapse>
    </List>
  );
}

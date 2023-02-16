import React from "react";
import { Box } from "@mui/system";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import PersonIcon from '@mui/icons-material/Person';

const UserProfile = () => {
  const [open, setOpen] = React.useState(true);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <Box sx={{ position: "absolute", top: 25, left: 25 }}>
      <Box
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
        sx={{
          cursor: "pointer",
          width: 45,
          height: 45,
          boxShadow:'0 0 10px rgba(0 , 0, 0 ,0.45)',
          borderRadius: 50,
          background: "black",
        }}
        onClick={handleClick}
      >
        <PersonIcon fontSize={"large"}  sx={{ color: "white" }} />
      </Box>
      <Collapse in={!open}  timeout="auto" unmountOnExit>
        <List p={5} sx={{display:"flex" , position:'absolute', color:'white', borderRadius:5, left:0 ,mt:0.5 ,bgcolor:'black',flexDirection:"column"}} component="div" disablePadding>
          <ListItemButton>
            <ListItemIcon sx={{ color: "white", minWidth: 35 }}>
              <ExitToAppIcon />
            </ListItemIcon>
            <ListItemText primary="خروج" />
          </ListItemButton>
        </List>
      </Collapse>
    </Box>
  );
};

export default UserProfile;

import { Grid ,Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import DashboardIcon from "@mui/icons-material/Dashboard";
import NestedList from "../NestedList/NestedList";
import {Link} from "react-router-dom";

const SideMenu = (props) => {
  return (
    <Grid container sx={{position:"relative"}}>
      <Grid
        display={"flex"}
        flexDirection={"column"}
        alignItems={"center"}
        sx={{
          background: "black",
          color: "white",
          margin: 2,
          padding: 2,
          borderRadius: 5,
          height: "95vh",
        }}
        xs={12}
      >
        <Box
          display={"flex"}
          alignItems={"center"}
          padding={0.5}
          justifyContent={"center"}
          sx={{ bgcolor: "white", width: 90, borderRadius: 2 , color:"black"}}
          marginBottom={3}
        >
          <DashboardIcon />
           <Link to={'/'}>
               <Typography sx={{color:'black' ,fontSize:14}} variant="h6" component="h6">
                   {"داشبورد"}
               </Typography>
           </Link>
        </Box>
        <NestedList />
        <Typography sx={{fontSize:8 , fontWeight:200 , position:"absolute" , bottom:25}} variant="p">
          {"version 0.1.1"}
        </Typography>
      </Grid>
    </Grid>
  );
};

export default SideMenu;

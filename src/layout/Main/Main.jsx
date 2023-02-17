import React from 'react'
import {Grid} from "@mui/material";
import MainCard from "../../components/MainCard/MainCard";
import {CardData} from "../../data/Database/CardData";

const Main = () => {
  return (
    <Grid container  margin={2} item>
      <Grid  display={"flex"} xs={12} >
          {
              CardData.map(item => (
                  <MainCard icon={item.icon} name={item.title} />
              ))
          }
      </Grid>
    </Grid>
  )
}

export default Main
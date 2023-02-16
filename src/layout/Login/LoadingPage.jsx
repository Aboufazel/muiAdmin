import React from 'react'
import {Grid, Typography} from "@mui/material";
import Loader from "../../Loader/Loader";

const LoadingPage = () => {
  return (
    <Grid container>
      <Grid item xs={12}>
        <Loader/>
        <Typography variant={'h1'}>
          {"در حال دریافت اطلاعات هستیم"}
        </Typography>
      </Grid>
    </Grid>
  )
}

export default LoadingPage
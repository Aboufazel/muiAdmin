import React from 'react'
import {Grid, Typography} from "@mui/material";
import Loader from "../../Loader/Loader";

const LoadingPage = () => {
    return (
        <Grid container>
            <Grid item
                  display={"flex"}
                  flexDirection={"column"}
                  alignItems={"center"}
                  justifyContent={"center"}
                  xs={12}
                  sx={{height: "95vh"}}>
                <Loader/>
                <Typography mt={3} variant={'h4'}>
                    {"در حال دریافت اطلاعات هستیم"}
                </Typography>
            </Grid>
        </Grid>
    )
}

export default LoadingPage
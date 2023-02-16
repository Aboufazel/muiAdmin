import React from "react";
import {Button,Grid, TextField, Typography} from "@mui/material";
import permission from '../../assets/images/permission.png'
import {Box} from "@mui/system";

const Login = () => {
    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log({
            email: data.get('email'),
            password: data.get('password'),
        });
    };
    return (<Grid container>
            <Grid
                item
                display={"flex"}
                alignItems={"center"}
                justifyContent={"center"}
                xs={12}
                sx={{height: "95vh"}}
            >
                <Grid
                    xs={5}
                    boxShadow={'0 0 15px rgba(0,0,0,0.15)'}
                    display={"flex"}
                    borderRadius={5}
                    flexDirection={"column"}
                    paddingY={4}
                    justifyContent={"center"}
                    alignItems={"center"}
                    sx={{bgcolor: "white"}}
                >
                    <Box display={"flex"}
                         flexDirection={"column"}
                         alignItems={"center"}
                         justifyContent={"center"}
                         paddingBottom={1}
                         sx={{borderBottom: '1px dashed black'}}>
                        <img width={90} src={permission} alt={"ورود به داشبورد"}/>
                        <Typography fontWeight={"bold"} variant={"h5"}>
                            {'ورود به پنل مدیریت'}
                        </Typography>
                    </Box>
                    <Box
                         component="form"
                         onSubmit={handleSubmit}
                         noValidate sx={{ mt: 1 }}>
                        <TextField
                            hiddenLabel
                            variant="filled"
                            size="medium"
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="نام کاربری"
                            color={"warning"}
                            name="email"
                            autoComplete="email"
                            autoFocus
                        />
                        <TextField
                            hiddenLabel
                            variant="filled"
                            size="medium"
                            margin="normal"
                            required
                            fullWidth
                            color={"warning"}
                            name="password"
                            label="کلمه عبور"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                        />
                        <Button
                            type="submit"
                            color={"warning"}
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 , paddingY:1.5 }}
                        >
                            ورود
                        </Button>
                    </Box>
                </Grid>
            </Grid>
        </Grid>);
};

export default Login;

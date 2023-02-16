import React, {useState} from "react";
import {Button,Grid, TextField, Typography} from "@mui/material";
import permission from '../../assets/images/permission.png'
import {Box} from "@mui/system";
import {LoginApi} from "../../api/Services";
import {useNavigate} from "react-router-dom";
import useStorage from "../../hooks/storage";

const Login = () => {
    const [showAlert, setShowAlert] = useState(false);
    const [message, setMessage] = useState(false);
    const navigate = useNavigate();
    const [authInfo, setAuthInfo] = useStorage("auth", {
        userId: "",
        accessToken: "",
        isLogin: false,
    })


    const [state, setState] = useState({
        email: "",
        password: "",
    });

    const manageSubmit = (e) => {
        e.preventDefault();
        LoginApi(state.email, state.password)
            .then(res => {
                if (res.data.isSuccess === true) {
                    setAuthInfo({
                        userId: res.data.data.userId,
                        accessToken: res.data.data.token,
                        isLogin: true,
                    });
                    navigate("/");
                } else {
                    setMessage(res.data.message);
                    setShowAlert(true);
                    setTimeout(() => {
                        setShowAlert(false)
                    }, 1000)
                }
            })

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
                         onSubmit={manageSubmit}
                         noValidate sx={{ mt: 1 }}>
                        <TextField
                            hiddenLabel
                            variant="filled"
                            size="medium"
                            onChange={(e) => setState({...state, email: e.target.value})}
                            margin="normal"
                            required
                            value={state.email}
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
                            onChange={(e) => setState({...state, password: e.target.value})}
                            margin="normal"
                            required
                            fullWidth
                            value={state.password}
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

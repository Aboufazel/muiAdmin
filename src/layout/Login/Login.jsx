import React, {useState} from "react";
import {Button, Grid, TextField, Typography} from "@mui/material";
import permission from '../../assets/images/permission.png'
import {Box} from "@mui/system";
import {LoginApi} from "../../api/Services";
import {useNavigate} from "react-router-dom";
import useStorage from "../../hooks/storage";
import LoadingButton from '@mui/lab/LoadingButton';
import Theme from "../../components/Theme/Theme";
import {Alert} from "@mui/lab";

const Login = () => {
    const [showAlert, setShowAlert] = useState(false);
    const [message, setMessage] = useState(false);
    const [loading, setLoading] = useState(false)
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
        setLoading(true);
        e.preventDefault();
        LoginApi(state.email, state.password)
            .then(res => {
                if (res.data.isSuccess === true) {
                    setTimeout(() => {
                        setLoading(false)
                    }, 2500)
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
                        setShowAlert(false);
                        setLoading(false)
                    }, 1000)
                }
            })
        setTimeout(() => {
            setLoading(false);
        }, 3000)
    };
    return (<Grid container>
        {showAlert === true ?
            <Box position={"absolute"} sx={{transition:0.5}} top={10} right={10}>
                <Alert variant="filled"  severity="error">
                    {message}
                </Alert>
            </Box>
               : <></>}
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
                    noValidate sx={{mt: 1}}>
                    <TextField
                        hiddenLabel
                        variant="outlined"
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
                        sx={{
                            '& label': {
                                transformOrigin: "right !important",
                                left: "inherit !important",
                                right: "1.75rem !important",
                                fontSize: "small",
                                color: "#807D7B",
                                overflow: "unset",
                            }
                        }}
                    />
                    <TextField
                        hiddenLabel
                        variant="outlined"
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
                        sx={{
                            '& label': {
                                transformOrigin: "right !important",
                                left: "inherit !important",
                                right: "1.75rem !important",
                                fontSize: "small",
                                color: "#807D7B",
                                overflow: "unset",
                            }
                        }}
                    />
                    {
                        loading === false ? <Button
                                type="submit"
                                color={"warning"}
                                fullWidth
                                variant="contained"
                                sx={{mt: 3, mb: 2, paddingY: 1.5}}
                            >
                                ورود
                            </Button> :
                            <LoadingButton sx={{mt: 3, mb: 2, paddingY: 1.5}}
                                           fullWidth loading variant="outlined">
                                Fetch data
                            </LoadingButton>
                    }


                </Box>
            </Grid>
        </Grid>
    </Grid>);
};

export default Login;


import React, {useCallback, useContext, useEffect, useState} from "react";
import {deleteUser, GetAllFromUser, GetById} from "../../api/Services";
import {useNavigate} from "react-router-dom";
import {Grid, Tooltip, Typography} from "@mui/material";
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import SpinnerLoader from "../../Loader/SpinerLoader";
import UserShowBox from "../../components/UserShowBox/UserShowBox";



const AllUser = () => {
    const [id, setId] = useState({});
    const [token, setToken] = useState({});
    const [data, setData] = useState(undefined)


    const [call, setCall] = useState(false)
    const [error, setError] = useState(false)
    const [loading, setLoading] = useState(true)

    const navigate = useNavigate();

    const manageGetdata = useCallback(() => {
        const data =  localStorage.getItem("auth");
        const final = JSON.parse(data);
        setId(final.userId)
        setToken(final.accessToken)
    }, [id])

    const manageUserTable = useCallback(async () => {
        const apiData = await GetAllFromUser(id, token).catch(() => setError(true));
        if (apiData.data.isSuccess === false) {
            setLoading(true)
            setCall(true)
        } else {
            setData(apiData.data.users)
            console.log(data);
            setCall(false);
            setLoading(false)
        }
    }, [call])






    useEffect(() => {
        manageGetdata();
    }, [id])

    useEffect(() => {
        manageUserTable()
    }, [call])

    const style = {
        bgcolor: '#D0E1E9',
        display: 'flex',
        flexDirection: 'column',
        height:420,
        overflowY:'scroll',
        boxShadow: '0 0 8px rgba(0,0,0,0.15)',
        width: 1130,
        padding: 3,
        borderRadius: 5,
        marginX: 2,
        marginY:4,
    };


    return (
        <Grid container margin={2} item>
            <Grid display={"flex"} xs={12}>
                <Grid sx={style} >
                    <Typography marginBottom={2} fontSize={18} fontWeight={"bold"} variant={'h5'}>
                        {"کاربران سامانه"}
                    </Typography>
                    <Grid>
                        {
                            loading === true ?
                                <Box width={'100%'}
                                     justifyContent={"center"}
                                     display={'flex'}>
                                    <SpinnerLoader/>
                                </Box>
                                : data.map(item => (
                                    <Grid key={item.userId}>
                                        <UserShowBox username={item.userName} active={item.status} user={item.kind}  email={item.email} mobile={item.mobile}/>
                                    </Grid>
                                ))
                        }
                    </Grid>
                </Grid>
               <Tooltip leaveDelay={50} title={"افزودن کاربر"} arrow>
                   <Box sx={{ '& > :not(style)': { m: 1 } , position:'absolute' , m:2 , bottom:0 , left:0 }}>
                       <Fab color="error" aria-label="add">
                           <AddIcon fontSize={"large"} />
                       </Fab>
                   </Box>
               </Tooltip>
            </Grid>
        </Grid>
    )
}


export default AllUser;


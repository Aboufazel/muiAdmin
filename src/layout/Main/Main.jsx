import React, {useCallback, useEffect, useState} from 'react'
import {Grid, Typography} from "@mui/material";
import MainCard from "../../components/MainCard/MainCard";
import {CardData} from "../../data/Database/CardData";
import {useNavigate} from "react-router-dom";
import UserShowBox from "../../components/UserShowBox/UserShowBox";
import {GetAllFromUser} from "../../api/Services";
import SpinnerLoader from "../../Loader/SpinerLoader";
import {Box} from "@mui/system";

const Main = () => {

    const [data, setData] = useState(undefined)


    const [call, setCall] = useState(false)
    const [error, setError] = useState(false)
    const [loading, setLoading] = useState(true)





    const manageUserTable = useCallback(async () => {
        const apiData = await GetAllFromUser().catch(() => setError(true));
        if (apiData.data.isSuccess === false) {
            localStorage.clear();
            navigate('/login')
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
        manageUserTable()
    }, [call])



    const storageData = JSON.parse(localStorage.getItem('auth'));
    const navigate = useNavigate();
    console.log(storageData);

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
        storageData.userId === "" ? () => {
                localStorage.clear();
                navigate('/login')
            }
            :
            <Grid container margin={2} item>
                <Grid display={"flex"} xs={12}>
                    {
                        CardData.map(item => (
                            <MainCard icon={item.icon} name={item.title}/>
                        ))
                    }
                </Grid>
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
            </Grid>
    )
}

export default Main
import './layout.style.css'
import {Outlet} from "react-router-dom";
import {Grid} from '@mui/material'
import SideMenu from "../components/SideMenu/SideMenu";
import {useEffect, useState} from "react";
import LoadingPage from "./Login/LoadingPage";
import UserProfile from '../components/UserProFile/UserProfile';

const IndexLayout = () => {
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        setTimeout(() => {
            setLoading(false)
        }, 500)
    }, [])

    return (
        loading === true ? <LoadingPage/> : <Grid container>
            <Grid  item xs={1}>
                <SideMenu/>
                <UserProfile/>
            </Grid>
            <Grid marginX={2} item xs={10}>
                <Outlet/>
            </Grid>
        </Grid>
    )
}

export default IndexLayout;
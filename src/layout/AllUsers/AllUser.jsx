
import {GiveIdContext} from "../../Context/GiveId"

import React, {useCallback, useContext, useEffect, useState} from "react";
import {deleteUser, GetAllFromUser, GetById} from "../../api/Services";
import {useNavigate} from "react-router-dom";
import {Grid} from "@mui/material";
import {CardData} from "../../data/Database/CardData";
import MainCard from "../../components/MainCard/MainCard";



const AllUser = () => {
    const [id, setId] = useState({});
    const {state , dispatch} = useContext(GiveIdContext)
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


    const manageEditUser = async (userid) => {
        setLoading(true)
        const user = await GetById(userid);
        if (user.data.rows === 0) {
            alert("پاسخی از سمت سرور دریافت نشد")
            setLoading(false)
        } else if (user.data.rows !== 0) {
            dispatch({type: 'UserData' , payload:user})
            setLoading(false)
            navigate("/editUser")
        }
    }


    const manageDelete = async (userid) => {
        const item = await deleteUser(userid , token);
        if(item === undefined){
            alert("حذف با مشکل مواجه شد")
        }else {
            alert("عملیات با موفقیت انجام شد")
        }
    }


    useEffect(() => {
        manageGetdata();
    }, [id])

    useEffect(() => {
        manageUserTable()
    }, [call])


    return (
        <Grid container margin={2} item>
            <Grid display={"flex"} xs={12}>
               allUser
            </Grid>
        </Grid>
    )
}


export default AllUser;


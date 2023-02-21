import {
    AddAccountGroup,
    DeleteAccountGroup,
    EditAccountGroup,
    EditIsActive,
    GetAllAccountGroup, GetById
} from "../../api/AccountGroup";
import React, {useContext, useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {GiveIdContext} from "../../Context/GiveId";
import {Button, Grid, Modal, TextField, Tooltip, Typography} from "@mui/material";
import Box from "@mui/material/Box";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import Wallet from "../../assets/images/wallet.png";
import ListItemIcon from "@mui/material/ListItemIcon";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import SaveIcon from '@mui/icons-material/Save';
import {style} from '../../components/ModalStyle/ModakStyle'
import SpinnerLoader from "../../Loader/SpinerLoader";
import AccountShowCard from "../../components/AccountShowCard/AccountShowCard";
import {Alert} from "@mui/lab";


const AccountingGroup = () => {
    const [showAlert, setShowAlert] = useState(false);
    const {state, dispatch} = useContext(GiveIdContext)
    const [account, setAccount] = useState(undefined);
    const [error, setError] = useState(false);
    const [value, setValue] = useState({code: "", name: ""});
    const [edit, setEdit] = useState({id: "", code: "", name: "", active: ""});
    const [show, setShow] = useState(false);
    const [editShow, setEditShow] = useState(false);
    const [errorShow, setErrorShow] = useState(false);
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const [reload, setReload] = useState(false);
    const [waiting, setWaiting] = useState(false);
    const [deleteModal, setDeleteModal] = useState(undefined);
    const [deleteModalShow, setDeleteModalShow] = useState(false);

    const navigate = useNavigate();


    const handleClose = () => {
        setShow(false);
        emptyInput()
    };

    const handleDeleteClose = () => {
        setDeleteModalShow(false);
    }

    const handleEditClose = () => {
        setEditShow(false);
        emptyInput()
    };
    const handleShow = () => setShow(true);

    const manageChange = (e) => {
        setValue({...value, [e.target.name]: e.target.value});
    }

    const manageEditChange = (e) => {
        setEdit({...edit, [e.target.name]: e.target.value});
    }

    const AccountGroupGetTabel = async () => {
        const data = await GetAllAccountGroup().catch(() => setError(true));
        console.log(data.data.accountGroups)
        if (data.data.isSuccess === false) {
            localStorage.clear();
            alert("نیاز به ورود مجدد دارید");
            navigate('/login')
        }
        setAccount(data.data.accountGroups)
    };

    useEffect(() => {
        AccountGroupGetTabel();
    }, [reload]);


    const manageAddAccount = async () => {
        console.log(value.code)
        setWaiting(true)
        const addResponse = await AddAccountGroup(value.code, value.name);
        if (addResponse.data.isSuccess === true) {
            setMessage(addResponse.data.message);
            setShow(false);
            setWaiting(false);
            setShowAlert(true);
            setReload(!reload);
            emptyInput();
            setTimeout(() => {
                setShowAlert(false);
            }, 2500)
        } else {
            setMessage(addResponse.data.message);
            setShow(false);
            setWaiting(false);
            setErrorShow(true);
            setTimeout(() => {
                setErrorShow(false)
            }, 2500)
        }

    }


    const manageAccountMain = (id) => {
        dispatch({type: 'UserData', payload: id});
        navigate("/accountingMain");
    }


    const manageEditAccount = async (id) => {
        setEditShow(true);
        setLoading(true)
        const getResponse = await GetById(id);
        getResponse.data.accountGroups.map(item => setEdit({
            id: item.accountGroupId,
            code: item.accountGroupCode, name: item.accountGroupName, active: item.isActive
        }))
        if (getResponse.status === 200) {
            setLoading(false)
        } else {
            setEditShow(false)
        }
    }

    const manageSendEditAccount = async () => {
        setWaiting(true)
        const sendEditResponse = await EditAccountGroup(edit.id, edit.code, edit.name, edit.active);
        if (sendEditResponse.data.isSuccess === true) {
            setLoading(!setReload(!reload));
            setWaiting(false)
            // setSuccessShow(true);
            setEditShow(false);
            setMessage(sendEditResponse.data.message);
            setTimeout(() => {
                // setSuccessShow(false);
            }, 2500)
        } else {
            setMessage(sendEditResponse.data.message);
            setErrorShow(true);
            setTimeout(() => {
                setErrorShow(false);
            }, 2500)
        }
    }


    const manageRemoveAccount = async (id) => {
        setWaiting(true);
        setDeleteModalShow(false);
        const removeResponse = await DeleteAccountGroup(id);
        if (removeResponse.data.isSuccess === false) {
            setMessage(removeResponse.data.message);
            setErrorShow(true);
            setWaiting(false);
            setTimeout(() => {
                setErrorShow(false);
                setMessage("");
            }, 1000)
        } else if (removeResponse.data.isSuccess === true) {
            setMessage(removeResponse.data.message);
            setWaiting(false);
            // setSuccessShow(true);
            setReload(!reload);
            setTimeout(() => {
                // setSuccessShow(false);
                setMessage("");
            }, 1000)
        }
    }


    const manageActive = async (id, active) => {
        setWaiting(true);
        const activeResponse = await EditIsActive(id, active)
            .catch(() => {
                setMessage(activeResponse.data.message);
                setErrorShow(true);
                setTimeout(() => {
                    setErrorShow(false)
                }, 2500)
            });
        setWaiting(false);
        setReload(!reload);
    }

    const emptyInput = () => {
        setValue({code: "", name: ""});
    };

    const manageDeleteModal = (id) => {
        setDeleteModalShow(true);
        setDeleteModal(id);
    }


    const UserStyle = {
        bgcolor: '#D0E1E9',
        display: 'flex',
        flexDirection: 'column',
        height: 420,
        overflowY: 'scroll',
        boxShadow: '0 0 8px rgba(0,0,0,0.15)',
        width: 1130,
        padding: 3,
        borderRadius: 5,
        marginX: 2,
        marginY: 4,
    };


    return (
        <Grid container margin={2} item>
            {showAlert === true ?
                <Box position={"absolute"} sx={{transition:0.5}} bottom={100} left={45}>
                    <Alert variant="filled"  severity="success">
                        {message}
                    </Alert>
                </Box>
                : <></>}
            <Grid display={"flex"} xs={12}>
                <Box>
                    <Modal
                        open={show}
                        onClose={handleClose}
                    >
                        <Box sx={style}>
                            <img width={60} src={Wallet} alt={"خروج"}/>
                            <Typography fontWeight={"bold"} id="modal-modal-description" sx={{mt: 2}}>
                                {"افزودن گروه حساب"}
                            </Typography>
                            <Box marginY={3}>
                                <TextField
                                    name={"code"}
                                    onChange={manageChange}
                                    value={value.code}
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
                                    id="filled-basic"
                                    color={"warning"}
                                    label="کد گروه:" variant="outlined"/>
                            </Box>
                            <Box>
                                <TextField
                                    name={"name"}
                                    onChange={manageChange}
                                    value={value.name}
                                    marginY={3}
                                    sx={{
                                        '& label': {
                                            transformOrigin: "right !important",
                                            left: "inherit !important",
                                            right: "1.75rem !important",
                                            fontSize: "small",
                                            color: "#807D7B",
                                            fontWeight: 400,
                                            overflow: "unset",
                                        }
                                    }}
                                    id="filled-basic"
                                    color={"warning"}
                                    label="نام گروه:" variant="outlined"/>
                            </Box>
                            <Box mt={4} display={"flex"} gap={1}>
                                <Button onClick={handleClose} variant={"contained"} color={'error'}>
                                    <ListItemIcon sx={{color: "white", minWidth: 30}}>
                                        <HighlightOffIcon/>
                                    </ListItemIcon>
                                    {"انصراف"}
                                </Button>
                                <Button onClick={() => manageAddAccount()} variant={"contained"} color={'success'}>
                                    <ListItemIcon sx={{color: "white", minWidth: 30}}>
                                        <SaveIcon/>
                                    </ListItemIcon>
                                    {"ذخیره"}
                                </Button>
                            </Box>
                        </Box>
                    </Modal>
                </Box>
                <Grid sx={UserStyle}>
                    <Typography marginBottom={2} fontSize={18} fontWeight={"bold"} variant={'h5'}>
                        {"گروه حساب"}
                    </Typography>
                    <Grid>
                        {
                            loading === true ?
                                <Box width={'100%'}
                                     justifyContent={"center"}
                                     display={'flex'}>
                                    <SpinnerLoader/>
                                </Box>
                                : account === undefined ? <Box width={'100%'}
                                                               justifyContent={"center"}
                                                               display={'flex'}>
                                    <SpinnerLoader/>
                                </Box> : account.map(item => (
                                    <Grid key={item.accountGroupId}>
                                        <AccountShowCard code={item.accountGroupCode}
                                                         GroupName={item.accountGroupName}
                                                         isActive={item.isActive}
                                        />
                                    </Grid>
                                ))
                        }
                    </Grid>
                </Grid>
                <Tooltip leaveDelay={50} title={"افزودن گروه حساب"} arrow>
                    <Box onClick={handleShow}
                         sx={{'& > :not(style)': {m: 1}, position: 'absolute', m: 2, bottom: 0, left: 0}}>
                        <Fab color="error" aria-label="add">
                            <AddIcon fontSize={"large"}/>
                        </Fab>
                    </Box>
                </Tooltip>
            </Grid>
        </Grid>
    )
}

export default AccountingGroup;
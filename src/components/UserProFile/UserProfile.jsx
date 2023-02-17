import React from "react";
import {Box} from "@mui/system";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import PersonIcon from '@mui/icons-material/Person';
import {Button, Modal, Typography} from "@mui/material";
import {useNavigate} from "react-router-dom";
import useStorage from "../../hooks/storage";
import Exit from '../../assets/images/exit.png'
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

const UserProfile = () => {
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        display:'flex',
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'center',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        borderRadius:2,
        boxShadow: 24,
        p: 4,
    };


    const [open, setOpen] = React.useState(true);
    const [openModal, setOpenModal] = React.useState(false);
    const handleOpenModal = () => setOpenModal(true);
    const handleCloseModal = () => setOpenModal(false);

    const handleClick = () => {
        setOpen(!open);
    };
    const navigate = useNavigate();
    const [tokenInfo, setTokenInfo] = useStorage("auth", {
        refreshToken: "",
        accessToken: "",
        isLogin: true,
    });


    const manageLogout = () => {
        localStorage.clear();
        setTokenInfo({
            accessToken: "",
            refreshToken: "",
            isLogin: false,
        })
        navigate("/login")
    }


    return (
        <>
            <div>
                <Modal
                    open={openModal}
                    onClose={handleCloseModal}
                >
                    <Box sx={style}>
                        <img  width={60} src={Exit} alt={"خروج"}/>
                        <Typography fontWeight={"bold"} id="modal-modal-description" sx={{mt: 2}}>
                            {"آیا برای خروج از حساب اطمینان دارید؟"}
                        </Typography>
                        <Box mt={4} display={"flex"} gap={1}>
                            <Button onClick={manageLogout} variant={"contained"} color={'error'}>
                                <ListItemIcon sx={{color: "white", minWidth: 30}}>
                                    <ExitToAppIcon/>
                                </ListItemIcon>
                                {"خروج"}
                            </Button>
                            <Button onClick={handleCloseModal} variant={"contained"} color={'success'}>
                                <ListItemIcon sx={{color: "white", minWidth: 30}}>
                                    <HighlightOffIcon/>
                                </ListItemIcon>
                                {"انصراف"}
                            </Button>
                        </Box>
                    </Box>
                </Modal>
            </div>
            <Box sx={{position: "absolute", marginTop:2 , top:0, left: 25}}>
                <Box
                    display={"flex"}
                    justifyContent={"center"}
                    alignItems={"center"}
                    sx={{
                        cursor: "pointer",
                        width: 45,
                        height: 45,
                        boxShadow: '0 0 10px rgba(0 , 0, 0 ,0.45)',
                        borderRadius: 50,
                        background: "black",
                    }}
                    onClick={handleClick}
                >
                    <PersonIcon fontSize={"large"} sx={{color: "white"}}/>
                </Box>
                <Collapse in={!open} timeout="auto" unmountOnExit>
                    <List p={5} sx={{
                        display: "flex",
                        position: 'absolute',
                        color: 'white',
                        borderRadius: 2,
                        left: 0,
                        mt: 0.5,
                        bgcolor: 'black',
                        flexDirection: "column"
                    }} component="div" disablePadding>
                        <ListItemButton onClick={handleOpenModal}>
                            <ListItemIcon sx={{color: "white", minWidth: 35}}>
                                <ExitToAppIcon/>
                            </ListItemIcon>
                            <ListItemText primary="خروج"/>
                        </ListItemButton>
                    </List>
                </Collapse>
            </Box>
        </>
    );
};

export default UserProfile;

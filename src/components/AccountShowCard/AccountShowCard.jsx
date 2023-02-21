
import {Avatar, Button, FormControlLabel, FormGroup, Grid, IconButton, Switch, Typography} from "@mui/material";
import Theme from "../Theme/Theme";
import DeleteIcon from '@mui/icons-material/Delete';
import ModeIcon from '@mui/icons-material/Mode';
import {Link} from "react-router-dom";



const AccountShowCard = ({code, GroupName, isActive}) => {
    return (
        <Grid>
            <Grid mb={2} paddingX={2}
                 display={"flex"}
                 gap={6}
                  width={"max-content"}
                 alignItems={"center"}
                 justifyContent={'space-between'}
                 bgcolor={"white"}
                 sx={{height: 75, width: '100%', borderRadius: 3}}>
                <Grid>
                    <Avatar sx={{fontSize: 12, bgcolor: Theme.palette.error.main}}>
                        {"group"}
                    </Avatar>
                </Grid>
                <Grid>
                    <Typography fontSize={16} fontWeight={"bold"} variant={'h6'}>
                        {code}
                    </Typography>
                </Grid>
                <Grid>
                    <Typography fontSize={16} fontWeight={"bold"} variant={'h6'}>
                        {GroupName}
                    </Typography>
                </Grid>
                <Grid>
                    {
                        isActive === true ? <Button

                                variant={"contained"} color={"success"}>
                                {"فعال"}
                            </Button>
                            :
                            <Button variant={"contained"} color={"primary"}>
                                {"غیرفعال"}
                            </Button>
                    }
                </Grid>
                 <Grid>
                     <Link to={"/accountingMain"}>
                         <Button xs={3} variant={"contained"} color={"error"}>
                             {"حساب کل"}
                         </Button>
                     </Link>
                 </Grid>
                <Grid display={"flex"} gap={2}>
                    <IconButton aria-label="delete" size="large">
                        <ModeIcon color={"warning"} fontSize="inherit"/>
                    </IconButton>
                    <IconButton aria-label="delete" size="large">
                        <DeleteIcon color={"error"} fontSize="inherit"/>
                    </IconButton>
                </Grid>
            </Grid>
        </Grid>
    )
}


export default AccountShowCard;
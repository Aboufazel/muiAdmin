import {createTheme} from "@mui/material";


const Theme = createTheme({
    palette: {
        background: {
            default: "#DFECF1"
        },
        primary:{
            main: '#000000',
            contrastText: '#fff',
        },
        secondary:{
            main:'#D0E1E9',
        },

        success:{
            main:'#2e7d32'
        },
        error:{
            main:'#d32f2f',
        },
        warning:{
            main:'#ed6c02'
        },
    },
    
    typography:{
        fontFamily:"iran-sans"
    },
})


export default Theme;
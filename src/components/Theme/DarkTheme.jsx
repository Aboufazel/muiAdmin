import {createTheme} from "@mui/material";


const DarkTheme = createTheme({
    palette: {
        mode: 'dark',
        background: {
            default: "#DFECF1"
        },
        primary:{
            main: '#000000',
            contrastText: '#fff',
        },
        secondary:{
            main:'#DFECF1',
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
    }
})


export default DarkTheme;
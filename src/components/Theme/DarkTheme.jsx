import {createTheme} from "@mui/material";


const DarkTheme = createTheme({
    palette: {
        mode: 'dark',
        background:{
          default:  '#424242'
        },
        primary:{
            main: '#01579b',
            contrastText: '#fff',
        },
        secondary:{
            main:'#000',
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
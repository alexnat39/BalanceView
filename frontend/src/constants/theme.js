import {createTheme} from "@mui/material/styles";

export const theme = createTheme({
    palette: {
        primary: {
            main: '#9C27B0',  // Purple
            light: '#af52bf',
            dark: '#6d1b7b',
        },
        secondary: {
            main: '#FFF5C2',  // Amber
            light: '#ffcd38',
            dark: '#c79100',
        },
        error: {
            main: '#e64a19',  // Deep Orange
        },
        warning: {
            main: '#fbc02d',  // Yellow
        },
        info: {
            main: '#0288d1',  // Light Blue
        },
        success: {
            main: '#388e3c',  // Green
        },
    },
});

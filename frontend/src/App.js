import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import AppBar from "@mui/material/AppBar";
import * as React from "react";
import NavContainer from "./components/NavContainer";
import {ThemeProvider} from '@mui/material/styles';
import {theme} from './constants/theme'
import {Routes, Route} from "react-router-dom";
import Login from "./screens/Login";
import SignUp from "./screens/SignUp";
import {UserProvider} from "./components/UserContext";


function App() {
    return (
        <UserProvider>
            <ThemeProvider theme={theme}>
                <AppBar
                    position="fixed"
                    sx={{zIndex: (theme) => theme.zIndex.drawer + 1, height: "64px"}}
                >
                    <Toolbar>
                        <Typography variant="h6" noWrap component="div">
                            BalanceView
                        </Typography>
                    </Toolbar>
                </AppBar>
                <Routes>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/signup" element={<SignUp/>}/>
                    <Route path="/" element={<NavContainer/>}/>
                </Routes>
            </ThemeProvider>
        </UserProvider>
    );
}


export default App;

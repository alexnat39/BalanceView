import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import {BarChart, AddBox, ExitToApp, Settings as SettingsIcon, Money, CompareArrows} from "@mui/icons-material/";
import {handleLogOut} from "../apiCalls";
import {useNavigate} from 'react-router-dom';
import {useEffect, useState} from "react";
import {useUser} from "./UserContext";
import Dashboard from "../screens/Dashboard";
import Settings from "../screens/Settings";
import Transactions from "../screens/Transactions";
import {theme} from "../constants/theme"

const drawerWidth = 240;


const NavContainer = () => {
    const navigate = useNavigate();
    const {currentUser, isLoading} = useUser();

    //if user is not logged in, then we redirect them to login screen
    useEffect(() => {
        console.log("currentUser", currentUser)
        if (!isLoading && (!currentUser || currentUser.uid === null)) {
            navigate("/login")
        }
    }, [currentUser, isLoading, navigate]);

    const logout = async () => {
        try {
            await handleLogOut();
            navigate("/login");
        } catch (error) {

        }
    }

    let menuIcons = {
        'Dashboard': <BarChart/>, 'Settings': <SettingsIcon/>, 'Transactions': <CompareArrows/>
    }
    const [currentPage, setCurrentPage] = useState('Transactions');

    return <Box sx={{display: 'flex',}}>
        <Drawer
            sx={{
                width: drawerWidth, flexShrink: 0, '& .MuiDrawer-paper': {
                    width: drawerWidth, boxSizing: 'border-box',
                },
            }}
            variant="permanent"
            anchor="left"

        >
            <Toolbar/>
            <List disablePadding>
                {['Transactions', 'Dashboard', 'Settings', 'Logout'].map((text, index) => {
                    if (text === 'Logout') {
                        return <ListItem key={text} disablePadding>
                            <ListItemButton onClick={logout}>
                                <ListItemIcon>
                                    <ExitToApp/>
                                </ListItemIcon>
                                <ListItemText primary={text}/>
                            </ListItemButton>
                        </ListItem>;
                    } else {
                        return <ListItem key={text} disablePadding>
                            <ListItemButton
                                style={{backgroundColor: (text === currentPage) ? theme.palette.secondary.main: "#FFFFFF"}}
                                onClick={() => {
                                    setCurrentPage(text)
                                }}
                            >
                                <ListItemIcon>
                                    {menuIcons[text]}
                                </ListItemIcon>
                                <ListItemText primary={text}/>
                            </ListItemButton>
                        </ListItem>;
                    }

                })}
            </List>
        </Drawer>
        <Box
            component="main"
            sx={{flexGrow: 1, bgcolor: 'background.default', p: 3}}
        >
            <Toolbar/>
            {currentPage === 'Dashboard' && currentUser && <Dashboard/>}
            {currentPage === 'Settings' && currentUser &&  <Settings/>}
            {currentPage === 'Transactions' && currentUser && <Transactions/>}
        </Box>
    </Box>;
}

export default NavContainer;
import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import {BarChart, AddBox, ExitToApp, Settings as SettingsIcon} from "@mui/icons-material/";
import {handleLogOut} from "../apiCalls";
import {useNavigate} from 'react-router-dom';
import {useEffect, useState} from "react";
import {useUser} from "./UserContext";
import Dashboard from "../screens/Dashboard";
import Settings from "../screens/Settings";

const drawerWidth = 240;


const NavContainer = () => {
    const navigate = useNavigate();
    const {currentUser, isLoading} = useUser();

    //if user is not logged in, then we redirect them to login screen
    useEffect(() => {
        if (!isLoading && currentUser === null) {
            navigate("/login")
        }
    }, [currentUser, navigate]);

    const logout = async () => {
        try {
            await handleLogOut();
            navigate("/login");
        } catch (error) {

        }
    }

    let menuIcons = {
        'Dashboard': <BarChart/>, 'Settings': <SettingsIcon/>
    }
    const [currentPage, setCurrentPage] = useState('Dashboard');

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
            <List>
                {['Dashboard', 'Settings', 'Logout'].map((text, index) => {
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
                            <ListItemButton onClick={() => {
                                setCurrentPage(text)
                            }}>
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
            {currentPage === 'Dashboard' && <Dashboard/>}
            {currentPage === 'Settings' && <Settings/>}
        </Box>
    </Box>;
}

export default NavContainer;
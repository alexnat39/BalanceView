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
import {BarChart, AddBox, ExitToApp} from "@mui/icons-material/";
import {handleLogOut} from "../apiCalls";
import { useNavigate } from 'react-router-dom';
import {useEffect} from "react";

const drawerWidth = 240;


const NavContainer = () => {
    const navigate = useNavigate();

    const logout = async () => {
        try {
            console.log("LOGING OUT");
            await handleLogOut();
            //todo redirect to login page
            console.log("NAVIGATING TO LOGIN");
            navigate("/login");

        } catch (error) {

        }
    }
    return (
        <Box sx={{display: 'flex',}}>
            <Drawer
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                        boxSizing: 'border-box',
                    },
                }}
                variant="permanent"
                anchor="left"

            >
                <Toolbar/>
                <List>
                    {['Dashboard', 'Add New', 'Logout'].map((text, index) => {
                        if (text === 'Logout') {
                            return (
                                <ListItem key={text} disablePadding>
                                    <ListItemButton onClick={logout}>
                                        <ListItemIcon>
                                            <ExitToApp/>
                                        </ListItemIcon>
                                        <ListItemText primary={text}/>
                                    </ListItemButton>
                                </ListItem>
                            );
                        } else {
                            return (<ListItem key={text} disablePadding>
                                <ListItemButton>
                                    <ListItemIcon>
                                        {index % 2 === 0 ? <BarChart/> : <AddBox/>}
                                    </ListItemIcon>
                                    <ListItemText primary={text}/>
                                </ListItemButton>
                            </ListItem>
                            );
                        }

                    })}
                </List>
            </Drawer>
            <Box
                component="main"
                sx={{flexGrow: 1, bgcolor: 'background.default', p: 3}}
            >
                <Toolbar/>
                <Typography paragraph>

                </Typography>
                <Typography paragraph>

                </Typography>
            </Box>
        </Box>
    );
}

export default NavContainer;
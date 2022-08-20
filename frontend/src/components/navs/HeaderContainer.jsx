import React from 'react';
import {styled, useTheme} from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import axios from 'axios';
import { Chip } from "@mui/material";
import {clearUserData} from "../../App";
import Can from "../can/Can";
import {users} from "../../rbac-consts";
import {AuthContext} from "../../App";
import ProfileMenuButton from "../buttons/ProfileMenuButton";
import LoginProfileButton from "../buttons/LoginProfileButton";
import {useContext} from "react";
import Typography from "@mui/material/Typography";


const drawerWidth = 300;


const Main = styled('main', {shouldForwardProp: (prop) => prop !== 'open'})(
    ({theme, open}) => ({
        flexGrow: 1,
        padding: theme.spacing(3),
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: `-${drawerWidth}px`,
        ...(open && {
            transition: theme.transitions.create('margin', {
                easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.enteringScreen,
            }),
            marginLeft: 0,
        }),
    }),
);

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({theme, open}) => ({
    transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: `${drawerWidth}px`,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const DrawerHeader = styled('div')(({theme}) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
}));

export default function HeaderContainer() {
    const userRole = useContext(AuthContext)

    const theme = useTheme();
    const [open, setOpen] = React.useState(false);

    const logout = (event) => {
        event.preventDefault();
        axios.post('/api/logout')
            .then(response => {
                console.log(response.data);
                window.location.replace("/panel");
            }).catch(error => {
            console.error(error);
        })
        clearUserData()
    }

    return (
        <Box sx={{display: 'flex'}}>
            <CssBaseline/>
            <AppBar position="fixed" open={open}>
                <Toolbar>
                    <Typography component="div" sx={{flexGrow: 1}}>
                        <Chip
                            component={"a"}
                            href={"/"}
                            className={"mint-gradient-card"}
                            color={'secondary'}
                            label="Practic22">

                        </Chip>
                    </Typography>
                    <Can
                        role={userRole}
                        perform={users.ADMIN}
                        yes={() => (
                            <Chip
                                component={"a"}
                                href={"/panel"}
                                className={"mint-gradient-card"}
                                color={'secondary'}
                                label="Admin panel">
                            </Chip>
                        )}
                    />
                    <Can
                        role={userRole}
                        perform={users.USER}
                        yes={() => (
                            <ProfileMenuButton/>
                        )}
                        no={() => (
                            <LoginProfileButton/>
                        )}
                    />
                </Toolbar>
            </AppBar>
            <Drawer>
            </Drawer>
            <Main open={open}>
                <DrawerHeader/>
            </Main>
        </Box>
    );
}

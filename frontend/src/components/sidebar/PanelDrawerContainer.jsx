import * as React from 'react';
import {styled, useTheme} from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import LogoutIcon from '@mui/icons-material/Logout';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import GroupIcon from '@mui/icons-material/Group';
import StoreIcon from '@mui/icons-material/Store';
import axios from 'axios';
import {Chip, ListItemButton} from "@mui/material";
import Avatar from '@mui/material/Avatar';
import {clearUserData} from "../../App";
import Typography from "@mui/material/Typography";
import {useNavigate} from "react-router";


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

export default function PersistentDrawerLeft() {
    const navigate = useNavigate();

    const theme = useTheme();
    const [open, setOpen] = React.useState(true);


    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const logout = (event) => {
        event.preventDefault();
        axios.post('/api/logout')
            .then(response => {
                clearUserData();
                window.location.replace('/');
            })
    }

    return (
        <Box sx={{display: 'flex'}}>
            <CssBaseline/>
            <AppBar position="fixed" open={open}>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        sx={{mr: 2, ...(open && {display: 'none'})}}
                    >
                        <MenuIcon/>
                    </IconButton>
                    <Typography component="div" sx={{flexGrow: 1}}>
                        <Chip
                            component={"a"}
                            href={"/panel"}
                            className={"mint-gradient-card"}
                            color={'secondary'}
                            label="Admin panel">
                        </Chip>
                    </Typography>
                    <Chip
                        component={"a"}
                        href={"/"}
                        className={"mint-gradient-card"}
                        color={'secondary'}
                        label="Practic22">
                    </Chip>
                </Toolbar>
            </AppBar>
            <Drawer
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                        boxSizing: 'border-box',
                    },
                }}
                variant="persistent"
                anchor="left"
                open={open}
            >
                <DrawerHeader>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'ltr' ? <ChevronLeftIcon/> : <ChevronRightIcon/>}
                    </IconButton>
                </DrawerHeader>
                {/*PROFILE*/}
                <List className={"drawer-card green-gradient-card"}>
                    <ListItem>
                        <Avatar
                            sx={{width: 64, height: 64, bgcolor: "#ccb8ff"}}
                        >👑</Avatar>
                        <IconButton component={"a"} href={"/profile"} sx={{textAlign: 'center'}}>
                            Admin
                        </IconButton>
                        <IconButton component="a" onClick={(event) => {
                            logout(event)
                        }}>
                            <LogoutIcon fontSize={"small"}/>
                        </IconButton>
                    </ListItem>
                </List>
                {/*USERS*/}
                <List className={"drawer-card blue-gradient-card"}>
                    <ListItem>
                        <ListItemText>
                            <Chip sx={{width: 1}} icon={<GroupIcon/>} label="Users"/>
                        </ListItemText>
                    </ListItem>
                    <ListItemButton component="a" href="/panel/users">
                        <ListItemIcon>
                            <ListItemIcon/>
                        </ListItemIcon>
                        <ListItemText>Users list</ListItemText>
                    </ListItemButton>
                    <ListItemButton component="a" href="/panel/users/create">
                        <ListItemIcon>
                            <ListItemIcon/>
                        </ListItemIcon>
                        <ListItemText>Add new user</ListItemText>
                    </ListItemButton>
                </List>
                {/*COMPANIES*/}
                <List className={"drawer-card orange-gradient-card"}>
                    <ListItem>
                        <ListItemText>
                            <Chip sx={{width: 1}} icon={<StoreIcon/>} label="Companies"/>
                        </ListItemText>
                    </ListItem>
                    <ListItemButton component="a" href="/panel/companies">
                        <ListItemIcon>
                            <ListItemIcon/>
                        </ListItemIcon>
                        <ListItemText>Companies list</ListItemText>
                    </ListItemButton>
                    <ListItemButton component="a" href="/panel/companies/create">
                        <ListItemIcon>
                            <ListItemIcon/>
                        </ListItemIcon>
                        <ListItemText>Add new company</ListItemText>
                    </ListItemButton>
                </List>
                {/*CV*/}
                <List className={"drawer-card purple-gradient-card"}>
                    <ListItem>
                        <ListItemText>
                            <Chip sx={{width: 1}} icon={<InsertDriveFileIcon/>} label="Resumes"/>
                        </ListItemText>
                    </ListItem>
                    <ListItemButton component="a" href="/panel/cv">
                        <ListItemIcon>
                            <ListItemIcon/>
                        </ListItemIcon>
                        <ListItemText>Resumes list</ListItemText>
                    </ListItemButton>
                </List>
            </Drawer>
            <Main open={open}>
                <DrawerHeader/>
            </Main>
        </Box>
    );
}

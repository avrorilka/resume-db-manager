import React from "react";
import axios from "axios";
import {clearUserData} from "../../App";
import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import {useNavigate} from "react-router";
import GetUserInfo from "../../utils/GetUserInfo";
import Avatar from "@mui/material/Avatar";

const ProfileMenuButton = () => {

    const navigate = useNavigate();

    const logout = (event) => {
        event.preventDefault();
        axios.post('/api/logout')
            .then(response => {
                window.location.replace("/");
            })
        clearUserData()
    }

    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleClick = () => {
        window.location.replace('/profile');
    }

    return(
        <div>
            <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
            >
                <Avatar sx={{bgcolor:"white"}} src={'https://avatars.dicebear.com/api/identicon/'+GetUserInfo("email")+'.svg'} />
            </IconButton>
            <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <MenuItem onClick={() => {handleClick()}}>Profile</MenuItem>
                <MenuItem onClick={(event) => {logout(event)}}>Logout</MenuItem>
            </Menu>
        </div>
    )
}

export default ProfileMenuButton
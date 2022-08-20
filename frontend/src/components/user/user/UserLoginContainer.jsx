import React, {useContext, useEffect, useState} from 'react';
import axios from 'axios';
import {Button, Chip, Table, TableBody, TableCell, TableRow, TextField} from "@mui/material";
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import MessageAfterActionContainer from "../../messsage/MessageAfterActionsContainer"
import {useNavigate} from "react-router";
import {Link} from "react-router-dom";
import GetUserInfo from "../../../utils/GetUserInfo";
import {AuthContext} from "../../../App";
import {users} from "../../../rbac-consts";
import Can from "../../can/Can";

const UserLoginContainer = () => {

    const [alert, setAlert] = useState(false);

    const [alertContent, setAlertContent] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [userPassword, setUserPassword] = useState('');
    const [message, setMessage] = useState(null);

    const loginUser = (event, user) => {
        event.preventDefault();

        axios.post('/api/login', user)
            .then(response => {
                setAlert(false);
                const userRole = GetUserInfo('role');
                if(userRole=='ROLE_ADMIN'){
                    setMessage({
                        title: "Successful login",
                        severity: 'success',
                        content:"Welcome master!",
                        btn:{
                            href: '/panel',
                            text: 'To Admin panel'
                        }
                    });
                }else{
                    setMessage({
                        title: "Successful login",
                        severity: 'success',
                        content:"You have successfully logged in!",
                        btn:{
                            href: '/',
                            text: 'Home Page'
                        }
                    });
                }
            }).catch(error => {
            setAlertContent(error.response.data.message);
            setAlert(true);
        })
    }

    return (<>
            {alert ? <Alert severity='error'>{alertContent}</Alert> : <></>}
            {message
                ? <>
                    <MessageAfterActionContainer message={message}/>
                </>
                : <>

                    <form onSubmit={(event) => {
                        loginUser(event, {email: userEmail, password: userPassword})
                    }}>
                        <Table>
                            <TableBody>
                                <TableRow>
                                    <TableCell>
                                        <Box sx={{
                                            '& .MuiTextField-root': {m: 1},
                                        }}>
                                            <TextField value={userEmail} onChange={(event) => {
                                                setUserEmail(event.target.value)
                                            }} required type={"email"} label={"Email"} fullWidth variant={"standard"}/>
                                            <TextField type="password" value={userPassword} onChange={(event) => {
                                                setUserPassword(event.target.value)
                                            }} required label={"Password"} fullWidth variant={"standard"}/>
                                        </Box>
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell align={"right"}>
                                        <Button variant="contained" type={"submit"}>
                                            Login
                                        </Button>
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>
                                        <Link to={"/reset-password"}>
                                            Forgot password?
                                        </Link>
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </form>
                </>}
        </>
    );
}


export default UserLoginContainer;

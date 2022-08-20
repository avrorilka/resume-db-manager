import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {Button, Table, TableBody, TableCell, TableRow, TextField} from "@mui/material";
import Box from '@mui/material/Box';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import Alert from '@mui/material/Alert';
import Link from "@mui/material/Link";
import {useNavigate} from "react-router";
import MessageAfterActionContainer from "../../messsage/MessageAfterActionsContainer";

const PanelUserCreateContainer = () => {
    const navigate = useNavigate();


    const [alert, setAlert] = useState(false);
    const [alertContent, setAlertContent] = useState('');
    const [alertSeverity, setAlertSeverity] = useState('error');

    const [userName, setUserName] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [userPhone, setUserPhone] = useState('');
    const [userPassword, setUserPassword] = useState('');
    const [message, setMessage] = useState(null);


    const createUser = (event, user) => {
        event.preventDefault();
        axios.post('/api/registration', user)
            .then(response => {
                setMessage({
                    title: "Success",
                    severity: 'success',
                    content: "User was successfully created!",
                    btn: {
                        href: '/panel/users',
                        text: 'To users\' list'
                    }
                });
            }).catch(error => {
            setMessage({
                title: "Error",
                severity: 'error',
                content: `${error.message.content}`,
                btn: {
                    href: '/panel/users',
                    text: 'To users\' list'
                }
            });
        })
    }

    return (
        <>{message
            ? <>
                <MessageAfterActionContainer message={message}/>
            </>
            :
            <div>
                <div><h2>Create User</h2></div>

                <form onSubmit={(event) => {
                    createUser(event, {
                        name: userName,
                        email: userEmail,
                        phoneNumber: userPhone,
                        password: userPassword
                    })
                }}>
                    <Table>
                        {alert ? <Alert severity={alertSeverity}>{alertContent}</Alert> : <></>}
                        <TableBody>
                            <TableRow>
                                <TableCell>
                                    <Box
                                        sx={{
                                            '& .MuiTextField-root': {m: 1},
                                        }}>
                                        <TextField value={userName} onChange={(event) => {
                                            setUserName(event.target.value)
                                        }} required label={"Username"} fullWidth variant={"standard"}/>
                                        <TextField value={userEmail} type={"email"} onChange={(event) => {
                                            setUserEmail(event.target.value)
                                        }} required label={"Email"} fullWidth variant={"standard"}/>
                                        <TextField value={userPhone} onChange={(event) => {
                                            setUserPhone(event.target.value)
                                        }} label={"Phone"} fullWidth variant={"standard"}/>
                                        <TextField type="password" value={userPassword} onChange={(event) => {
                                            setUserPassword(event.target.value)
                                        }} required label={"Password"} fullWidth variant={"standard"}/>
                                    </Box>
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell align={"right"}>
                                    <Button variant="contained" type={"submit"}>
                                        Save
                                    </Button>
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>
                                    <Button href="/panel/users" variant="contained" endIcon={<KeyboardBackspaceIcon/>}>
                                        Back to users list
                                    </Button>
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </form>
            </div>}
            </>
            );
        }

            export default PanelUserCreateContainer;

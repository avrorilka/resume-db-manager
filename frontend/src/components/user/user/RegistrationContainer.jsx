import React, {useState} from 'react';
import axios from 'axios';
import {Button, Table, TableBody, TableCell, TableRow, TextField} from "@mui/material";
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import {useNavigate} from "react-router";
import MessageAfterActionContainer from "../../messsage/MessageAfterActionsContainer";

const RegistrationContainer = () => {
    const navigate = useNavigate();

    const [alert, setAlert] = useState(false);
    const [alertContent, setAlertContent]   = useState('');
    const [alertSeverity, setAlertSeverity] = useState('error');
    const [message, setMessage] = useState(null);

    const [userName, setUserName]   = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [userPhone, setUserPhone] = useState('');
    const [userPassword, setUserPassword] = useState('');
    const [userPasswordConfirm, setUserPasswordConfirm] = useState('');

    const registration = (event, user) => {
        event.preventDefault();
        if (user.password === user.passwordConfirm) {
            axios.post('/api/registration', user)
                .then(response => {
                    setMessage({
                        title: "Success",
                        severity: 'success',
                        content: "You are successfully registered",
                        btn: {
                            href: '/login',
                            text: 'Log in'
                        }
                    });
                }).catch(error => {
                setAlertContent("Error of registration");
                setAlert(true);
            })
        } else {
            setAlertContent("Passwords not match each other");
            setAlert(true);
        }

    }

    return (
        <>{message
            ? <>
                <MessageAfterActionContainer message={message}/>
            </>
            :
        <div>
            <div>
                <h2>Registration</h2>
            </div>

            {alert ? <Alert severity={alertSeverity}>{alertContent}</Alert> : <></>}

            <form onSubmit={(event) => {
                registration(event, {
                    name: userName,
                    email: userEmail,
                    phoneNumber: userPhone,
                    password: userPassword,
                    passwordConfirm: userPasswordConfirm
                })
            }}>
                <Table>
                    <TableBody>
                        <TableRow>
                            <TableCell>
                                <Box sx={{'& .MuiTextField-root': {m: 1},}}>
                                    <TextField value={userName} onChange={(event) => {
                                        setUserName(event.target.value)
                                    }} required label={"Username"} fullWidth variant={"standard"}/>
                                    <TextField value={userEmail} onChange={(event) => {
                                        setUserEmail(event.target.value)
                                    }} required type={"email"} label={"Email"} fullWidth variant={"standard"}/>
                                    <TextField value={userPhone} onChange={(event) => {
                                        setUserPhone(event.target.value)
                                    }} label={"Phone"} fullWidth variant={"standard"}/>
                                    <TextField type="password" value={userPassword} onChange={(event) => {
                                        setUserPassword(event.target.value)
                                    }} required label={"Password"} fullWidth variant={"standard"}/>
                                    <TextField type="password" value={userPasswordConfirm} onChange={(event) => {
                                        setUserPasswordConfirm(event.target.value)
                                    }} required label={"Password Confirm"} fullWidth variant={"standard"}/>
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
                    </TableBody>
                </Table>
            </form>
        </div>}</>
    );
}


export default RegistrationContainer;

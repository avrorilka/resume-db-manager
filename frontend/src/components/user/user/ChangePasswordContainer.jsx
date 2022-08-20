import React, {useState} from 'react';
import axios from 'axios';
import {useParams} from "react-router-dom";
import {Button, Table, TableBody, TableCell, TableRow, TextField} from "@mui/material";
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import {useNavigate} from "react-router";
import MessageAfterActionContainer from "../../messsage/MessageAfterActionsContainer";

const ChangePasswordContainer = (token) => {
    const [alert, setAlert] = useState(false);
    const [alertContent, setAlertContent] = useState('');
    const [alertSeverity, setAlertSeverity] = useState('error');

    const [userPassword, setUserPassword] = useState('');
    const [userPasswordConfirm, setUserPasswordConfirm] = useState('');
    const [message, setMessage] = useState(null);

    token = useParams().token;


    const changePassword = (event, user) => {
        event.preventDefault();
        user.token = token;

        if (user.password === user.passwordConfirm) {
            axios.post('/api/reset-password/new-password/' + token, user)
                .then(response => {
                    setMessage({
                        title: "Success",
                        severity: 'success',
                        content:"Password was successfully changed!",
                        btn:{
                            href: '/',
                            text: 'Home Page'
                        }
                    });

                }).catch(() => {
                setAlertContent("You can't change password");
                setAlert(true);
            });
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
            : <div>
                <div><h2>Please enter a new password</h2></div>

                {alert ? <Alert severity={alertSeverity}>{alertContent}</Alert> : <></>}

                <form onSubmit={(event) => {
                    changePassword(event, {password: userPassword, passwordConfirm: userPasswordConfirm})
                }}>
                    <Table>
                        <TableBody>
                            <TableRow>
                                <TableCell>
                                    <Box sx={{
                                        '& .MuiTextField-root': {m: 1},
                                    }}>
                                        <TextField value={userPassword} onChange={(event) => {
                                            setUserPassword(event.target.value)
                                        }} required label={"Password"} fullWidth variant={"standard"}/>
                                        <TextField value={userPasswordConfirm} onChange={(event) => {
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
            </div>}
        </>
    );
}


export default ChangePasswordContainer;
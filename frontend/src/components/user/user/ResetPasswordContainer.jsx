import React, {useState} from 'react';
import axios from 'axios';
import {Button, Table, TableBody, TableCell, TableRow, TextField} from "@mui/material";
import Box from '@mui/material/Box';
import Alert from "@mui/material/Alert";
import {useNavigate} from "react-router";
import MessageAfterActionContainer from "../../messsage/MessageAfterActionsContainer";

const ResetPasswordContainer = () => {
    const [alert, setAlert] = useState(false);
    const [alertContent, setAlertContent] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [message, setMessage] = useState(null);

    const resetPassword = (event, user) => {
        event.preventDefault();

        axios.post('/api/reset-password', user)
            .then(response => {
                if (response.status === 200) {
                    setMessage({
                        title: "Success",
                        severity: 'success',
                        content: "Email that contains a link to reset your password was just sent!",
                        btn: {
                            href: '/',
                            text: 'Home Page'
                        }
                    });
                }
            })
    }

    return (
        <>{message
            ? <>
                <MessageAfterActionContainer message={message}/>
            </>
            :
            <div>
                <div>
                    <h2>Reset your password</h2>
                    <p>Enter your email address and we will send you a link to reset your password.</p>
                </div>

                {alert ? <Alert severity='success'>{alertContent}</Alert> : <></>}

                <form onSubmit={(event) => {
                    resetPassword(event, {email: userEmail})
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
                                        }} required type={"email"} label={"email"} fullWidth variant={"standard"}/>
                                    </Box>
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell align={"right"}>
                                    <Button variant="contained" type={"submit"}>
                                        Send password reset email
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


export default ResetPasswordContainer;


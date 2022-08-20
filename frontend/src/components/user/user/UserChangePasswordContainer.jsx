import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {Link, useParams} from "react-router-dom";
import {Button, IconButton, Table, TableBody, TableCell, TableHead, TableRow, TextField} from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import DoneIcon from '@mui/icons-material/Done';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import {useNavigate} from "react-router";
import MessageAfterActionContainer from "../../messsage/MessageAfterActionsContainer";

const UserChangePasswordContainer = () => {

    const [data, setData] = useState([]);
    const [message, setMessage] = useState(null);

    const getData = () => {
        axios.get(`/api/profile`)
            .then(response => {
                if (response.status === 200) {
                    setData(response.data);
                }
            })
        ;

    };

    useEffect(() => {
        getData();
    }, []);

    const updateUser = (event, userPassword) => {
        event.preventDefault();
        axios.patch(`/api/users/${data.id}`, userPassword)
            .then(response => {
                setMessage({
                    title: "Success",
                    severity: 'success',
                    content:"Password was successfully changed!",
                    btn:{
                        href: '/profile',
                        text: 'To profile'
                    }
                });
            })
    }

    const [editUserPassword, setEditUserPassword] = useState('');

    return (
        <>{message
            ? <>
                <MessageAfterActionContainer message={message}/>
            </>
            :
            <form onSubmit={(event) => {
                updateUser(event, {
                    password: editUserPassword,
                })
            }}>

                <Table>
                    <TableBody>
                        <TableRow>
                            <TableCell>
                                <b>Password</b>
                            </TableCell>
                            <TableCell>
                                <TextField type="password" fullwidth value={editUserPassword} onChange={(event) => {
                                    setEditUserPassword(event.target.value)
                                }} required label={"Password"} fullWidth variant={"standard"}/>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>
                                <Button href="/" variant="contained" endIcon={<KeyboardBackspaceIcon/>}>
                                    Back to home page
                                </Button>
                                <Button href={"/profile"} variant="text" endIcon={<ArrowBackIosNewIcon/>}>
                                    Back to profile
                                </Button>
                            </TableCell>
                            <TableCell id="submitCell">
                                <Button type={"submit"} variant="outlined" endIcon={<DoneIcon/>}>
                                    Save changes
                                </Button>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </form>}
        </>
    );
}

export default UserChangePasswordContainer;

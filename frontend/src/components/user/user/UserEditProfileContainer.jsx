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

const UserEditProfileContainer = () => {
    const navigate = useNavigate();
    const [data, setData] = useState([]);
    const [message, setMessage] = useState(null);

    const getData = () => {
        axios.get(`/api/profile`)
            .then(response => {
                if (response.status === 200) {
                    setData(response.data);
                    document.getElementById("submitCell").style.visibility = 'hidden';
                }
            })
    };

    useEffect(() => {
        getData();
    }, []);

    const updateUser = (event, user) => {
        event.preventDefault();
        axios.patch(`/api/users/${data.id}`, user)
            .then(response => {
                setMessage({
                    title: "Success",
                    severity: 'success',
                    content: "Your profile was successfully updated!",
                    btn: {
                        href: '/profile',
                        text: 'To profile'
                    }
                });
            })
    };

    const [editUserName, setEditUserName] = useState(null);
    const [editUserNameIsShown, setEditUserNameIsShown] = useState(data.name);
    const [editUserPhone, setEditUserPhone] = useState(null);
    const [editUserPhoneIsShown, setEditUserPhoneIsShown] = useState(data.phoneNumber);

    return (
        <>{message
            ? <>
                <MessageAfterActionContainer message={message}/>
            </>
            : <form onSubmit={(event) => {
                updateUser(event, {
                    name: editUserName,
                    phoneNumber: editUserPhone,
                })
            }}>

                <Table>
                    <TableBody>
                        <TableRow id="editRow">
                            <TableCell>
                            </TableCell>
                            <TableCell align={"right"}>
                                <IconButton onClick={() => {
                                    document.getElementById("submitCell").style.visibility = 'visible';
                                    document.getElementById("editRow").style.display = 'none';
                                    setEditUserNameIsShown(data.name);
                                    setEditUserName(data.name)
                                    setEditUserPhoneIsShown(data.phoneNumber);
                                    setEditUserPhone(data.phoneNumber);
                                }}>
                                    <EditIcon/>
                                </IconButton>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>
                                <b>Username</b>
                            </TableCell>
                            <TableCell>
                                {editUserNameIsShown === data.name ?
                                    <TextField fullwidth value={editUserName} onChange={(event) => {
                                        setEditUserName(event.target.value)
                                    }} required label={"Username"} fullWidth variant={"standard"}/>

                                    :
                                    data.name
                                }
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>
                                <b>Phone</b>
                            </TableCell>
                            <TableCell>
                                {editUserPhoneIsShown === data.phoneNumber ?
                                    <TextField fullwidth value={editUserPhone} onChange={(event) => {
                                        setEditUserPhone(event.target.value)
                                    }} label={"Phone"} fullWidth variant={"standard"}/>

                                    :
                                    data.phoneNumber
                                }
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

export default UserEditProfileContainer;

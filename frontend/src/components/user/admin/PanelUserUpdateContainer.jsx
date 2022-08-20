import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {useParams} from "react-router-dom";
import Link from '@mui/material/Link';
import {Button, IconButton, Table, TableBody, TableCell, TableHead, TableRow, TextField} from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import DoneIcon from '@mui/icons-material/Done';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import Alert from '@mui/material/Alert';
import MessageAfterActionContainer from "../../messsage/MessageAfterActionsContainer";

const PanelUserUpdateContainer = () => {

    const [data, setData] = useState([]);

    const [alert, setAlert] = useState(false);
    const [alertContent, setAlertContent] = useState('');
    const [alertSeverity, setAlertSeverity] = useState('error');

    const [editUserName, setEditUserName] = useState(false);
    const [editUserNameIsShown, setEditUserNameIsShown] = useState(data.name);
    const [editUserPhoneIsShown, setEditUserPhoneIsShown] = useState(data.phoneNumber);
    const [editUserPhone, setEditUserPhone] = useState(false);
    const [message, setMessage] = useState(null);

    const id = useParams().id;

    const getData = (id) => {
        axios.get(`/api/users/` + id)
            .then(response => {
                if (response.status === 200) {
                    setData(response.data);
                    document.getElementById("submitCell").style.visibility = 'hidden';


                }
            });
    };

    useEffect(() => {
        getData(id);
    }, []);

    const updateUser = (event, user) => {
        event.preventDefault();
        console.log(user);
        axios.patch('/api/users/' + id, user)
            .then(response => {
                setMessage({
                    title: "Success",
                    severity: 'success',
                    content: "User was successfully updated!",
                    btn: {
                        href: '/panel/users',
                        text: 'To users\' list'
                    }
                })
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
                <form onSubmit={(event) => {
                    updateUser(event, {
                        name: editUserName,
                        phoneNumber: editUserPhone,
                    })
                }}>
                    <div><h2>Update User</h2></div>

                    {alert ? <Alert severity={alertSeverity}>{alertContent}</Alert> : <></>}

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
                                    <b>Email</b>
                                </TableCell>
                                <TableCell>
                                    {data.email}
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
                                <TableCell></TableCell>
                                <TableCell id="submitCell" align={"right"}>
                                    <Button type={"submit"} variant="outlined" endIcon={<DoneIcon/>}>
                                        Save changes
                                    </Button>
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>
                                    <Button href="/panel/users" variant="contained" endIcon={<KeyboardBackspaceIcon/>}>
                                        Back to users list
                                    </Button>
                                </TableCell>
                                <TableCell align={"right"}>
                                    <Button href={"/panel/users/" + data.id} variant="text"
                                            endIcon={<ArrowBackIosNewIcon/>}>
                                        Back to user review
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

export default PanelUserUpdateContainer;

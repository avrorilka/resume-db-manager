import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {useParams} from "react-router-dom";
import Link from '@mui/material/Link';
import {Button, IconButton, Table, TableBody, TableCell, TableHead, TableRow, TextField} from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import Alert from "@mui/material/Alert";
import PanelCvList from "../../cv/admin/PanelCvList";
import MessageAfterActionContainer from "../../messsage/MessageAfterActionsContainer";

const PanelUserShowContainer = () => {

    const [data, setData] = useState([]);
    const [message, setMessage] = useState(null);

    const [alert, setAlert] = useState(false);
    const [alertContent, setAlertContent] = useState('');
    const [alertSeverity, setAlertSeverity] = useState('error');
    const id = useParams().id;

    const getData = (id) => {
        axios.get(`/api/users/` + id)
            .then(response => {
                if (response.status === 200) {
                    setData(response.data);
                }
            });
    };

    useEffect(() => {
        getData(id);
    }, []);

    const deleteUser = (id) => {
        axios.delete(`/api/users/` + id)
            .then(res => {
                setMessage({
                    title: "Success",
                    severity: 'success',
                    content: "User was successfully deleted!",
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
    console.log(data.cvs);
    return (
        <>{message
            ? <>
                <MessageAfterActionContainer message={message}/>
            </>
            :
        <div>
            {alert ? <Alert severity={alertSeverity}>{alertContent}</Alert> : <></>}
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>
                            ID
                        </TableCell>
                        <TableCell>
                            {data.id}
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    <TableRow>
                        <TableCell>
                            Username
                        </TableCell>
                        <TableCell>
                            {data.name}
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>
                            Email
                        </TableCell>
                        <TableCell>
                            {data.email}
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>
                            Phone
                        </TableCell>
                        <TableCell>
                            {data.phoneNumber}
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>
                            <Button href="/panel/users" variant="contained" endIcon={<KeyboardBackspaceIcon/>}>
                                Back to users list
                            </Button>
                        </TableCell>
                        <TableCell>
                            <IconButton href={"/panel/users/update/" + data.id}>
                                <EditIcon/>
                            </IconButton>
                            <IconButton onClick={() => {
                                deleteUser(data.id)
                            }}>
                                <DeleteIcon/>
                            </IconButton>
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>

            {data.cvs && <PanelCvList data={data.cvs}/>}
        </div>} </>
    );
}


export default PanelUserShowContainer;

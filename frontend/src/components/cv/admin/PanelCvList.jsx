import {Button, IconButton, Table, TableBody, TableCell, TableHead, TableRow} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import React, {useEffect, useState} from "react";
import axios from "axios";
import TimeStampToDateString from "../../../utils/TimeTransform";
import Box from "@mui/material/Box";
import {Link, useHistory, useParams} from "react-router-dom";
import Alert from '@mui/material/Alert';
import MessageAfterActionContainer from "../../messsage/MessageAfterActionsContainer";

const PanelCvList = (data) => {
    const [alert, setAlert] = useState(false);
    const [alertContent, setAlertContent] = useState('');
    const [alertSeverity, setAlertSeverity] = useState('error');
    const [message, setMessage] = useState(null);

    const deleteCV = (cvId, mediaObjectId) => {
        axios.delete('/api/media-object/' + mediaObjectId)
            .then(res => {
                if (res.status === 200) {
                    axios.delete(`/api/cv/` + cvId)
                        .then(res => {
                            if (res.status === 200) {
                                setMessage({
                                    title: "Success",
                                    severity: 'success',
                                    content: "User was successfully deleted!",
                                    btn: {
                                        href: '/panel/cv',
                                        text: 'To cvs\' list'
                                    }
                                });
                            }
                        }).catch(error => {
                        setMessage({
                            title: "Error",
                            severity: 'error',
                            content: `${error.message.content}`,
                            btn: {
                                href: '/panel/cv',
                                text: 'To cvs\' list'
                            }
                        });
                    })
                }
            })
    };

    return (
        <>{message
            ? <>
                <MessageAfterActionContainer message={message}/>
            </>
            :
            <>
            {data.data.length > 0 &&
            <Box>
                {alert ? <Alert severity={alertSeverity}>{alertContent}</Alert> : <></>}
                <Box>
                    <h2>Resumes</h2>
                </Box>
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between'
                    }}
                >
                    <Button href="/panel/" variant="contained" endIcon={<KeyboardBackspaceIcon/>}>
                        Back to panel
                    </Button>
                </Box>{data.data &&
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Description</TableCell>
                            <TableCell>Created</TableCell>
                            <TableCell>Last update</TableCell>
                            {data.data[0].company.name && <TableCell>Company</TableCell>}
                            {data.data[0].user.name && <TableCell>User</TableCell>}
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>

                        {data.data.map(i =>
                            <TableRow>
                                <TableCell>{i.id}</TableCell>
                                <TableCell>{i.description}</TableCell>
                                <TableCell>{TimeStampToDateString(i.createdAt)}</TableCell>
                                <TableCell>{TimeStampToDateString(i.updatedAt)}</TableCell>
                                {i.company.name && <TableCell><Link to={`/panel/companies/${i.company.id}`}
                                                                    style={{textDecoration: "none"}}>{i.company.name}</Link></TableCell>}
                                {i.user.name && <TableCell><Link to={`/panel/users/${i.user.id}`}
                                                                 style={{textDecoration: "none"}}>{i.user.name}</Link></TableCell>}
                                <TableCell>
                                    <IconButton href={"/panel/cv/" + i.id}>
                                        <VisibilityIcon/>
                                    </IconButton>
                                    <IconButton onClick={() => {
                                        deleteCV(i.id, i.mediaObjects[0].id);
                                    }}>
                                        <DeleteIcon/>
                                    </IconButton>
                                </TableCell>
                            </TableRow>)}
                    </TableBody>
                </Table>}
            </Box>}</>
        }</>)
}
export default PanelCvList;


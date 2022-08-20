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
import {useNavigate} from "react-router";

const CvList = (data) => {
    const navigate = useNavigate();
    const [alert, setAlert] = useState(false);
    const [alertContent, setAlertContent] = useState('');
    const [alertSeverity, setAlertSeverity] = useState('error');
    const deleteCV = (cvId, mediaObjectId) => {
        axios.delete('/api/media-object/' + mediaObjectId)
            .then(res => {
                if (res.status === 200) {
                    axios.delete(`/api/cv/` + cvId)
                        .then(res => {
                            if (res.status === 200) {
                                setAlertContent("CV was deleted successfully");
                                setAlertSeverity('success');
                                setAlert(true);
                                window.location.replace("/profile");
                            }
                        }).catch(error => {
                        setAlertContent(error.data.message);
                        setAlertSeverity('error');
                        setAlert(true);
                    })
                }
            })
    };

    return (
        <>
            {data.data.length > 0 &&
                <Box>
                    {alert ? <Alert severity={alertSeverity}>{alertContent}</Alert> : <></>}
                    <Box>
                        <h2>Resumes</h2>
                    </Box>

                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Description</TableCell>
                                <TableCell>Created</TableCell>
                                <TableCell>Last update</TableCell>
                                <TableCell>Company</TableCell>
                                <TableCell>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>

                            {data.data.map(i => <TableRow>
                                <TableCell>{i.description}</TableCell>
                                <TableCell>{TimeStampToDateString(i.createdAt)}</TableCell>
                                <TableCell>{TimeStampToDateString(i.updatedAt)}</TableCell>
                                <TableCell><Link to={`/companies/${i.company.id}`}
                                                 style={{textDecoration: "none"}}>{i.company.name}</Link></TableCell>
                                <TableCell>
                                    <IconButton href={"/cv/" + i.id}>
                                        <VisibilityIcon/>
                                    </IconButton>
                                    <IconButton href={"/cv/update/" + i.id}>
                                        <EditIcon/>
                                    </IconButton>
                                    <IconButton onClick={() => {
                                        deleteCV(i.id, i.mediaObjects[0].id);
                                    }}>
                                        <DeleteIcon/>
                                    </IconButton>
                                </TableCell>
                            </TableRow>)}
                        </TableBody>
                    </Table>
                </Box>}
        </>)

}
export default CvList;


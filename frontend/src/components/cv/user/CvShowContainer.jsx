import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {Link, useParams} from "react-router-dom";
import {Button, IconButton, Table, TableBody, TableCell, TableRow} from "@mui/material";
import Box from '@mui/material/Box';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import {Viewer} from '@react-pdf-viewer/core';
import {defaultLayoutPlugin} from '@react-pdf-viewer/default-layout';
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import {Worker} from '@react-pdf-viewer/core';
import TimeStampToDateString from "../../../utils/TimeTransform";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import {Rating} from '@mui/material';
import Typography from "@mui/material/Typography";

const PanelCvShowContainer = () => {
    const id = useParams().id;
    const defaultLayoutPluginInstance = defaultLayoutPlugin();

    const [alert, setAlert] = useState(false);
    const [alertContent, setAlertContent] = useState('');
    const [alertSeverity, setAlertSeverity] = useState('error');

    const [viewPdf, setViewPdf] = useState(null);
    const [cv, setCV] = useState('');


    const getData = (id) => {
        axios.get(`/api/cv/${id}`)
            .then(response => {
                setCV(response.data);
                axios.get(`/api/media-object/${response.data.mediaObjects[0].id}/file`, {responseType: 'blob'})
                    .then(response => {
                        if (response.status === 200) {
                            let fileBlob = new Blob([response.data], {type: 'application/pdf'});
                            let reader = new FileReader();
                            reader.readAsDataURL(fileBlob);
                            reader.onloadend = (e) => {
                                setViewPdf(e.target.result);
                            }
                        }
                    })
            });
    };

    useEffect(() => {
        getData(id);
    }, []);


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
                        setAlertContent("Error! You can't delete cv");
                        setAlert(true);
                    })
                }
            })
    };


    return (
        <div>
            {cv &&
                <Box
                    sx={{
                        '& .MuiTextField-root': {m: 1},
                        display: 'flex',
                        gap: '20px',
                        padding: '10px 50px',
                    }}
                >
                    <Box>
                        <Table>
                            <TableBody>
                                <TableRow>
                                    <TableCell>Description</TableCell>
                                    <TableCell>{cv.description}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>Company</TableCell>
                                    <TableCell><Link to={`/companies/${cv.company.id}`}
                                                     style={{textDecoration: "none"}}>{cv.company.name}</Link></TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>Created</TableCell>
                                    <TableCell>{TimeStampToDateString(cv.createdAt)}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>Last update</TableCell>
                                    <TableCell>{TimeStampToDateString(cv.updatedAt)}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>
                                        <Button href="/profile" variant="contained" endIcon={<KeyboardBackspaceIcon/>}>
                                            Back to profile
                                        </Button>
                                    </TableCell>
                                    <TableCell>
                                        <IconButton href={"/cv/update/" + cv.id}>
                                            <EditIcon/>
                                        </IconButton>
                                        <IconButton href={viewPdf} download={`${cv.id}_file.pdf`}>
                                            <FileDownloadIcon/>
                                        </IconButton>
                                        <IconButton onClick={() => {
                                            deleteCV(cv.id, cv.mediaObjects[0].id)
                                        }}>
                                            <DeleteIcon/>
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                        <Box
                            sx={{
                                marginTop: '10px',
                                display: 'flex',
                                justifyContent: 'space-around'
                            }}
                        >
                            <Typography component="legend">Rating:</Typography>
                            <Rating

                                max={10}
                                name="rating"
                                value={cv.rating ? cv.rating : 0}
                                readOnly
                            />
                        </Box>
                    </Box>

                    <Box
                        sx={{
                            flex: '1 0 50%',
                        }}
                    >
                        <Box sx={{
                            border: '1px solid rgba(0, 0, 0, 0.3)',
                            height: '750px',
                            background: 'lightgray',
                            marginBottom: '20px',

                        }} className="PdfContainer>">
                            {viewPdf && <><Worker
                                workerUrl="https://unpkg.com/pdfjs-dist@2.12.313/build/pdf.worker.min.js">
                                <Viewer fileUrl={viewPdf}
                                        plugins={[defaultLayoutPluginInstance]}/>
                            </Worker></>}
                        </Box>
                    </Box>
                </Box>}

        </div>
    )
}
export default PanelCvShowContainer;
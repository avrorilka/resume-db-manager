import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {Link, useParams} from "react-router-dom";
import {Button, IconButton, Table, TableBody, TableCell, TableRow, TextField} from "@mui/material";
import Box from '@mui/material/Box';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import {Viewer} from '@react-pdf-viewer/core';
import {defaultLayoutPlugin} from '@react-pdf-viewer/default-layout';
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import {Worker} from '@react-pdf-viewer/core';
import TimeStampToDateString from "../../../utils/TimeTransform";
import DeleteIcon from "@mui/icons-material/Delete";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import {Rating} from '@mui/material';
import Typography from "@mui/material/Typography";
import Alert from '@mui/material/Alert';
import {useNavigate} from "react-router";
import MessageAfterActionContainer from "../../messsage/MessageAfterActionsContainer";

const PanelCvUpdateContainer = () => {
    const id = useParams().id;
    const defaultLayoutPluginInstance = defaultLayoutPlugin();

    const navigate = useNavigate();
    const [alert, setAlert] = useState(false);
    const [alertContent, setAlertContent] = useState('');
    const [alertSeverity, setAlertSeverity] = useState('error');

    const [viewPdf, setViewPdf] = useState(null);
    const [cv, setCV] = useState('');
    const [desc, setDesc] = useState('');
    const [selectedFile, setSelectedFile] = useState(null);
    const [message, setMessage] = useState(null);

    const getData = (id) => {
        axios.get(`/api/cv/${id}`)
            .then(response => {
                setCV(response.data);
                setDesc(response.data.description);
                axios.get(`/api/media-object/${response.data.mediaObjects[0].id}/file`, {responseType: 'blob'})
                    .then(response => {
                        console.log(response.data);
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

    const fileHandler = (e) => {
        let file = e.target.files[0];
        setSelectedFile(file);
        if (file) {
            let reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onloadend = (e) => {
                setViewPdf(e.target.result);
            }

        }
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
                        setAlertContent("Error! You can't delete user");
                        setAlert(true);
                    })
                }
            })
    };

    const submitHandler = (e) => {
        e.preventDefault();
        const data = new FormData();
        data.append("file", selectedFile);
        axios.patch(`/api/cv/${id}`, {description: desc})
            .then((response) => {
                if (response.status === 200) {
                    axios.post(`/api/media-object/${cv.mediaObjects[0].id}`, data)
                        .then(response => {
                            if (response.status === 200) {
                                setAlertContent("CV was updated successfully");
                                setAlertSeverity('success');
                                setAlert(true);
                                setMessage({
                                    title: "Success",
                                    severity: 'success',
                                    content: "CV was updated successfully",
                                    btn: {
                                        href: `/cv/${id}`,
                                        text: 'To cv'
                                    }
                                });
                            }
                        }).catch(error => {
                        setAlertContent("Error! You can't update cv");
                        setAlert(true);
                    })
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
                {alert ? <Alert severity={alertSeverity}>{alertContent}</Alert> : <></>}{cv &&
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
                                            Back to Profile
                                        </Button>
                                    </TableCell>
                                    <TableCell>
                                        <Button href={"/cv/" + cv.id} variant="text" endIcon={<ArrowBackIosNewIcon/>}>
                                            Back to cv review
                                        </Button>
                                        <IconButton onClick={() => {
                                            deleteCV(cv.id, cv.mediaObjects[0].id)
                                        }}>
                                            <DeleteIcon/>
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>

                        <form action="" method="PATCH" onSubmit={event => {
                            submitHandler(event, {description: desc})
                        }} encType="multipart/form-data">
                            <Box
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    flex: '1 0 50%',
                                    gap: '20px',
                                    marginTop: '50px'
                                }}
                            >
                                <TextField
                                    sx={{
                                        width: '50%',
                                    }}
                                    value={desc} id="desc" name="description" onChange={event => {
                                    setDesc(event.target.value)
                                }} required label={"New Description"} variant={"standard"}/>
                                <label htmlFor="file">
                                    <input
                                        accept=".pdf"
                                        style={{display: 'none'}}
                                        id="file"
                                        name="file"
                                        type="file"
                                        onChange={fileHandler}
                                    />
                                    <Button color="warning" variant="contained" component="span">
                                        Upload new file (pdf)
                                    </Button>
                                </label>

                                <Button
                                    sx={{
                                        width: '200px'
                                    }}
                                    type="submit" variant="contained">Save</Button>
                            </Box>

                        </form>


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

            </div>}
        </>
    )
}
export default PanelCvUpdateContainer;
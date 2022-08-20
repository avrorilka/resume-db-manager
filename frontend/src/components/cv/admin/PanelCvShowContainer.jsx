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
import DeleteIcon from "@mui/icons-material/Delete";
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import {Rating} from '@mui/material';
import Typography from "@mui/material/Typography";
import MessageAfterActionContainer from "../../messsage/MessageAfterActionsContainer";

const PanelCvShowContainer = () => {
    const id = useParams().id;
    const defaultLayoutPluginInstance = defaultLayoutPlugin();

    const [rating, setRating] = useState(0);
    const [viewPdf, setViewPdf] = useState(null);
    const [cv, setCV] = useState('');
    const [message, setMessage] = useState(null);


    const getData = (id) => {
        axios.get(`/api/cv/${id}`)
            .then(response => {
                setCV(response.data);
                setRating(response.data.rating);
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
                                setMessage({
                                    title: "Success",
                                    severity: 'success',
                                    content: "Resume was successfully deleted!",
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

    const submitHandler = (e) => {
        e.preventDefault();
        axios.patch(`/api/cv/${id}`, {rating: rating})
            .then((response) => {
                if (response.status === 200) {
                    setMessage({
                        title: "Success",
                        severity: 'success',
                        content: "Resume was updated successfully!",
                        btn: {
                            href: `/panel/cv/${id}`,
                            text: 'Back to Resume'
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
                                        <TableCell>ID</TableCell>
                                        <TableCell>{cv.id}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>Description</TableCell>
                                        <TableCell>{cv.description}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>Company</TableCell>
                                        <TableCell><Link to={`/panel/companies/${cv.company.id}`}
                                                         style={{textDecoration: "none"}}>{cv.company.name}</Link></TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>User</TableCell>
                                        <TableCell><Link to={`/panel/users/${cv.user.id}`}
                                                         style={{textDecoration: "none"}}>{cv.user.name}</Link></TableCell>
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
                                            <Button href="/panel/cv" variant="contained"
                                                    endIcon={<KeyboardBackspaceIcon/>}>
                                                Back to resumes list
                                            </Button>
                                        </TableCell>
                                        <TableCell>
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
                            <form action="" method="PATCH" onSubmit={event => {
                                submitHandler(event)
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
                                    <Box
                                        sx={{
                                            display: 'flex',
                                        }}
                                    >
                                        <Typography component="legend">Rating:</Typography>
                                        <Rating
                                            max={10}
                                            name="rating"
                                            value={rating}
                                            onChange={(event, newValue) => {
                                                setRating(newValue);
                                            }}
                                        />
                                    </Box>
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
export default PanelCvShowContainer;
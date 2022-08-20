import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {Button, TextField} from "@mui/material";
import Box from '@mui/material/Box';
import {Viewer} from '@react-pdf-viewer/core';
import {defaultLayoutPlugin} from '@react-pdf-viewer/default-layout';
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import {Worker} from '@react-pdf-viewer/core';
import {Link, useHistory, useParams} from "react-router-dom";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import Alert from "@mui/material/Alert";
import {useNavigate} from "react-router";
import MessageAfterActionContainer from "../../messsage/MessageAfterActionsContainer";

const CvUploadContainer = () => {
    const navigate = useNavigate();

    const [data, setData] = useState([]);

    const getData = async () => {
        axios.get(`/api/profile`)
            .then(response => {
                if (response.status === 200) {
                    setData(response.data);
                }
            })
    };

    useEffect(() => {
        getData();
    }, []);

    const uid = data.id;
    const [message, setMessage] = useState(null);

    const defaultLayoutPluginInstance = defaultLayoutPlugin();
    const companyId = useParams().id;
    const [alert, setAlert] = useState(false);
    const [alertContent, setAlertContent] = useState('');
    const [alertSeverity, setAlertSeverity] = useState('error');
    const [selectedFile, setSelectedFile] = useState(null);
    const [viewPdf, setViewPdf] = useState(null);
    const [desc, setDesc] = useState('');

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

    const submitHandler = (e) => {
        e.preventDefault();
        const data = new FormData();
        data.append("file", selectedFile);
        axios.post("/api/cv", {
            description: desc,
            company: companyId,
            user: uid
        })
            .then((response) => {
                if (response.status === 201) {
                    data.append("cvId", response.data.cvId);
                    axios.post("/api/media-object", data)
                        .then(response => {
                            if (response.status === 201) {
                                setMessage({
                                    title: "Success",
                                    severity: 'success',
                                    content: "Resume was successfully uploaded",
                                    btn: {
                                        href: '/',
                                        text: 'Home Page'
                                    }
                                });
                            }
                        }).catch(error => {
                        setMessage({
                            title: "Error",
                            severity: 'error',
                            content: `${error.message.content}`,
                            btn: {
                                href: '/',
                                text: 'Home Page'
                            }
                        });
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
                {alert ? <Alert severity={alertSeverity}>{alertContent}</Alert> : <></>}
                <Button href="/" style={{textDecoration: "none"}} variant="outlined" endIcon={<KeyboardBackspaceIcon/>}>
                    Back to home page
                </Button>
                <form action="" method="POST" onSubmit={event => {
                    submitHandler(event, {description: desc})
                }} encType="multipart/form-data">
                    <Box
                        sx={{
                            '& .MuiTextField-root': {m: 1},
                            display: 'flex',
                            padding: '10px 30px',
                        }}
                    >
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                flex: '1 0 50%',
                                gap: '20px',
                                marginTop: '100px'
                            }}
                        >
                            <TextField
                                sx={{
                                    width: '70%'
                                }}
                                value={desc} id="desc" name="description" onChange={event => {
                                setDesc(event.target.value)
                            }} required label={"Description"} variant={"standard"}/>
                            <label htmlFor="file">
                                <input
                                    accept=".pdf"
                                    style={{display: 'none'}}
                                    id="file"
                                    name="file"
                                    type="file"
                                    onChange={fileHandler}
                                    required
                                />
                                <Button color="warning" variant="contained" component="span">
                                    Upload file (pdf)
                                </Button>
                            </label>
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
                            <Button
                                sx={{
                                    width: '200px'
                                }}
                                type="submit" variant="contained">Save</Button>
                        </Box>
                    </Box>
                </form>
            </div>}
        </>
    )
}
export default CvUploadContainer;
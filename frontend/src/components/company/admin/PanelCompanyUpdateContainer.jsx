import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {useParams} from "react-router-dom";
import {Button, IconButton, Link, Table, TableBody, TableCell, TableRow, TextField} from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import DoneIcon from '@mui/icons-material/Done';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import Alert from '@mui/material/Alert';
import {useNavigate} from "react-router";
import MessageAfterActionContainer from "../../messsage/MessageAfterActionsContainer";

const PanelCompanyUpdateContainer = () => {
    const navigate = useNavigate();
    const [data, setData] = useState([]);
    const [message, setMessage] = useState(null);

    const [alert, setAlert] = useState(false);
    const [alertContent, setAlertContent] = useState('');
    const [alertSeverity, setAlertSeverity] = useState('error');
    const id = useParams().id;

    const getData = (id) => {
        axios.get(`/api/companies/` + id)
            .then(response => {
                if (response.status === 200){
                    setData(response.data);
                    document.getElementById("submitCell").style.visibility = 'hidden';
                }
            });
        };

    useEffect(() => {
        getData(id);
    }, []);

    const updateCompany = (event, company) => {
        event.preventDefault();
        axios.patch('/api/companies/' + id, company)
            .then(response => {
                setMessage({
                    title: "Success",
                    severity: 'success',
                    content: "Company was successfully updated!",
                    btn: {
                        href: '/panel/companies/'+id,
                        text: 'To company '
                    }
                });
            }).catch(error => {
            setMessage({
                title: "Error",
                severity: 'error',
                content: `${error.message.content}`,
                btn: {
                    href: '/panel/companies/'+id,
                    text: 'To company'
                }
            });
        })
    }

    const [editCompanyName, setEditCompanyName] = useState(false);
    const [editCompanyNameIsShown, setEditCompanyNameIsShown] = useState(data.name);
    const [editCompanyAddress, setEditCompanyAddress] = useState(false);
    const [editCompanyAddressIsShown, setEditCompanyAddressIsShown] = useState(data.address);
    const [editCompanyWebsite, setEditCompanyWebsite] = useState(false);
    const [editCompanyWebsiteIsShown, setEditCompanyWebsiteIsShown] = useState(data.website);
    const [editCompanyPhone, setEditCompanyPhone] = useState(false);
    const [editCompanyPhoneIsShown, setEditCompanyPhoneIsShown] = useState(data.phone);
    const [editCompanyDescription, setEditCompanyDescription] = useState(false);
    const [editCompanyDescriptionIsShown, setEditCompanyDescriptionIsShown] = useState(data.description);

    return (
        <>{message
            ? <>
                <MessageAfterActionContainer message={message}/>
            </>
            :
        <form onSubmit={(event) => {
            updateCompany(event, {
                name: editCompanyName,
                address: editCompanyAddress,
                website: editCompanyWebsite,
                phone: editCompanyPhone,
                description: editCompanyDescription
            })
        }}>

            <div><h2>Update Company</h2></div>
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
                                setEditCompanyNameIsShown(data.name);
                                setEditCompanyName(data.name);
                                setEditCompanyAddressIsShown(data.address);
                                setEditCompanyAddress(data.address);
                                setEditCompanyWebsiteIsShown(data.website);
                                setEditCompanyWebsite(data.website);
                                setEditCompanyPhoneIsShown(data.phone);
                                setEditCompanyPhone(data.phone);
                                setEditCompanyDescriptionIsShown(data.description);
                                setEditCompanyDescription(data.description);
                            }}>
                                <EditIcon/>
                            </IconButton>
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>
                            <b>Company name</b>
                        </TableCell>
                        <TableCell>
                            {editCompanyNameIsShown === data.name ?
                                <TextField fullwidth value={editCompanyName} onChange={(event) => {
                                    setEditCompanyName(event.target.value)
                                }} required label={"Company name"} fullWidth variant={"standard"}/>

                                :
                                data.name
                            }
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>
                            <b>Address</b>
                        </TableCell>
                        <TableCell>
                            {editCompanyAddressIsShown === data.address ?
                                <TextField fullwidth value={editCompanyAddress} onChange={(event) => {
                                    setEditCompanyAddress(event.target.value)
                                }} label={"Address"} fullWidth variant={"standard"}/>

                                :
                                data.address
                            }
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>
                            <b>Website</b>
                        </TableCell>
                        <TableCell>
                            {editCompanyWebsiteIsShown === data.website ?
                                <TextField fullwidth value={editCompanyWebsite} onChange={(event) => {
                                    setEditCompanyWebsite(event.target.value)
                                }} label={"Website"} fullWidth variant={"standard"}/>

                                :
                                data.website
                            }
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>
                            <b>Phone</b>
                        </TableCell>
                        <TableCell>
                            {editCompanyPhoneIsShown === data.phone ?
                                <TextField fullwidth value={editCompanyPhone} onChange={(event) => {
                                    setEditCompanyPhone(event.target.value)
                                }} label={"Phone"} fullWidth variant={"standard"}/>

                                :
                                data.phone
                            }
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>
                            <b>Description</b>
                        </TableCell>
                        <TableCell>
                            {editCompanyDescriptionIsShown === data.description ?
                                <TextField fullwidth value={editCompanyDescription} onChange={(event) => {
                                    setEditCompanyDescription(event.target.value)
                                }} multiline rows={4} label={"Description"} fullWidth variant={"standard"}/>

                                :
                                data.description
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
                            <Button href="/panel/companies" variant="contained" endIcon={<KeyboardBackspaceIcon/>}>
                                Back to companies list
                            </Button>
                        </TableCell>
                        <TableCell align={"right"}>
                            <Button href={"/panel/companies/" + data.id} variant="text"
                                    endIcon={<ArrowBackIosNewIcon/>}>
                                Back to company review
                            </Button>
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </form>}</>
    );
}

export default PanelCompanyUpdateContainer;

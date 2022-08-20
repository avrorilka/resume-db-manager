import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {Link} from "react-router-dom";
import {Button, IconButton, Table, TableBody, TableCell, TableRow, TextField} from "@mui/material";
import Box from '@mui/material/Box';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import Alert from '@mui/material/Alert';
import {useNavigate} from "react-router";
import MessageAfterActionContainer from "../../messsage/MessageAfterActionsContainer";

const PanelCompanyCreateContainer = () => {
    const navigate = useNavigate();

    const [alert, setAlert] = useState(false);
    const [alertContent, setAlertContent] = useState('');
    const [alertSeverity, setAlertSeverity] = useState('error');

    const [companyName, setCompanyName] = useState('');
    const [companyAddress, setCompanyAddress] = useState('');
    const [companyWebsite, setCompanyWebsite] = useState('');
    const [companyPhone, setCompanyPhone] = useState('');
    const [companyDescription, setCompanyDescription] = useState('');
    const [message, setMessage] = useState(null);


    const createCompany = (event, company) => {
        event.preventDefault();
        axios.post('/api/companies', company)
            .then(response => {
                setMessage({
                    title: "Success",
                    severity: 'success',
                    content: "Company was successfully created!",
                    btn: {
                        href: '/panel/companies',
                        text: 'To companies\' list'
                    }
                });
            }).catch(error => {
            setAlertSeverity('error');
            setAlert(true);
            setAlertContent('Error: unable to create company!')
        })
    }

    return (
        <>{message
            ? <>
                <MessageAfterActionContainer message={message}/>
            </>
            :
            <div>
                <div><h2>Create Company</h2></div>

                <form onSubmit={(event) => {
                    createCompany(event, {
                        name: companyName,
                        address: companyAddress,
                        website: companyWebsite,
                        phone: companyPhone,
                        description: companyDescription
                    })
                }}>
                    {alert ? <Alert severity={alertSeverity}>{alertContent}</Alert> : <></>}
                    <Table>
                        <TableBody>
                            <TableRow>
                                <TableCell>
                                    <Box
                                        sx={{
                                            '& .MuiTextField-root': {m: 1},
                                        }}
                                    >
                                        <TextField value={companyName} onChange={(event) => {
                                            setCompanyName(event.target.value)
                                        }} required label={"Company name"} fullWidth variant={"standard"}/>
                                        <TextField value={companyAddress} onChange={(event) => {
                                            setCompanyAddress(event.target.value)
                                        }} label={"Address"} fullWidth variant={"standard"}/>
                                        <TextField value={companyWebsite} onChange={(event) => {
                                            setCompanyWebsite(event.target.value)
                                        }} label={"Website"} fullWidth variant={"standard"}/>
                                        <TextField value={companyPhone} onChange={(event) => {
                                            setCompanyPhone(event.target.value)
                                        }} label={"Phone"} fullWidth variant={"standard"}/>
                                        <TextField value={companyDescription} onChange={(event) => {
                                            setCompanyDescription(event.target.value)
                                        }} multiline rows={4} label={"Description"} fullWidth variant={"standard"}/>
                                    </Box>
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell align={"right"}>
                                    <Button variant="contained" type={"submit"}>
                                        Save
                                    </Button>
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>
                                    <Button href="/panel/companies" variant="contained"
                                            endIcon={<KeyboardBackspaceIcon/>}>
                                        Back to companies list
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

export default PanelCompanyCreateContainer;

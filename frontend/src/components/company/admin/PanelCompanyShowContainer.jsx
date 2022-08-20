import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {useParams} from "react-router-dom";
import {Button, IconButton, Table, TableBody, TableCell, TableHead, TableRow} from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import Alert from "@mui/material/Alert";
import PanelCvList from "../../cv/admin/PanelCvList";
import {useNavigate} from "react-router";
import MessageAfterActionContainer from "../../messsage/MessageAfterActionsContainer";


const PanelCompanyShowContainer = () => {
    const navigate = useNavigate();
    const [data, setData] = useState(null);

    const [alert, setAlert] = useState(false);
    const [alertContent, setAlertContent] = useState('');
    const [alertSeverity, setAlertSeverity] = useState('error');
    const [message, setMessage] = useState(null);

    const id = useParams().id;

    const getData = (id) => {
        axios.get(`/api/companies/` + id)
            .then(response => {
                if (response.status === 200) {
                    setData(response.data);
                }
            });
    };


    useEffect(() => {
        getData(id);
    }, []);

    const deleteCompany = (id) => {
        axios.delete(`/api/companies/` + id)
            .then(res => {
                setMessage({
                    title: "Success",
                    severity: 'success',
                    content: "Company was successfully deleted!",
                    btn: {
                        href: '/panel/companies',
                        text: 'To companies\' list'
                    }
                });
            }).catch(error => {
            setMessage({
                title: "Error",
                severity: 'error',
                content: `${error.message.content}`,
                btn: {
                    href: '/panel/companies',
                    text: 'To companies\' list'
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
            <>{data &&
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
                                    Company name
                                </TableCell>
                                <TableCell>
                                    {data.name}
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>
                                    Address
                                </TableCell>
                                <TableCell>
                                    {data.address}
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>
                                    Website
                                </TableCell>
                                <TableCell>
                                    {data.website}
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>
                                    Phone
                                </TableCell>
                                <TableCell>
                                    {data.phone}
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>
                                    Description
                                </TableCell>
                                <TableCell>
                                    {data.description}
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>
                                    <Button href="/panel/companies" variant="contained"
                                            endIcon={<KeyboardBackspaceIcon/>}>
                                        Back to companies list
                                    </Button>
                                </TableCell>
                                <TableCell>
                                    <IconButton href={"/panel/companies/update/" + data.id}>
                                        <EditIcon/>
                                    </IconButton>
                                    <IconButton onClick={() => {
                                        deleteCompany(data.id)
                                    }}>
                                        <DeleteIcon/>
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                    {data.cvs && <PanelCvList data={data.cvs}/>}
                </div>}
            </>}
        </>);
}

export default PanelCompanyShowContainer;

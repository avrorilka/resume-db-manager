import React, {useContext, useEffect, useState} from 'react';
import axios from 'axios';
import {Link} from "react-router-dom";
import {Button, IconButton, Pagination, Table, TableBody, TableCell, TableHead, TableRow} from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import AddIcon from '@mui/icons-material/Add';
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import Alert from "@mui/material/Alert";
import fetchFilterData from "../../../utils/FilterUtils";
import {useNavigate, useLocation} from 'react-router'
import MessageAfterActionContainer from "../../messsage/MessageAfterActionsContainer";

const PanelCompaniesContainer = () => {
    const navigate = useNavigate();
    const [data, setData] = useState([]);
    const [message, setMessage] = useState(null);

    const [paginationData, setPaginationData] = useState({
        totalPageCount: null,
        itemsPerPage: 2
    });

    const [alert, setAlert] = useState(false);
    const [alertContent, setAlertContent] = useState('');
    const [alertSeverity, setAlertSeverity] = useState('error');
    const [filterData, setFilterData] = useState({
        "page": 1,
    })

    const getData = () => {
        let filterUrl = fetchFilterData(filterData);
        axios.get(`/api/companies` + filterUrl + "&itemsPerPage=" + paginationData.itemsPerPage)
            .then(response => {
                if (response.status === 200) {
                    setData(response.data.list);

                    setPaginationData({
                        ...paginationData,
                        totalPageCount: response.data.totalPageCount
                    })
                }
            }).catch(error => {
            setAlertContent(error.response.data.message);
            setAlert(true);
        });
    };

    useEffect(() => {
        getData();
    }, [filterData]);

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

    const onChangePage = (event, value) => {
        setFilterData({...filterData, page: value});
    }

    return (
        <>{message
            ? <>
                <MessageAfterActionContainer message={message}/>
            </>
            :
            <div>
                <div><h2>Companies List</h2></div>
                {alert ? <Alert severity={alertSeverity}>{alertContent}</Alert> : <></>}
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>
                                Company
                            </TableCell>
                            <TableCell align={"right"}>
                                Actions
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow>
                            <TableCell>
                                <Button href="/panel/companies/create" variant="contained" endIcon={<AddIcon/>}>
                                    Create new company
                                </Button>
                            </TableCell>
                            <TableCell align={"right"}>
                                <Button href="/panel/" variant="contained" endIcon={<KeyboardBackspaceIcon/>}>
                                    Back to panel
                                </Button>
                            </TableCell>
                        </TableRow>
                        {data && data.map(i => <TableRow>
                            <TableCell>{"ID: " + i.id + " - " + i.name}</TableCell>
                            <TableCell align={"right"}>
                                <IconButton href={"/panel/companies/" + i.id}>
                                    <VisibilityIcon/>
                                </IconButton>
                                <IconButton href={"/panel/companies/update/" + i.id}>
                                    <EditIcon/>
                                </IconButton>
                                <IconButton onClick={() => {
                                    deleteCompany(i.id)
                                }}>
                                    <DeleteIcon/>
                                </IconButton>
                            </TableCell>
                        </TableRow>)}
                    </TableBody>
                </Table>

                {paginationData.totalPageCount &&
                    <Pagination
                        className="default-pagination"
                        count={paginationData.totalPageCount}
                        page={filterData.page}
                        shape={'rounded'}
                        onChange={onChangePage}
                        showFirstButton
                        showLastButton
                        boundaryCount={4}
                    />
                }
            </div>}
        </>
    );
}


export default PanelCompaniesContainer;

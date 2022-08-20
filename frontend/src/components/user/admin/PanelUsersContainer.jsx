import React, {useEffect, useState} from 'react';
import axios from 'axios';
import Link from '@mui/material/Link';
import {
    Button,
    IconButton,
    Pagination,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    TextField
} from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import AddIcon from '@mui/icons-material/Add';
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import Alert from "@mui/material/Alert";
import fetchFilterData from "../../../utils/FilterUtils";
import MessageAfterActionContainer from "../../messsage/MessageAfterActionsContainer";

const PanelUsersContainer = () => {

    const [data, setData] = useState([]);

    const [alert, setAlert] = useState(false);
    const [alertContent, setAlertContent] = useState('');
    const [alertSeverity, setAlertSeverity] = useState('error');
    const [message, setMessage] = useState(null);

    const [paginationData, setPaginationData] = useState({
        totalPageCount: null,
        itemsPerPage: 2
    });

    const [filterData, setFilterData] = useState({
        "page": 1,
    })

    const getData = async () => {
        let filterUrl = fetchFilterData(filterData);
        axios.get(`/api/users` + filterUrl + "&itemsPerPage=" + paginationData.itemsPerPage)
            .then(response => {
                if (response.status === 200) {
                    setData(response.data.list);

                    setPaginationData({
                        ...paginationData,
                        totalPageCount: response.data.totalPageCount
                    })
                }
            }).catch(error => {
            setAlertContent(error.message.content);
            setAlert(true);
        });
    };

    useEffect(() => {
        getData();
    }, [filterData]);

    const deleteUser = (id) => {
        axios.delete(`/api/users/` + id)
            .then(res => {
                setMessage({
                    title: "Success",
                    severity: 'success',
                    content: "User was successfully deleted!",
                    btn: {
                        href: '/panel/users',
                        text: 'To user list'
                    }
                });
            }).catch(error => {
            setMessage({
                title: "Error",
                severity: 'error',
                content: `${error.message.content}`,
                btn: {
                    href: '/panel/users',
                    text: 'To user list'
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
                <div><h2>Users List</h2></div>

                {alert ? <Alert severity={alertSeverity}>{alertContent}</Alert> : <></>}

                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>
                                User
                            </TableCell>
                            <TableCell align={"right"}>
                                Actions
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>
                                <Button href="/panel/" variant="contained" endIcon={<KeyboardBackspaceIcon/>}>
                                    Back to panel
                                </Button>
                            </TableCell>
                            <TableCell align={"right"}>
                                <Button href="/panel/users/create" variant="contained" endIcon={<AddIcon/>}>
                                    Create new user
                                </Button>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.map(i => <TableRow>
                            <TableCell>{"ID: " + i.id + " - " + i.name}</TableCell>
                            <TableCell align={"right"}>
                                <IconButton href={"/panel/users/" + i.id}>
                                    <VisibilityIcon/>
                                </IconButton>
                                <IconButton href={"/panel/users/update/" + i.id}>
                                    <EditIcon/>
                                </IconButton>
                                <IconButton onClick={() => {
                                    deleteUser(i.id)
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

export default PanelUsersContainer;

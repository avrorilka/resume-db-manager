import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {Table, TableBody, TableCell, TableRow} from "@mui/material";
import {Link} from "react-router-dom";
import Typography from "@mui/material/Typography";
import {Pagination} from "@mui/material";
import Alert from "@mui/material/Alert";
import fetchFilterData from "../../utils/FilterUtils";

const HomeContainer = () => {

    const [alert, setAlert] = useState(false);
    const [alertContent, setAlertContent] = useState('');
    const [alertSeverity, setAlertSeverity] = useState('error');

    const [data, setData] = useState(null);

    const [filterData, setFilterData] = useState({
        "page": 1,
        "id": null,
    })
    const [paginationData, setPaginationData] = useState({
        totalPageCount: null,
        itemsPerPage: 2
    });

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
            setAlertContent("There's no companies");
            setAlert(true);
            setAlertSeverity("warning");
        });
    };

    useEffect(() => {
        getData();
    }, [filterData]);

    const onChangePage = (event, value) => {
        setFilterData({...filterData, page: value});
    }

    return (
        <main>
            <Typography variant={"h5"}>
                Companies
            </Typography>
            {alert ? <Alert severity={alertSeverity}>{alertContent}</Alert> : <></>}

            {data && <>
                <Table marginBottom={5}>
                    <TableBody>
                        {data.map(i => <TableRow hover component={Link} to={`/companies/` + i.id}
                                                style={{textDecoration: 'none', color: "blue"}}>
                        <TableCell>
                            <Typography variant={"h6"} color={"darkblue"}>
                                {i.name}
                            </Typography>
                            <Typography variant={"body1"}>
                                {`${i.description.substring(0, 500)}`}
                            </Typography>
                        </TableCell>
                        <TableCell align={"right"}>
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
            </>}
        </main>
    );
}


export default HomeContainer;

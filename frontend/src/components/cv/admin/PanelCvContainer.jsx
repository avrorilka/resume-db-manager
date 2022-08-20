import React, {useEffect, useState} from 'react';
import PanelCvList from './PanelCvList';
import axios from 'axios';
import {useNavigate} from "react-router"
import Alert from '@mui/material/Alert';
import {Pagination} from "@mui/material";
import fetchFilterData from "../../../utils/FilterUtils";

const PanelCvContainer = () => {

    const [alert, setAlert] = useState(false);
    const [alertContent, setAlertContent] = useState('');
    const [alertSeverity, setAlertSeverity] = useState('error');

    const [data, setData] = useState(null);

    const [paginationData, setPaginationData] = useState({
        totalPageCount: null,
        itemsPerPage: 2
    });

    const [filterData, setFilterData] = useState({
        "page": 1,
    })


    const getData = () => {
        let filterUrl = fetchFilterData(filterData);
        axios.get(`/api/cv` + filterUrl + "&itemsPerPage=" + paginationData.itemsPerPage)
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

    const onChangePage = (event, value) => {
        setFilterData({...filterData, page: value});
    }

    return (

        <div>
            {alert ? <Alert severity={alertSeverity}>{alertContent}</Alert> : <></>}

            {data &&
                <>
                    <PanelCvList data={data}/>
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
                </>
            }
        </div>

    );

}


export default PanelCvContainer;

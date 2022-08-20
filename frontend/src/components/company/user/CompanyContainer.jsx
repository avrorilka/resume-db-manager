import React, {useContext, useEffect, useState} from 'react';
import axios from 'axios';
import {Link, useParams} from "react-router-dom";
import {Button, Table, TableBody, TableCell, TableRow} from "@mui/material";
import Typography from "@mui/material/Typography";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import LanguageIcon from '@mui/icons-material/Language';
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import {AuthContext} from "../../../App";
import {companies} from "../../../rbac-consts";
import Can from "../../can/Can";
import UploadCVButton from "../../buttons/UploadCVButton";

const CompanyContainer = () => {

    const userRole = useContext(AuthContext)

    const [data, setData] = useState([]);
    const id = useParams().id;

    const getData = (id) => {
        axios.get(`/api/companies/` + id)
            .then(response => {
                if (response.status === 200){
                    setData(response.data);
                }
            });
    };

    useEffect(() => {
        getData(id);
    }, []);

    return (
        <main>
            <Link to="/" style={{textDecoration: "none"}}>
                <Button variant="outlined" endIcon={<KeyboardBackspaceIcon/>}>
                    Back to home page
                </Button>
            </Link>
            <Table>
                <TableBody>
                    <TableRow>
                        <TableCell>
                            <Typography variant={"h4"} color={"darkblue"} marginBottom={2}>
                                {data.name}
                            </Typography>
                            <Typography variant={"h6"} marginBottom={2}>
                                <PhoneIcon fontSize="small"/> <a href={"tel:"+data.phone}>{data.phone}</a>
                            </Typography>
                            <Typography variant={"h6"} marginBottom={2}>
                                <LocationOnIcon fontSize="small"/> {data.address}
                            </Typography>
                            <Typography variant={"h6"} marginBottom={2}>
                                <LanguageIcon fontSize="small"/> {data.website}
                            </Typography>
                            <Typography variant={"body1"} marginBottom={2}>
                                {data.description}
                            </Typography>
                        </TableCell>
                        <TableCell align={"right"}>
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
            <Can
                role={userRole}
                perform={companies.USER}
                yes={() => (
                    <UploadCVButton/>
                )}
                no={() => (
                    <Link to="/login">Login to send Resume</Link>
                )}
            />
        </main>)
}


export default CompanyContainer;

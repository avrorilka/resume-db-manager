import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {
    Button,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
} from "@mui/material";
import Card from '@mui/material/Card';
import GetUserInfo from "../../../utils/GetUserInfo";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import CvList from "../../cv/user/CvListContainer";

const UserProfileContainer = () => {

    const [data, setData] = useState([]);

    const getData = () => {
        axios.get(`/api/profile`)
            .then(response => {
                if (response.status === 200) {
                    setData(response.data);
                }
            });

    };

    useEffect(() => {
        getData();
    }, []);


    return (
        <>
            <Card className={"profile-card purple-neon-card"}>
                <div className={"profile-card-header"}>
                    <Avatar sx={{bgcolor: "white", width: 140, height: 140}}
                            src={'https://avatars.dicebear.com/api/identicon/' + GetUserInfo("email") + '.svg'}
                    />
                </div>
                <div className={"profile-card-content"}>
                    <Typography variant={"h1"}>
                        {data.name}
                    </Typography>
                    <Table sx={{width: "40%"}}>
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
                                    Email
                                </TableCell>
                                <TableCell>
                                    {data.email}
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>
                                    Phone
                                </TableCell>
                                <TableCell>
                                    {data.phoneNumber}
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>
                                    <Button href="/profile/update" variant="outlined">
                                        Edit profile
                                    </Button>
                                </TableCell>
                                <TableCell>
                                    <Button href="/profile/password-change" variant="contained">
                                        Change password
                                    </Button>
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </div>
            </Card>
            {data.cvs && <CvList data={data.cvs}/>}
        </>
    );
}


export default UserProfileContainer;

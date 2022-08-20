import React, {useContext, useState} from "react";
import UserLoginContainer from "../../../components/user/user/UserLoginContainer";
import HeaderContainer from "../../../components/navs/HeaderContainer";
import FooterContainer from "../../../components/navs/FooterContainer";
import {Container} from "@mui/material";
import {AuthContext} from "../../../App";
import {useNavigate} from "react-router";
import {useParams} from "react-router-dom";
import Alert from "@mui/material/Alert";
import MessageAfterActionContainer from "../../../components/messsage/MessageAfterActionsContainer";

const UserLoginPage = () => {
    const userRole = useContext(AuthContext)
    return (
        <div>
            <Container maxWidth="lg">
                <HeaderContainer/>
                {!userRole
                    ? <UserLoginContainer/>
                    : <MessageAfterActionContainer message={{
                        title: "Can't log in",
                        severity: 'error',
                        content: "You have to log out first",
                    }
                    }/>
                }
                <FooterContainer/>
            </Container>
        </div>
    );
};

export default UserLoginPage;

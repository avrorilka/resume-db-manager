import React, {useContext} from "react";
import ChangePasswordContainer from "../../../components/user/user/ChangePasswordContainer";
import HeaderContainer from "../../../components/navs/HeaderContainer";
import FooterContainer from "../../../components/navs/FooterContainer";
import {Container} from "@mui/material";
import {AuthContext} from "../../../App";

const ResetPasswordPage = () => {

    return (
        <div>
            <Container maxWidth="lg">
                <HeaderContainer/>
                <ChangePasswordContainer/>
                <FooterContainer/>
            </Container>
        </div>
    )
}

export default ResetPasswordPage;
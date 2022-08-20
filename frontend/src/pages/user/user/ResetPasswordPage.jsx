import React from "react";
import ResetPasswordContainer from "../../../components/user/user/ResetPasswordContainer";
import HeaderContainer from "../../../components/navs/HeaderContainer";
import FooterContainer from "../../../components/navs/FooterContainer";
import {Container} from "@mui/material";

const ResetPasswordPage = () => {
    return (
        <div>
            <Container maxWidth="lg">
                <HeaderContainer/>
                <ResetPasswordContainer/>
                <FooterContainer/>
            </Container>
        </div>);
};

export default ResetPasswordPage;

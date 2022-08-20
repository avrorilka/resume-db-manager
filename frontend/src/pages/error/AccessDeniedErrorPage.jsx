import AccessDeniedErrorComponent from "../../components/error/AccessDeniedErrorComponent";
import HeaderContainer from "../../components/navs/HeaderContainer";
import {Container} from "@mui/material";
import FooterContainer from "../../components/navs/FooterContainer";
import React from "react";

const AccessDeniedErrorPage = () => {
    return (
        <div>
            <Container maxWidth="lg">
                <HeaderContainer/>
                <AccessDeniedErrorComponent/>
                <FooterContainer/>
            </Container>
        </div>
    )
}

export default AccessDeniedErrorPage
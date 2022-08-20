import React from "react";
import {Container} from "@mui/material";
import HeaderContainer from "../../../components/navs/HeaderContainer";
import FooterContainer from "../../../components/navs/FooterContainer";
import CompanyContainer from "../../../components/company/user/CompanyContainer";

const CompanyPage = () => {
    return (
        <div>
            <Container maxWidth="lg">
                <HeaderContainer/>
                <CompanyContainer/>
                <FooterContainer/>
            </Container>
        </div>
    );
};

export default CompanyPage;

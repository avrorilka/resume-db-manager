import React from "react";
import {Container} from "@mui/material";
import HomeContainer from "../../components/home/HomeContainer";
import HeaderContainer from "../../components/navs/HeaderContainer";
import FooterContainer from "../../components/navs/FooterContainer";

const HomePage = () => {
    return (
        <div>
            <Container>
                <HeaderContainer/>
                <HomeContainer/>
                <FooterContainer/>
            </Container>
        </div>);
};

export default HomePage;
import React, {useContext} from "react";
import {Container} from "@mui/material";
import CvShowContainer from "../../../components/cv/user/CvShowContainer";
import HeaderContainer from "../../../components/navs/HeaderContainer";
import FooterContainer from "../../../components/navs/FooterContainer";
import {AuthContext} from "../../../App";
import {cvs} from "../../../rbac-consts";
import Can from "../../../components/can/Can";

const CvShowPage = () => {

    const userRole = useContext(AuthContext)
    return (
        <Can
            role={userRole}
            perform={cvs.USER}
            yes={() => (
                <div>
                    <Container maxWidth="lg">
                        <HeaderContainer/>
                            <CvShowContainer/>
                        <FooterContainer/>
                    </Container>
                </div>)
            }
        />
    )
};

export default CvShowPage;
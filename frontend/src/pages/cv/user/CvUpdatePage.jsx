import React, {useContext} from "react";
import {Container} from "@mui/material";
import CvUpdateContainer from "../../../components/cv/user/CvUpdateContainer";
import HeaderContainer from "../../../components/navs/HeaderContainer";
import FooterContainer from "../../../components/navs/FooterContainer";
import {AuthContext} from "../../../App";
import {cvs} from "../../../rbac-consts";
import Can from "../../../components/can/Can";

const CvUpdatePage = () => {

    const userRole = useContext(AuthContext)
    return (
        <Can
            role={userRole}
            perform={cvs.USER}
            yes={() => (
                <div>
                    <Container maxWidth="lg">
                        <HeaderContainer/>
                            <CvUpdateContainer/>
                        <FooterContainer/>
                    </Container>
                </div>)
            }
        />
    )
};

export default CvUpdatePage;
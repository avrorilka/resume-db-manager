import React, {useContext} from "react";
import {Container} from "@mui/material";
import CvUploadContainer from "../../../components/cv/user/CvUploadContainer";
import HeaderContainer from "../../../components/navs/HeaderContainer";
import FooterContainer from "../../../components/navs/FooterContainer";
import {AuthContext} from "../../../App";
import {cvs} from "../../../rbac-consts";
import Can from "../../../components/can/Can";

const CvUploadPage = () => {

    const userRole = useContext(AuthContext)
    return (
        <Can
            role={userRole}
            perform={cvs.USER}
            yes={() => (
                <div>
                    <Container maxWidth="lg">
                        <HeaderContainer/>
                        <CvUploadContainer/>
                        <FooterContainer/>
                    </Container>
                </div>)
            }
        />
    )
};

export default CvUploadPage;
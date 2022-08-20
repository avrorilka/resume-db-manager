import React, {useContext} from "react";
import PanelCvShowContainer from "../../../components/cv/admin/PanelCvShowContainer";
import PersistentDrawerLeft from "../../../components/sidebar/PanelDrawerContainer";
import {Container} from "@mui/material";
import {AuthContext} from "../../../App";
import {cvs} from "../../../rbac-consts";
import Can from "../../../components/can/Can";
import AccessDeniedErrorPage from "../../error/AccessDeniedErrorPage";

const PanelCvShowPage = () => {

    const userRole = useContext(AuthContext)
    return (
        <Can
            role={userRole}
            perform={cvs.ADMIN}
            yes={() => (
                <div>
                    <PersistentDrawerLeft/>
                    <Container maxWidth="lg">
                        <PanelCvShowContainer/>
                    </Container>
                </div>)
            }
            no={() => (<AccessDeniedErrorPage/>)}
        />
    )
};

export default PanelCvShowPage;
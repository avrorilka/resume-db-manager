import React, {useContext} from "react";
import PanelCvContainer from "../../../components/cv/admin/PanelCvContainer";
import PersistentDrawerLeft from "../../../components/sidebar/PanelDrawerContainer";
import {Container} from "@mui/material";
import {AuthContext} from "../../../App";
import {cvs} from "../../../rbac-consts";
import AccessDeniedErrorPage from "../../error/AccessDeniedErrorPage";
import Can from "../../../components/can/Can";

const PanelCvsPage = () => {

    const userRole = useContext(AuthContext)
    return (
        <Can
            role={userRole}
            perform={cvs.ADMIN}
            yes={() => (
                <div>
                    <PersistentDrawerLeft/>
                    <Container maxWidth="lg">
                        <PanelCvContainer/>
                    </Container>
                </div>)
            }
            no={() => (<AccessDeniedErrorPage/>)}
        />
    )
};

export default PanelCvsPage;
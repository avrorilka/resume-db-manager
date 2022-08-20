import PanelCompanyShowContainer from "../../../components/company/admin/PanelCompanyShowContainer";
import React, {useContext} from "react";
import PersistentDrawerLeft from "../../../components/sidebar/PanelDrawerContainer";
import {Container} from "@mui/material";
import {AuthContext} from "../../../App";
import {companies} from "../../../rbac-consts";
import Can from "../../../components/can/Can";
import AccessDeniedErrorPage from "../../error/AccessDeniedErrorPage";

const PanelCompanyShowPage = () => {
    const userRole = useContext(AuthContext)
    return (
        <Can
            role={userRole}
            perform={companies.ADMIN}
            yes={() => (
                <div>
                    <PersistentDrawerLeft/>
                    <Container maxWidth="lg">
                        <PanelCompanyShowContainer/>
                    </Container>
                </div>)
            }
            no={()=>(<AccessDeniedErrorPage/>)}
        />
    );
};

export default PanelCompanyShowPage;

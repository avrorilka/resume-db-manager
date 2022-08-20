import PanelCompanyUpdateContainer from "../../../components/company/admin/PanelCompanyUpdateContainer";
import React, {useContext} from "react";
import PersistentDrawerLeft from "../../../components/sidebar/PanelDrawerContainer";
import {Container} from "@mui/material";
import {AuthContext} from "../../../App";
import {companies} from "../../../rbac-consts";
import Can from "../../../components/can/Can";
import AccessDeniedErrorPage from "../../error/AccessDeniedErrorPage";

const PanelCompanyUpdatePage = () => {
    const userRole = useContext(AuthContext)
    return (
        <Can
            role={userRole}
            perform={companies.ADMIN}
            yes={() => (
                <div>
                    <PersistentDrawerLeft/>
                    <Container maxWidth="lg">
                        <PanelCompanyUpdateContainer/>
                    </Container>
                </div>)
            }
            no={()=>(<AccessDeniedErrorPage/>)}
        />
    );
};

export default PanelCompanyUpdatePage;

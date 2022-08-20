import React, {useContext} from "react";
import PanelCompaniesContainer from "../../../components/company/admin/PanelCompaniesContainer";
import PersistentDrawerLeft from "../../../components/sidebar/PanelDrawerContainer";
import {Container} from "@mui/material";
import {AuthContext} from "../../../App"
import Can from "../../../components/can/Can";
import {companies} from "../../../rbac-consts";
import AccessDeniedErrorPage from "../../error/AccessDeniedErrorPage";

const PanelCompaniesPage = () => {

    const userRole = useContext(AuthContext)
    return (
        <Can
            role={userRole}
            perform={companies.ADMIN}
            yes={() => (
                <div>
                    <PersistentDrawerLeft/>
                    <Container maxWidth="lg">
                        <PanelCompaniesContainer/>
                    </Container>
                </div>)
            }
            no={()=>(<AccessDeniedErrorPage/>)}
        />
    );
};

export default PanelCompaniesPage;
import PanelCompanyCreateContainer from "../../../components/company/admin/PanelCompanyCreateContainer";
import React, {useContext} from "react";
import PersistentDrawerLeft from "../../../components/sidebar/PanelDrawerContainer";
import {Container} from "@mui/material";
import {companies} from "../../../rbac-consts";
import Can from "../../../components/can/Can";
import {AuthContext} from "../../../App";
import AccessDeniedErrorPage from "../../error/AccessDeniedErrorPage";

const PanelCompanyCreatePage = () => {
    const userRole = useContext(AuthContext)
    return (
        <Can
            role={userRole}
            perform={companies.ADMIN}
            yes={() => (
                <div>
                    <PersistentDrawerLeft/>
                    <Container maxWidth="lg">
                        <PanelCompanyCreateContainer/>
                    </Container>
                </div>)
            }
            no={()=>(<AccessDeniedErrorPage/>)}
        />
    )
};

export default PanelCompanyCreatePage;

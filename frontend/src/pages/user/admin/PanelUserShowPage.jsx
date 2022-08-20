import React, {useContext} from "react";
import PanelUserShowContainer from "../../../components/user/admin/PanelUserShowContainer";
import PersistentDrawerLeft from "../../../components/sidebar/PanelDrawerContainer";
import {Container} from "@mui/material";
import {AuthContext} from "../../../App";
import {users} from "../../../rbac-consts";
import Can from "../../../components/can/Can";

const PanelUserShowPage = () => {

    const userRole = useContext(AuthContext)
    return (
        <Can
            role={userRole}
            perform={users.ADMIN}
            yes={() => (
                <div>
                    <PersistentDrawerLeft/>
                    <Container maxWidth="lg">
                        <PanelUserShowContainer/>
                    </Container>
                </div>)
            }
        />
    )
};

export default PanelUserShowPage;

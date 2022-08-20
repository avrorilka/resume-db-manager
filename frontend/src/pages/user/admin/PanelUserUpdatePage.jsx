import React, {useContext} from "react";
import PanelUserUpdateContainer from "../../../components/user/admin/PanelUserUpdateContainer";
import PersistentDrawerLeft from "../../../components/sidebar/PanelDrawerContainer";
import {Container} from "@mui/material";
import {AuthContext} from "../../../App";
import {users} from "../../../rbac-consts";
import Can from "../../../components/can/Can";

const PanelUserUpdatePage = () => {

    const userRole = useContext(AuthContext)
    return (
        <Can
            role={userRole}
            perform={users.ADMIN}
            yes={() => (
                <div>
                    <PersistentDrawerLeft/>
                    <Container maxWidth="lg">
                        <PanelUserUpdateContainer/>
                    </Container>
                </div>)
            }
        />
    );
};

export default PanelUserUpdatePage;

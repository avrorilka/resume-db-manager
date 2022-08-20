import React, {useContext} from "react";
import PanelUsersContainer from "../../../components/user/admin/PanelUsersContainer";
import PersistentDrawerLeft from "../../../components/sidebar/PanelDrawerContainer";
import {Container} from "@mui/material";
import {AuthContext} from "../../../App";
import {users} from "../../../rbac-consts";
import Can from "../../../components/can/Can";

const PanelUsersPage = () => {

    const userRole = useContext(AuthContext)
    return (
        <Can
            role={userRole}
            perform={users.ADMIN}
            yes={() => (
                <div>
                    <PersistentDrawerLeft/>
                    <Container maxWidth="lg">
                        <PanelUsersContainer/>
                    </Container>
                </div>)
            }
        />
    );
};

export default PanelUsersPage;

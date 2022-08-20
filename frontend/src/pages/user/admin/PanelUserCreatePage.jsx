import React, {useContext} from "react";
import PanelUserCreateContainer from "../../../components/user/admin/PanelUserCreateContainer";
import PersistentDrawerLeft from "../../../components/sidebar/PanelDrawerContainer";
import {Container} from "@mui/material";
import {AuthContext} from "../../../App";
import {users} from "../../../rbac-consts";
import Can from "../../../components/can/Can";

const PanelUserCreatePage = () => {

    const userRole = useContext(AuthContext)
    return (
        <Can
            role={userRole}
            perform={users.ADMIN}
            yes={() => (
                <div>
                    <PersistentDrawerLeft/>
                    <Container maxWidth="lg">
                        <PanelUserCreateContainer/>
                    </Container>
                </div>)
            }
        />
    );
};

export default PanelUserCreatePage;

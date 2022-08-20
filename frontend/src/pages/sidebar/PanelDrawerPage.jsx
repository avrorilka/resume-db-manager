import React, {useContext} from "react";
import PersistentDrawerLeft from "../../components/sidebar/PanelDrawerContainer";
import {panel} from "../../rbac-consts"
import {AuthContext} from "../../App";
import Can from "../../components/can/Can";
import AccessDeniedErrorPage from "../error/AccessDeniedErrorPage";

export const PanelDrawerPage = () => {

    const userRole = useContext(AuthContext)
    console.log(userRole)
    return (
        <Can
            role={userRole}
            perform={panel.ADMIN}
            yes={() => (
                <div>
                    <PersistentDrawerLeft/>
                </div>
            )}
            no={() => (<AccessDeniedErrorPage/>)}
        />
    )
}
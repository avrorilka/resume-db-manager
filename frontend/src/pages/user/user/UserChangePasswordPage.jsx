import React, {useContext} from "react";
import UserChangePasswordContainer from "../../../components/user/user/UserChangePasswordContainer";
import HeaderContainer from "../../../components/navs/HeaderContainer";
import FooterContainer from "../../../components/navs/FooterContainer";
import {Container} from "@mui/material";
import {AuthContext} from "../../../App";
import {users} from "../../../rbac-consts";
import Can from "../../../components/can/Can";
import AccessDeniedErrorPage from "../../error/AccessDeniedErrorPage";

const UserChangePasswordPage = () => {

    const userRole = useContext(AuthContext)
    return (
        <Can
            role={userRole}
            perform={users.USER}
            yes={() => (
                <div>
                    <Container maxWidth="lg">
                        <HeaderContainer/>
                        <UserChangePasswordContainer/>
                        <FooterContainer/>
                    </Container>
                </div>)
            }
            no={() => (<AccessDeniedErrorPage/>)}
        />
    )
};

export default UserChangePasswordPage;

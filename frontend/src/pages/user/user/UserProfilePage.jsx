import React, {useContext} from "react";
import HeaderContainer from "../../../components/navs/HeaderContainer";
import UserProfileContainer from "../../../components/user/user/UserProfileContainer";
import FooterContainer from "../../../components/navs/FooterContainer";
import {Container} from "@mui/material";
import {AuthContext} from "../../../App";
import {users} from "../../../rbac-consts";
import AccessDeniedErrorPage from "../../error/AccessDeniedErrorPage";
import Can from "../../../components/can/Can";

const UserProfilePage = () => {

    const userRole = useContext(AuthContext)
    return (
        <Can
            role={userRole}
            perform={users.USER}
            yes={() => (
                <div>
                    <Container maxWidth="lg">
                        <HeaderContainer/>
                        <UserProfileContainer/>
                        <FooterContainer/>
                    </Container>
                </div>)
            }
            no={() => (<AccessDeniedErrorPage/>)}
        />
    )
};

export default UserProfilePage;

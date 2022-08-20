import React, {useContext} from "react";
import RegistrationContainer from "../../../components/user/user/RegistrationContainer";
import HeaderContainer from "../../../components/navs/HeaderContainer";
import FooterContainer from "../../../components/navs/FooterContainer";
import {Container} from "@mui/material";
import UserLoginContainer from "../../../components/user/user/UserLoginContainer";
import Alert from "@mui/material/Alert";
import {AuthContext} from "../../../App";
import MessageAfterActionContainer from "../../../components/messsage/MessageAfterActionsContainer";


const RegistrationPage = () => {
    const userRole = useContext(AuthContext)
    return (
        <div>
            <Container maxWidth="lg">
                <HeaderContainer/>
                {!userRole
                    ? <RegistrationContainer/>
                    : <MessageAfterActionContainer message={{
                        title: "Can't sign up",
                        severity: 'error',
                        content: "You have to log out first",
                    }
                    }/>
                }
                <FooterContainer/>
            </Container>
        </div>);
};

export default RegistrationPage;

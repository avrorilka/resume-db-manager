import Button from "@mui/material/Button";
import React from "react";

const LoginButton = () => {
    return(
        <>
            <Button href="/login" color="inherit">Login</Button>
            <Button href="/registration" color="inherit">Sign up</Button>
        </>
    )
}

export default LoginButton
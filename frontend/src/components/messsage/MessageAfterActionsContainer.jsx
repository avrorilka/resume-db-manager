import {Alert, AlertTitle, Container} from "@mui/material";
import Typography from "@mui/material/Typography";
import WarningIcon from '@mui/icons-material/Warning';
import Button from "@mui/material/Button";
import React from "react";

const MessageAfterActionContainer = (message) => {
    return (
        <Container>
            <Container maxWidth="xl">
                <Alert severity={message.message.severity}>
                    <AlertTitle>{message.message.title}</AlertTitle>
                    {message.message.content}
                </Alert>
                <br/>
                {message.message.btn &&
                <Button href={message.message.btn.href} variant="contained">{message.message.btn.text}</Button>}
            </Container>
        </Container>
    )
}

export default MessageAfterActionContainer;
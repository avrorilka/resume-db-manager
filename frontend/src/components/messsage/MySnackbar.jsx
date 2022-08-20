import React, {useState} from 'react';
import {Alert, Snackbar} from "@mui/material";

const MySnackbar = (data) => {
    const [open, setOpen] = useState(true);

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    return (
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity={data.data.severity} sx={{ width: '100%' }}>
                {data.data.text}
            </Alert>
        </Snackbar>);
};

export default MySnackbar;

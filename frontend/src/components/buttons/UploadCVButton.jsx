import {Link} from "react-router-dom";
import {Button} from "@mui/material";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import React from "react";

const UploadCVButton = () => {
    return (
        <Link to="upload" style={{textDecoration: "none"}}>
            <Button variant="contained" endIcon={<FileUploadIcon/>}>
                Upload resume
            </Button>
        </Link>
    )
}

export default UploadCVButton
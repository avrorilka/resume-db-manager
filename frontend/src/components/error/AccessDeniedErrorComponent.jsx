import {Container} from "@mui/material";
import Typography from "@mui/material/Typography";
import WarningIcon from '@mui/icons-material/Warning';

const AccessDeniedErrorComponent = () => {
    return (
        <Container>
            <Container maxWidth="sm">
                <Typography variant="h1"><WarningIcon color={"error"} fontSize={"large"}/>ERROR</Typography>
                <Typography variant="h5">ACCESS DENIED</Typography>
            </Container>
        </Container>
    )
}

export default AccessDeniedErrorComponent
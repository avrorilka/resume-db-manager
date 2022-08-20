import {createTheme} from "@mui/material";

export const theme = createTheme({
        palette: {
            type: 'light',
            primary: {
                main: '#7888fe',
            },
            secondary: {
                main: '#2af498',
            },
            success: {
                main: '#78cbfe',
            },
            info: {
                main: '#ee78fe',
            },
            warning: {
                main: '#feee78',
            },
            error: {
                main: '#fe7888',
            },
        },
        overrides: {
            MuiSwitch: {
                root: {
                    width: 42,
                    height: 26,
                    padding: 0,
                    margin: 8,
                },
                switchBase: {
                    padding: 1,
                    '&$checked, &$colorPrimary$checked, &$colorSecondary$checked': {
                        transform: 'translateX(16px)',
                        color: '#fff',
                        '& + $track': {
                            opacity: 1,
                            border: 'none',
                        },
                    },
                },
                thumb: {
                    width: 24,
                    height: 24,
                },
                track: {
                    borderRadius: 13,
                    border: '1px solid #bdbdbd',
                    backgroundColor: '#fafafa',
                    opacity: 1,
                    transition: 'background-color 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,border 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
                },
            },
        },
        props: {
            MuiAppBar: {
                color: 'transparent',
            },
        },
    }
)
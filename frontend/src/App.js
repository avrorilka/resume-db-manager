import React, {createContext, Suspense} from 'react'
import {
    Route, Routes,
} from 'react-router-dom';
import './App.css';
import routes from "./routes";
import GetUserInfo from "./utils/GetUserInfo";
import Cookies from "js-cookie"
import {ThemeProvider} from "@mui/material";
import {theme} from "./themes/DefaultTheme";


export const AuthContext = createContext()
let token = GetUserInfo("role");

export function clearUserData() {
    Cookies.remove("BEARER")
}

function App() {

    return (
        <ThemeProvider theme={theme}>
            <AuthContext.Provider value={token}>
                <Suspense fallback="loading...">
                    <Routes>
                        {routes.map(({path, element}) => (<Route key={path} path={path} element={element}></Route>))}
                    </Routes>
                </Suspense>
            </AuthContext.Provider>
        </ThemeProvider>

    );
}


export default App;

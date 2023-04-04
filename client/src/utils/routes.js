import { MAIN_ROUTE, LOGIN_ROUTE, REGISTRATION_ROUTE } from "./consts";
import AuthPage from "../pages/AuthPage/AuthPage";
import MainPage from "../pages/MainPage/MainPage";

export const authRoutes = []

export const publicRoutes = [
    {
        path: MAIN_ROUTE,
        Component: MainPage
    },
    { 
        path: LOGIN_ROUTE,
        Component: AuthPage
    },
    {
        path: REGISTRATION_ROUTE,
        Component: AuthPage
    }
]
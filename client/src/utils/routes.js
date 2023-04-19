import { MAIN_ROUTE, LOGIN_ROUTE, REGISTRATION_ROUTE, ALGORITHM_ROUTE, COMPILER_ROUTE } from "./consts";
import AuthPage from "../pages/AuthPage/AuthPage";
import MainPage from "../pages/MainPage/MainPage";
import AlgorithmPage from "../pages/AlgorithmPage/AlgorithmPage";
import CompilerPage from "../pages/CompilerPage/CompilerPage";

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
    },
    {
        path: ALGORITHM_ROUTE + '/:id',
        Component: AlgorithmPage
    },
    {
        path: COMPILER_ROUTE + '/:id',
        Component: CompilerPage
    },
]
import React, { useContext } from "react";
import { Routes, Route } from "react-router-dom";
import { authRoutes, publicRoutes } from "../utils/routes";
import NotFoundPage from "../pages/NotFoundPage/NotFoundPage";
import { Context } from "../main";


const AppRouter = () => {
    const {user} = useContext(Context);

    return (
        <Routes>
            {user.isAuth && authRoutes.map(({path, Component})=>
                <Route key={path} path={path} element={<Component/>} exact/>
            )}
            {publicRoutes.map(({path, Component})=>
                <Route key={path} path={path} element={<Component/>} exact/>
            )}
            <Route path="*" element={<NotFoundPage/>} />
        </Routes>
    )
}

export default AppRouter;
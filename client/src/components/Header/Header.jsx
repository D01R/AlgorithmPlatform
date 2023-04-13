import React, { useContext } from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { Context } from "../../main";
import { LOGIN_ROUTE, MAIN_ROUTE } from "../../utils/consts";
import { observer } from "mobx-react-lite";

const Header = observer(() => {
    const {user} = useContext(Context);

    const logOut = () => {
        user.setIsAuth(false);
        user.setUser({});
    }

    return (
        <Navbar collapseOnSelect expand="md">
            <Container>
            <NavLink className="header_logo" to={MAIN_ROUTE}>
                Логотип
            </NavLink>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="me-auto"></Nav>
                <Nav>
                <NavLink className="header_link" to={MAIN_ROUTE}>
                    Home
                </NavLink>
                <NavLink className="header_link" to="/">
                    My cabinet
                </NavLink>
                {user.isAuth? 
                    <NavLink className="header_link_exit" to="/" onClick={() => logOut()}>
                        Выход
                    </NavLink>
                    :
                    <NavLink className="header_link_exit" to={LOGIN_ROUTE}>
                        Войти
                    </NavLink>
                }
                </Nav>
            </Navbar.Collapse>
            </Container>
        </Navbar>
    );
})

export default Header;
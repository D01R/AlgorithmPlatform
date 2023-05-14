import React, { useContext } from "react";
import { Navbar, Nav, Container, Image } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { Context } from "../../main";
import { LOGIN_ROUTE, MAIN_ROUTE } from "../../utils/consts";
import { observer } from "mobx-react-lite";
import './Header.scss';
import logo from '../../assets/pixeden.png';

const Header = observer(() => {
    const {user} = useContext(Context);

    const logOut = () => {
        localStorage.removeItem('token');
        user.setIsAuth(false);
        user.setUser({});
    }

    return (
        <Navbar collapseOnSelect expand="md" className="navbar">
            <Container className="navbar__container">
            <NavLink className="header__logo-link" to={MAIN_ROUTE}>
                <Image src={logo} className="header__logo"/>
                <p className="header__title">Algorithm Platform</p>
            </NavLink>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="me-auto"></Nav>
                <Nav>
                <NavLink className="header__link" to="/">
                    Кабинет
                </NavLink>
                {user.isAuth? 
                    <NavLink className="header__link_auth" to="/" onClick={() => logOut()}>
                        Выход
                    </NavLink>
                    :
                    <NavLink className="header__link_auth" to={LOGIN_ROUTE}>
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
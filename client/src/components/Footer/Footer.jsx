import React from "react";
import { Container, Image } from "react-bootstrap";
import vk_logo from "../../assets/vk.png";
import instagram_logo from "../../assets/instagram.png";
import "./Footer.scss";

const Footer = () => {
    return(
        <footer className="footer">
        <Container className="footer_container">
            <p className="footer__website">Algorithm Platform</p>
            <div className="footer__contact_container">
                <div className="footer__contact_item">
                    <Image src={instagram_logo} className="footer__contact_icon"/>
                    <p className="footer__contact_title">Instagram</p>
                </div>
                <div className="footer__contact_item">
                    <Image src={vk_logo} className="footer__contact_icon"/>
                    <p className="footer__contact_title">ВКонтакте</p>
                </div>
            </div>
        </Container>
        </footer>
    )
}

export default Footer;
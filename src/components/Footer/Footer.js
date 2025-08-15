import React from "react";
import { FooterContainer, CompanyName, Logo, LogoText, SocialLinks, Icon } from "./footerStyle";
import logo from "../../img/logoCube2.png";
import { FaTelegramPlane, FaFacebookF, FaInstagram } from "react-icons/fa";


const Footer = () => {
    return (
        <FooterContainer>
            <strong>&copy; 2025 Au Solutions.<br /> All rights reserved.</strong>
            <CompanyName>
                <Logo src={logo} alt="logo" />
                <LogoText> Make It Easy </LogoText>
            </CompanyName>

            <SocialLinks>
                <Icon href="#" target="_blank" rel="noopener noreferrer">
                    <FaTelegramPlane />
                </Icon>
                <Icon href="#" target="_blank" rel="noopener noreferrer">
                    <FaFacebookF />
                </Icon>
                <Icon href="#" target="_blank" rel="noopener noreferrer">
                    <FaInstagram />
                </Icon>
            </SocialLinks>
        </FooterContainer>
    );
};

export default Footer;

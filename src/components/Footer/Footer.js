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
                <Icon href="https://t.me/smarttender_official" target="_blank" rel="noopener noreferrer" alt="Smarttender Telegram">
                    <FaTelegramPlane />
                </Icon>
                <Icon href="https://www.facebook.com/smarttenders/" target="_blank" rel="noopener noreferrer" alt="Smarttender Facebook">
                    <FaFacebookF />
                </Icon>
                <Icon href="https://www.instagram.com/smarttender.biz?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" target="_blank" rel="noopener noreferrer" alt="Smarttender Instagram">
                    <FaInstagram />
                </Icon>
            </SocialLinks>
        </FooterContainer>
    );
};

export default Footer;

import React from "react";
import {Container, Img, LogoText} from "./headerStyle";
import logoCube2 from "../../img/logoCube2.png";

const Header = () => {
    return (
        <Container >
            <Img
                src={logoCube2}
                alt="Логотип"
            />
            <LogoText>Make It Easy</LogoText>
        </Container>
    );
};

export default Header;

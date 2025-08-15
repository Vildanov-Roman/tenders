import styled from "styled-components";

export const FooterContainer = styled.footer`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  background-color: transparent;
  color: #DAA520;
  
  
`;

export const CompanyName = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 18px;
  font-weight: bold;
`;

export const Logo = styled.img`
  width: 100px;
  height: 100px;
`;

export const LogoText= styled.h1`
  color: transparent;
  -webkit-background-clip: text; /* Edge, Chrome */
  background-clip: text; /* Safari, FF */
  background-image:
          url(https://textur.gas-kvas.com/uploads/posts/2024-10/textur-gas-kvas-com-rgkz-p-teksturi-zolotoe-siyanie-1.jpg);
  background-size: contain;
  font-size: 32px;
  font-weight: bold;
  font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, Courier, monospace;
  margin: 0;
  text-shadow: 0 0 40px #ffae00, 0 0 50px #ffae00;

`;

export const SocialLinks = styled.div`
  display: flex;
  gap: 15px;
`;

export const Icon = styled.a`
  color: #DAA520;
  font-size: 20px;
  transition: transform 0.3s ease, color 0.3s ease;

  &:hover {
    color: #ffd700;
    transform: scale(1.2);
  }
`;

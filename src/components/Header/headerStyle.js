import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: start;
  color: darkgoldenrod;
`;

export const Img = styled.img`
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
  font-size: 50px;
  font-weight: bold;
  font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, Courier, monospace;
  margin-left: 10px;
  text-shadow: 0 0 40px #ffae00, 0 0 50px #ffae00;

`;

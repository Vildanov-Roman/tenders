import styled from 'styled-components';

export const ErrorOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(218, 165, 32, 0.2);
  backdrop-filter: blur(1px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

export const ErrorContent = styled.div`
    background: #000;
    padding: 20px;
    border-radius: 10px;
    text-align: center;
  box-shadow:
          0 5px 15px rgba(218, 165, 32, 0.5), /* Темное золото */
          inset 0 2px 5px rgba(255, 215, 0, 0.6); /* Внутреннее сияние */
`;

export const Button = styled.button`
    margin-top: 10px;
    padding: 10px 20px;
    border: none;
    background: #DAA520;
    border-radius: 5px;
    cursor: pointer;

  box-shadow: 0 0 40px 40px #DAA520 inset, 0 0 0 0 #DAA520;
  color: #000;
  transition: .15s ease-in-out;

  &:hover {
    box-shadow: 0 0 10px 0 #DAA520 inset, 0 0 10px 4px #DAA520;
    color: #DAA520;
    background: #282c34;
  }
`;

import styled from 'styled-components';

export const Card = styled.div`
  color: #DAA520;
  width: 300px;
  height: 200px;
  border: none;
  padding: 20px;
  margin: 10px;
  cursor: pointer;
  box-shadow:
          0 5px 15px rgba(218, 165, 32, 0.5), /* Темное золото */
          inset 0 2px 5px rgba(255, 215, 0, 0.6); /* Внутреннее сияние */
  backdrop-filter: blur(20px);
  border-radius: 10px;
  transition: box-shadow 2.5s ease-in-out;

  &:hover {
    box-shadow: 0 5px 15px 0 #DAA520 inset, 0 0 10px 4px #DAA520;
    transform: translateY(5px);
  }
`;
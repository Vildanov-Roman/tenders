import styled from 'styled-components';

export const Card = styled.div`
  width: 300px;
  height: 200px;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 20px;
  margin: 10px;
  cursor: pointer;
  box-shadow: 0 5px 5px 0 rgba(0, 0, 0, 0.5);
  transition: transform 0.2s;

  &:hover {
    transform: scale(1.09);
  }
`;
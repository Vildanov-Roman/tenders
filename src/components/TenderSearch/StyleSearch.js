import styled from 'styled-components';

export const FormContainer = styled.div`
  max-width: 600px;
  margin: 20px auto;
  padding: 20px;
  box-shadow: 0 5px 5px 0 rgba(0, 0, 0, 0.5);
`;

export const Input = styled.input`
  width: 70%;
  padding: 8px;
  margin-right: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

export const Button = styled.button`
  text-decoration: none;
  display: inline-block;
  padding: 10px;
  border-radius: 10px;
  box-shadow: 0 0 40px 40px #F137A6 inset, 0 0 0 0 #F137A6;
  color: white;
  transition: .15s ease-in-out;

  &:hover {
    box-shadow: 0 0 10px 0 #F137A6 inset, 0 0 10px 4px #F137A6;
    color: #F137A6;
  }
`;
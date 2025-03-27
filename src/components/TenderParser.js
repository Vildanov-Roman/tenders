import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchTenderData } from '../features/tender/tenderActions';
import styled from 'styled-components';

const FormContainer = styled.div`
  max-width: 600px;
  margin: 20px auto;
  padding: 20px;
  box-shadow: 0 5px 5px 0 rgba(0, 0, 0, 0.5);
`;

const Input = styled.input`
  width: 70%;
  padding: 8px;
  margin-right: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const Button = styled.button`
  padding: 8px 16px;
  background: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  box-shadow: 0 5px 10px 0 rgba(0, 0, 0, 0.5);
  
  &:hover {
    background: #0056b3;
  }
`;

const TenderParser = () => {
    const [inputId, setInputId] = useState('');
    const dispatch = useDispatch();

    const handleSubmit = () => {
        dispatch(fetchTenderData(inputId));
        setInputId('');
    };

    return (
        <FormContainer>
            <h2>Введите ID тендера</h2>
            <div>
                <Input
                    value={inputId}
                    onChange={(e) => setInputId(e.target.value)}
                    placeholder="Enter Tender ID"
                />
                <Button onClick={handleSubmit}>
                    Сформировать
                </Button>
            </div>
        </FormContainer>
    );
};

export default TenderParser;
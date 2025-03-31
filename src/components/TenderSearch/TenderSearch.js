import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchTenderData } from '../../features/tender/tenderActions';
import { FormContainer, Input, Button } from'./StyleSearch';


const TenderSearch = () => {
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

export default TenderSearch;
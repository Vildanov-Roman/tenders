import React from 'react';
import { useSelector } from 'react-redux';
import TenderParser from './components/TenderParser';
import TenderList from './components/TenderList';
import styled from 'styled-components';

const AppContainer = styled.div`
  padding: 20px;
  font-family: Arial, sans-serif;
`;

const App = () => {
    const tenders = useSelector(state => state.tender.tenders);

    return (
        <AppContainer>
            <TenderParser />
            {tenders.length > 0 && <TenderList tenders={tenders} />}
        </AppContainer>
    );
};

export default App;
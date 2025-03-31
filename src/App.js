import React from 'react';
import { useSelector } from 'react-redux';
import TenderSearch from './components/TenderSearch/TenderSearch';
import TenderList from './components/TenderList/TenderList';
import styled from 'styled-components';

const AppContainer = styled.div`
  padding: 20px;
  font-family: Arial, sans-serif;
`;

const App = () => {
    const tenders = useSelector(state => state.tender.tenders);

    return (
        <AppContainer>
            <TenderSearch />
            {tenders.length > 0 && <TenderList tenders={tenders} />}
        </AppContainer>
    );
};

export default App;
import React from 'react';
import TenderSearch from './components/TenderSearch/TenderSearch';
import TenderList from './components/TenderList/TenderList';
import styled from 'styled-components';
import {ToastContainer} from "react-toastify";

const AppContainer = styled.div`
  padding: 20px;
  font-family: Arial, sans-serif;
  
`;

const App = () => {

    return (
        <AppContainer>
            <TenderSearch />
            <TenderList />
            <ToastContainer position="top-right" autoClose={2000} />
        </AppContainer>
    );
};

export default App;
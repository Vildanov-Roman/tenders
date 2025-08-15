import React from 'react';
import TenderSearch from './components/TenderSearch/TenderSearch';
import TenderList from './components/TenderList/TenderList';
import styled from 'styled-components';
import {ToastContainer} from "react-toastify";
import Header from "./components/Header/header";
import Footer from "./components/Footer/Footer";

const AppContainer = styled.div`
  padding: 20px;
  font-family: Arial, sans-serif;
  
`;

const App = () => {

    return (
        <AppContainer>
            <Header/>
            <TenderSearch />
            <TenderList />
            <ToastContainer position="top-right" autoClose={2000} />
            <Footer/>
        </AppContainer>
    );
};

export default App;
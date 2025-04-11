
import { configureStore } from '@reduxjs/toolkit';
import tenderReducer from '../features/tender/tenderSlice';

const store = configureStore({
    reducer: {
        tender: tenderReducer
    }
});

export default store;

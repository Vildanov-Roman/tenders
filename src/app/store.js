// src/app/store.js
import { configureStore } from '@reduxjs/toolkit';
import tenderReducer from '../features/tender/tenderSlice';

export default configureStore({
    reducer: {
        tender: tenderReducer
    }
});
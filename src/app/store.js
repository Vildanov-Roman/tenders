import { configureStore } from '@reduxjs/toolkit';
import tenderReducer from '../features/tender/tenderSlice';
import archivedTenderReducer from '../features/tender/archivedTenderSlice';

export const store = configureStore({
    reducer: {
        tender: tenderReducer,
        archivedTender: archivedTenderReducer
    }
});

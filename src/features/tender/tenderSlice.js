// tenderSlice.js
import { createSlice } from '@reduxjs/toolkit';

const tenderSlice = createSlice({
    name: 'tender',
    initialState: {
        tenders: [],
        status: 'idle',
        error: null
    },
    reducers: {
        setTenders: (state, action) => {
            state.tenders = action.payload;  // Сохраняем все тендеры в state
        },
        addTender: (state, action) => {
            const exists = state.tenders.some(tender => tender.TenderId === action.payload.TenderId);
            if (!exists) {
                state.tenders.push(action.payload);
            }
        },
        removeTender: (state, action) => {
            state.tenders = state.tenders.filter(tender => tender.TenderId !== action.payload);
        },
        setStatus: (state, action) => {
            state.status = action.payload;
        },
        setError: (state, action) => {
            state.error = action.payload;
        }
    }
});

export const { setTenders, addTender, removeTender, setStatus, setError } = tenderSlice.actions;
export default tenderSlice.reducer;

import { createSlice } from '@reduxjs/toolkit';

const loadFromLocalStorage = () => {
    return JSON.parse(localStorage.getItem('tenders')) || [];
};

const tenderSlice = createSlice({
    name: 'tender',
    initialState: {
        tenders: loadFromLocalStorage(),
        status: 'idle',
        error: null
    },
    reducers: {
        addTender: (state, action) => {
            const exists = state.tenders.some(t => t.TenderId === action.payload.TenderId);
            if (!exists) {
                state.tenders.push(action.payload);
                localStorage.setItem('tenders', JSON.stringify(state.tenders));
            }
        },
        removeTender: (state, action) => {
            state.tenders = state.tenders.filter(t => t.TenderId !== action.payload);
            localStorage.setItem('tenders', JSON.stringify(state.tenders));
        },
        updateTender: (state, action) => {
            const index = state.tenders.findIndex(t => t.TenderId === action.payload.TenderId);
            if (index !== -1) {
                state.tenders[index] = action.payload;
                localStorage.setItem('tenders', JSON.stringify(state.tenders));
            }
        },
        setStatus: (state, action) => {
            state.status = action.payload;
        },
        setError: (state, action) => {
            state.error = action.payload;
        }
    }
});

export const { addTender, removeTender, updateTender, setStatus, setError } = tenderSlice.actions;
export default tenderSlice.reducer;
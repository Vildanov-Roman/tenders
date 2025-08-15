// archivedTenderSlice.js
import { createSlice } from '@reduxjs/toolkit';

const archivedTenderSlice = createSlice({
    name: 'archivedTender',
    initialState: {
        archivedTenders: [],
        status: 'idle',
        error: null
    },
    reducers: {
        // Сеттер для архивированных тендеров
        setArchivedTenders: (state, action) => {
            state.archivedTenders = action.payload;
        },
        // Добавляем тендер в архив
        addArchivedTender: (state, action) => {
            state.archivedTenders.push(action.payload); // Добавляем тендер в архив
        },
        // Удаляем тендер из архива
        removeArchivedTender: (state, action) => {
            state.archivedTenders = state.archivedTenders.filter(
                tender => tender.TenderId !== action.payload
            );
        },
        setArchiveStatus: (state, action) => {
            state.status = action.payload;
        },
        setArchiveError: (state, action) => {
            state.error = action.payload;
        }
    }
});

export const {
    setArchivedTenders,
    addArchivedTender,
    removeArchivedTender,
    setArchiveStatus,
    setArchiveError
} = archivedTenderSlice.actions;

export default archivedTenderSlice.reducer;

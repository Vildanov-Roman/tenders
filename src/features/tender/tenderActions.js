import { createAsyncThunk } from '@reduxjs/toolkit';
import {
    addTender,
    removeTender,
    setError,
    setTenders,
} from './tenderSlice';
import {
    setArchivedTenders,
    addArchivedTender,
    removeArchivedTender
} from './archivedTenderSlice';

// Получение тендера по ID
export const fetchTenderData = createAsyncThunk(
    'tender/fetchTenderData',
    async (tenderId, { dispatch, rejectWithValue }) => {
        if (!tenderId || !/^\d+$/.test(tenderId)) {
            return rejectWithValue('Некорректный ID тендера');
        }

        try {
            const dbResponse = await fetch('http://localhost:5000/api/tenders', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ tenderId })
            });

            if (dbResponse.status === 409) {
                return rejectWithValue('Такой тендер уже сохранён');
            }

            if (!dbResponse.ok) {
                throw new Error('Ошибка при сохранении тендера в БД');
            }

            const dbData = await dbResponse.json();
            dispatch(addTender(dbData));
            return dbData;
        } catch (error) {
            dispatch(setError(error.message));
            return rejectWithValue(error.message);
        }
    }
);

// Получение всех тендеров
export const fetchAllTenders = createAsyncThunk(
    'tender/fetchAllTenders',
    async (_, { dispatch, rejectWithValue }) => {
        try {
            const response = await fetch('http://localhost:5000/api/tenders');

            if (!response.ok) {
                throw new Error('Ошибка при получении тендеров');
            }

            const tenders = await response.json();
            dispatch(setTenders(tenders));
            return tenders;
        } catch (error) {
            dispatch(setError(error.message));
            return rejectWithValue(error.message);
        }
    }
);

// Удаление тендера (удаляется из базы данных)
export const deleteTenderById = createAsyncThunk(
    'tender/deleteTenderById',
    async (id, { dispatch, rejectWithValue }) => {
        try {
            const response = await fetch(`http://localhost:5000/api/tenders/${id}`, {
                method: 'DELETE'
            });

            if (!response.ok) {
                throw new Error('Не удалось удалить тендер');
            }

            // Удаляем тендер из Redux
            dispatch(removeTender(id));
            return id;
        } catch (error) {
            dispatch(setError(error.message));
            return rejectWithValue(error.message);
        }
    }
);

// Архивирование тендера (перенос в "историю")
export const archiveTenderById = createAsyncThunk(
    'tender/archiveTenderById',
    async (tenderId, { dispatch, rejectWithValue }) => {
        try {
            // Архивирование тендера на сервере
            const response = await fetch(`http://localhost:5000/api/tenders/archive/${tenderId}`, {
                method: 'PATCH'
            });

            if (!response.ok) throw new Error('Ошибка при архивировании тендера');

            const updatedTender = await response.json();

            // Перемещаем тендер в архив в Redux
            dispatch(addArchivedTender(updatedTender));  // Добавляем в архив
            dispatch(removeTender(tenderId));  // Убираем из активного списка

            return updatedTender;
        } catch (error) {
            dispatch(setError(error.message));
            return rejectWithValue(error.message);
        }
    }
);

export const fetchArchivedTenders = createAsyncThunk(
    'archived/fetchArchivedTenders',
    async (_, { dispatch, rejectWithValue }) => {
        try {
            const res = await fetch('http://localhost:5000/api/tenders/archive');
            if (!res.ok) throw new Error('Ошибка при получении архива');
            const data = await res.json();
            dispatch(setArchivedTenders(data));
            return data;
        } catch (e) {
            return rejectWithValue(e.message);
        }
    }
);

export const deleteArchivedTenderById = createAsyncThunk(
    'archived/deleteArchivedTenderById',
    async (tenderId, { dispatch, rejectWithValue }) => {
        try {
            const res = await fetch(`http://localhost:5000/api/tenders/archive/${tenderId}`, {
                method: 'DELETE'
            });
            if (!res.ok) throw new Error('Не удалось удалить тендер из архива');
            dispatch(removeArchivedTender(tenderId));
            return tenderId;
        } catch (e) {
            return rejectWithValue(e.message);
        }
    }
);

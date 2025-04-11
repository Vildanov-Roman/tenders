import { createAsyncThunk } from '@reduxjs/toolkit';
import {addTender, removeTender, setStatus, setError, setTenders} from './tenderSlice';

export const fetchTenderData = createAsyncThunk(
    'tender/fetchTenderData',
    async (tenderId, { dispatch, rejectWithValue }) => {
        if (!tenderId || !/^\d+$/.test(tenderId)) {
            return rejectWithValue('Некорректный ID тендера');
        }

        try {
            dispatch(setStatus('loading'));

            const dbResponse = await fetch('http://localhost:5000/api/tenders', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ tenderId }) // Только ID!
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
        } finally {
            dispatch(setStatus('idle'));
        }
    }
);

export const fetchAllTenders = createAsyncThunk(
    'tender/fetchAllTenders',
    async (_, { dispatch, rejectWithValue }) => {
        try {
            dispatch(setStatus('loading'));
            const response = await fetch('http://localhost:5000/api/tenders');

            if (!response.ok) {
                throw new Error('Ошибка при получении тендеров');
            }

            const tenders = await response.json();
            dispatch(setTenders(tenders)); // сохраняем в Redux
            return tenders;
        } catch (error) {
            dispatch(setError(error.message));
            return rejectWithValue(error.message);
        } finally {
            dispatch(setStatus('idle'));
        }
    }
);

export const deleteTenderById = createAsyncThunk(
    'tender/deleteTenderById',
    async (id, { dispatch, rejectWithValue }) => {
        try {
            dispatch(setStatus('loading'));
            const response = await fetch(`http://localhost:5000/api/tenders/${id}`, {
                method: 'DELETE'
            });

            if (!response.ok) {
                throw new Error('Не удалось удалить тендер');
            }

            const data = await response.json();
            dispatch(removeTender(id));  // Удаляем тендер из состояния Redux
            return data;
        } catch (error) {
            dispatch(setError(error.message));
            return rejectWithValue(error.message);
        } finally {
            dispatch(setStatus('idle'));
        }
    }
);
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

const API_BASE_URL =
    (process.env.REACT_APP_API_BASE_URL || '').replace(/\/+$/, '') ||
    (typeof window !== 'undefined' && window.location.hostname !== 'localhost'
        ? 'https://tender-server.onrender.com'   // дефолт, если не локалка
        : 'http://localhost:5000');

console.log('API_BASE_URL =', process.env.REACT_APP_API_BASE_URL);

// Загрузка тендера
export const fetchTenderData = createAsyncThunk(
    'tender/fetchTenderData',
    async (tenderId, { dispatch, getState, rejectWithValue }) => {
        const id = String(tenderId || '').trim();
        if (!/^\d+$/.test(id)) {
            return rejectWithValue('Некорректный ID тендера');
        }

        if (id.length < 6 || id.length > 12) {
            return rejectWithValue('Некорректный ID тендера');
        }

        const { tender } = getState();
        const existsLocal = tender.tenders.some(t => String(t.TenderId) === id);
        if (existsLocal) {
            return rejectWithValue('Такой тендер уже сохранён');
        }

        try {
            const resp = await fetch(`${API_BASE_URL}/api/tenders`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ tenderId: id })
            });

            if (resp.status === 409) {
                const body = await resp.json().catch(() => ({}));
                return rejectWithValue(body?.error || 'Такой тендер уже сохранён');
            }

            const data = await resp.json().catch(() => ({}));

            if (!resp.ok) {
                return rejectWithValue(data?.error || 'Ошибка при сохранении тендера в БД');
            }

            if (!data || typeof data !== 'object' || !data.TenderId) {
                return rejectWithValue('Тендер с таким ID не найден');
            }

            dispatch(addTender(data));
            return data;
        } catch (e) {
            return rejectWithValue(e.message || 'Ошибка сети');
        }
    }
);

// Получение всех тендеров
export const fetchAllTenders = createAsyncThunk(
    'tender/fetchAllTenders',
    async (_, { dispatch, rejectWithValue }) => {
        try {
            const response = await fetch(`${API_BASE_URL}/api/tenders`);

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

// Удаление тендера
export const deleteTenderById = createAsyncThunk(
    'tender/deleteTenderById',
    async (id, { dispatch, rejectWithValue }) => {
        try {
            const response = await fetch(`${API_BASE_URL}/api/tenders/${id}`, {
                method: 'DELETE'
            });

            if (!response.ok) {
                throw new Error('Не удалось удалить тендер');
            }

            dispatch(removeTender(id));
            return id;
        } catch (error) {
            dispatch(setError(error.message));
            return rejectWithValue(error.message);
        }
    }
);

// Архивирование тендера
export const archiveTenderById = createAsyncThunk(
    'tender/archiveTenderById',
    async (tenderId, { dispatch, rejectWithValue }) => {
        try {
            const response = await fetch(`${API_BASE_URL}/api/tenders/archive/${tenderId}`, {
                method: 'PATCH'
            });

            if (!response.ok) throw new Error('Ошибка при архивировании тендера');

            const updatedTender = await response.json();
            dispatch(addArchivedTender(updatedTender));
            dispatch(removeTender(tenderId));

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
            const res = await fetch(`${API_BASE_URL}/api/tenders/archive`);
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
            const res = await fetch(`${API_BASE_URL}/api/tenders/archive/${tenderId}`, {
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

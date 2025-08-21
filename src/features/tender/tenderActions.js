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
    async (tenderId, { dispatch, getState, rejectWithValue }) => {
        // 1) базовая валидация
        const id = String(tenderId || '').trim();
        if (!/^\d+$/.test(id)) {
            return rejectWithValue('Некорректный ID тендера');
        }
        // 2) разумные ограничения по длине (подгоните под свою доменную логику)
        if (id.length < 6 || id.length > 12) {
            return rejectWithValue('Некорректный ID тендера');
        }
        // 3) уже есть в сторе — не дёргаем backend
        const { tender } = getState();
        const existsLocal = tender.tenders.some(t => String(t.TenderId) === id);
        if (existsLocal) {
            return rejectWithValue('Такой тендер уже сохранён');
        }

        try {
            const resp = await fetch('http://localhost:5000/api/tenders', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ tenderId: id })
            });

            // 409 — уже в БД
            if (resp.status === 409) {
                const body = await resp.json().catch(() => ({}));
                return rejectWithValue(body?.error || 'Такой тендер уже сохранён');
            }

            // читаем тело один раз
            const data = await resp.json().catch(() => ({}));

            // НЕ ок — пробрасываем ошибку сервера (может быть 404 «не найден»)
            if (!resp.ok) {
                return rejectWithValue(data?.error || 'Ошибка при сохранении тендера в БД');
            }

            // Защита от пустых ответов
            if (!data || typeof data !== 'object' || !data.TenderId) {
                return rejectWithValue('Тендер с таким ID не найден');
            }

            // Успех — добавляем
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

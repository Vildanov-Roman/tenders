import { createAsyncThunk } from '@reduxjs/toolkit';
import { addTender, setStatus, setError } from './tenderSlice';

export const fetchTenderData = createAsyncThunk(
    'tender/fetchTenderData',
    async (tenderId, { dispatch, getState, rejectWithValue }) => {
        if (!tenderId || !/^\d+$/.test(tenderId)) {
            return rejectWithValue('Некорректный ID тендера');
        }

        const exists = getState().tender.tenders.some(t => t.TenderId === tenderId);
        if (exists) {
            return rejectWithValue('Тендер уже добавлен');
        }

        try {
            dispatch(setStatus('loading'));
            const response = await fetch(`https://smarttender.biz/PurchaseDetail/GetTenderModel/?tenderId=${tenderId}`);

            if (!response.ok) {
                throw new Error(`Ошибка HTTP: ${response.status}`);
            }

            const data = await response.json();

            if (!data || Object.keys(data).length === 0) {
                return rejectWithValue('Такой тендер не найден');
            }

            const tenderData = {
                TenderId: tenderId,
                DatePublished: data.DatePublished,
                DateModified: data.DateModified,
                Organizer: {
                    Id: data.Organizer?.Id,
                    Name: data.Organizer?.Name,
                    ContactPerson: {
                        Name: data.Organizer?.ContactPerson?.Name,
                        Phone: data.Organizer?.ContactPerson?.Phone,
                        Email: data.Organizer?.ContactPerson?.Email
                    }
                },
                ProzorroNumber: data.ProzorroNumber,
                Category: { title: data.Category?.title },
                LinkToTender: data.LinkToTender,
                ImportantDates: data.ImportantDates,
                StatusTitle: data.StatusTitle,
                Budget: {
                    AmountTitle: data.Budget?.AmountTitle,
                    VatTitle: data.Budget?.VatTitle
                },
                Description: data.Description,
                MinimalStepAmount: data.MinimalStepAmount,
                ParticipationCost: data.ParticipationCost,
                Nomenclatures: data.Nomenclatures?.map(n => ({ Title: n.Title, Count: n.Count })),
                Lots: data.Lots?.map(lot => ({
                    LotId: lot.LotId,
                    Budget: {
                        AmountTitle: lot.Budget?.AmountTitle,
                        VatTitle: lot.Budget?.VatTitle
                    },
                    Nomenclatures: lot.Nomenclatures?.map(n => ({ Title: n.Title, Count: n.Count })) || []
                })) || [],
                Documents: data.Documents?.flatMap(section =>
                    section.Documents?.map(d => ({
                        DocumentType: d.DocumentType,
                        DownloadUrl: d.DownloadUrl
                    })) || []
                ),
                OrganizerId: data.Organizer?.Id
            };

            dispatch(addTender(tenderData));
            return tenderData;
        } catch (error) {
            return dispatch(setError(error.message));
        } finally {
            dispatch(setStatus('idle'));
        }
    }
);

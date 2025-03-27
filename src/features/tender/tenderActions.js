import { addTender, setStatus, setError } from './tenderSlice';

export const fetchTenderData = (tenderId) => async (dispatch, getState) => {
    if (!tenderId || !/^\d+$/.test(tenderId)) {
        dispatch(setError('Invalid Tender ID'));
        return;
    }

    const exists = getState().tender.tenders.some(t => t.TenderId === tenderId);
    if (exists) {
        dispatch(setError('Tender already exists'));
        return;
    }

    try {
        dispatch(setStatus('loading'));
        const response = await fetch(`https://smarttender.biz/PurchaseDetail/GetTenderModel/?tenderId=${tenderId}`);

        if (!response.ok) throw new Error(`HTTP error: ${response.status}`);

        const data = await response.json();


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
            Documents: data.Documents?.flatMap(section =>
                section.Documents?.map(d => ({
                    DocumentType: d.DocumentType,
                    DownloadUrl: d.DownloadUrl
                })) || []
            ),
            OrganizerId: data.Organizer.Id
        };
        console.log('Raw documents data:', data.Documents);
        dispatch(addTender(tenderData));

    } catch (error) {
        dispatch(setError(error.message));
    } finally {
        dispatch(setStatus('idle'));
    }
};
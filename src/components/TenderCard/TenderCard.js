import React, { useState } from 'react';
import TenderModal from '../TenderModal/TenderModal';
import { Card } from './StyleCard';
import TenderStageBanner from '../../Blocks/TenderStageBanner/TenderStageBanner';

const ORGANIZERS = {
    6709: 'Одесская жд',
    6486: 'Приднепровская жд',
    7297: 'Львовская ЖД',
    18151: 'Донецкая ЖД',
    6642: 'Юго-Западная ЖД',
    35478: 'Южная ЖД',
    6557: 'Львовский ЛРЗ',
    7835: 'КЕВРЗ',
    10033: 'ЗЕРЗ',
    5853: 'Киев Метро',
    32756: 'Харьков Метро',
    60208: 'Днепро Метро'
};

const getOrganizerName = (OrganizerId) => {
    const id = Number(OrganizerId);
    return ORGANIZERS[id] || 'Какой-то организатор';
};

const TenderCard = ({ tender, onDelete, isArchiveView = false }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const organizerName = getOrganizerName(tender.Organizer?.Id);

    return (
        <>
            <Card onClick={() => setIsModalOpen(true)} style={{ position: 'relative' }}>

                <TenderStageBanner stages={tender.Stages} />

                <h3>Тендер №{tender.TenderId}</h3>
                <strong>{organizerName}</strong>
                <p
                    title={tender.Description}
                    style={{
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        maxWidth: '100%',
                        display: 'block',
                    }}
                >
                    {tender.Description} ({tender.Lots.length} Лота(ов))
                </p>
                <p>Сумма: {tender.Budget?.AmountTitle} ({tender.Budget?.VatTitle})</p>
                <p>Дата аукциона: {tender.ImportantDates?.AuctionStart || 'Не указана'}</p>
            </Card>

            <TenderModal
                tender={{ ...tender, Organizer: { ...tender.Organizer, Name: tender.Organizer?.Name }}}
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onDelete={onDelete}
                isArchiveView={isArchiveView}
            />
        </>
    );
};

export default TenderCard;

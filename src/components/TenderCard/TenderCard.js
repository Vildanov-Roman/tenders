
import React, { useState } from 'react';

import TenderModal from '../TenderModal/TenderModal';
import {Card} from './StyleCard';

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


const TenderCard = ({ tender, onDelete }) => {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const organizerName = getOrganizerName(tender.Organizer?.Id);

    return (
        <>
            <Card onClick={() => setIsModalOpen(true)}>

                <h3>Тендер №{tender.TenderId}</h3>
                <strong>{organizerName}</strong>
                <p>{tender.Description} ({tender.Lots.length} Лота(ов))</p>
                <p>Сумма: {tender.Budget?.AmountTitle} ({tender.Budget?.VatTitle})</p>
                <p>Дата аукциона: {tender.ImportantDates?.AuctionStart || 'Не указана'}</p>
            </Card>

            <TenderModal
                tender={{ ...tender, Organizer: { ...tender.Organizer, Name: tender.Organizer?.Name }}}
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    onDelete={onDelete}
                    />
        </>
    );};

export default TenderCard;
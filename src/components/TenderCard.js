
import React, { useState } from 'react';
import styled from 'styled-components';
import TenderModal from './TenderModal';

const Card = styled.div`
  width: 300px;
  height: 200px;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 20px;
  margin: 10px;
  cursor: pointer;
  box-shadow: 0 5px 5px 0 rgba(0, 0, 0, 0.5);
  transition: transform 0.2s;

  &:hover {
    transform: scale(1.09);
  }
`;

    const getOrganizerName = (OrganizerId) => {

    if (!OrganizerId) return 'Неизвестный организатор';

    switch(OrganizerId) {
        case 6709:
            return 'Одесская жд';
        case 6486:
            return 'Приднепровская жд';
        default:
            return OrganizerId || 'Неизвестный организатор';
    }
};

const TenderCard = ({ tender, onDelete }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const organizerName = getOrganizerName(tender.OrganizerId);

    return (
        <>
            <Card onClick={() => setIsModalOpen(true)}>
                <h3>Тендер №{tender.TenderId}</h3>
                <strong>{organizerName}</strong>
                <p style={{
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden"
                }}>{tender.Description}</p>
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
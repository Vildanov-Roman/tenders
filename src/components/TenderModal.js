// src/components/TenderModal.js
import React, { useState } from 'react';
import dayjs from "dayjs";
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { removeTender } from '../features/tender/tenderSlice';

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0,0,0,0.5);
  display: ${props => props.$isOpen ? 'flex' : 'none'};
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  border-bottom: 1px solid black;
`;

const ContactInfo = styled.div`
  margin-top: 10px;
  padding: 10px;
  background: #f8f9fa;
  border-radius: 4px;

  p {
    margin: 5px 0;
    font-size: 0.9em;
    color: #666;
  }
`;

const ModalContent = styled.div`
  background: white;
  padding: 20px;
  border-radius: 8px;
  width: 550px;
  max-width: 90%;
  max-height: 90vh; // Ограничиваем высоту
  display: flex;
  flex-direction: column;
  overflow: hidden; // Скрываем внутренний скролл
`;

const ScrollableContent = styled.div`
  overflow-y: auto;
  padding-right: 8px; // Чтобы контент не "прыгал" при появлении скролла
  margin-bottom: 20px; // Отступ для кнопок

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: #f1f1f1;
  }

  &::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 3px;
  }
`;

const InfoRow = styled.div`
  display: flex;
  justify-content: space-around;
  text-align: center;
  margin-top: 10px;
  margin-bottom: 10px;
  padding-top: 10px;
  border-top: 1px solid black;
  border-bottom: 1px solid black;
`;

const InfoBlock = styled.div`
  flex: 1;

  p {
    margin-bottom: 5px;
    margin-top: 5px;
  }
`;

const ButtonGroup = styled.div`
  margin-top: 20px;
  display: flex;
  gap: 10px;
`;

const ButtonLink = styled.a`  // Изменено с button на a
  display: inline-block;
  padding: 5px;
  font-size: 16px;
  color: white;
  background-color: #007bff;
  text-decoration: none;
  border-radius: 5px;
  border: 0.5px solid #007bff;
  transition: background-color 0.3s ease;
  cursor: pointer;
  text-align: center;

  &:hover {
    background-color: #0056b3;
  }
`;


const Button = styled.button`
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &.danger {
    background: #ff4d4f;
    color: white;
  }
`;

const NomenclaturesList = styled.ul`
  list-style: none;
  max-height: 8em;
  overflow-y: auto;
  padding: 5px;
  border: 1px solid #ddd;
  border-radius: 4px;
  background-color: rgba(243, 242, 243, 0.8);

  li {
    padding: 4px 0;
    border-bottom: 1px solid rgba(222, 222, 222, 0.8);
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
  }

  li:last-child {
    border-bottom: none;
  }

  span:first-child {
    flex: 1;
    text-align: left;
    padding-right: 10px;
  }

  span:last-child {
    flex-shrink: 0;
    text-align: right;
    color: #666;
  }
`;

const formatDate = (dateString) => {
    return dayjs(dateString).format("DD:MM:YY в HH:mm");
};



const TenderModal = ({ tender, isOpen, onClose }) => {

    console.log(tender)

    const dispatch = useDispatch();
    const [comment, setComment] = useState(tender.Comment || "");
    const [isEditing, setIsEditing] = useState(false);
    const [hasComment, setHasComment] = useState(!!tender.Comment);
    const handleDelete = () => {
        dispatch(removeTender(tender.TenderId));
        onClose();
    };
    const handleCommentChange = (e) => {
        setComment(e.target.value);
    };
    const handleSaveComment = () => {
        if (comment.trim()) {
            setHasComment(true);
            setIsEditing(false);
            // Здесь можно добавить логику сохранения в хранилище
        } else {
            setHasComment(false);
            setIsEditing(false);
        }
    };
    const handleEditClick = () => {
        setIsEditing(true);
    };
    const handleAddClick = () => {
        if (comment.trim()) {
            setHasComment(true);
            setIsEditing(false);
        }
    };

    const docUrl = tender.Documents?.find(
        d => d.DocumentType === "Тендерна документація"
    )?.DownloadUrl;

    const handleDownload = () => {
        if (docUrl) {
            window.open(docUrl, "_blank");
        }
    };


    return (
        <ModalOverlay
            $isOpen={isOpen}
            onClick={onClose}
        >
            <ModalContent onClick={e => e.stopPropagation()}>
                <Container>
                    <h2>Тендер №{tender.TenderId}</h2>
                    <ButtonLink href={tender.LinkToTender} target="_blank" rel="noopener noreferrer">
                        {tender.ProzorroNumber}
                    </ButtonLink>
                    <p>Дата публикации: {formatDate(tender.DatePublished)}</p>
                </Container>

                <ScrollableContent>
                    <div>
                        <InfoRow>
                            <InfoBlock>
                                <strong>Организатор</strong>
                                <p>{tender.Organizer?.Name}</p>
                                {tender.Organizer?.ContactPerson && (
                                    <ContactInfo>
                                        <p>Контактное лицо: {tender.Organizer.ContactPerson.Name}</p>
                                        <p>Телефон: {tender.Organizer.ContactPerson.Phone}</p>
                                        <p>Email: {tender.Organizer.ContactPerson.Email}</p>
                                    </ContactInfo>
                                )}
                            </InfoBlock>
                        </InfoRow>
                        <InfoRow>
                            <InfoBlock>
                                <strong>Бюджет</strong>
                                <p>{tender.Budget?.AmountTitle} ({tender.Budget?.VatTitle})</p>
                            </InfoBlock>
                            <InfoBlock>
                                <strong>Участие</strong>
                                <p>{tender.ParticipationCost}</p>
                            </InfoBlock>
                            <InfoBlock>
                                <strong>Мин. шаг</strong>
                                <p>{tender?.MinimalStepAmount}</p>
                            </InfoBlock>
                        </InfoRow>
                        <InfoRow>
                            <InfoBlock>
                                <strong>Период уточнений</strong>
                                <p>с {tender.ImportantDates?.EnquiryPeriodStart}</p>
                                <p> по {tender.ImportantDates?.EnquiryPeriodEnd}</p>
                            </InfoBlock>
                            <InfoBlock>
                                <strong>Приём предложений</strong>
                                <p>с {tender.ImportantDates?.TenderingPeriodStart}</p>
                                <p> по {tender.ImportantDates?.TenderingPeriodEnd}</p>
                            </InfoBlock>
                            <InfoBlock>
                                <strong>Аукцион</strong>
                                <p>{tender.ImportantDates?.AuctionStart}</p>
                            </InfoBlock>
                        </InfoRow>
                        <strong>Номенклатура</strong>
                        <NomenclaturesList>
                            {tender.Nomenclatures?.map((item, index) => (
                                <li key={index}>
                                    <span>{item.Title}</span>
                                    <span>{item.Count}</span>
                                </li>
                            ))}
                        </NomenclaturesList>

                        {tender.Documents && tender.Documents.length > 0 && (
                            <ButtonLink onClick={handleDownload}
                                href={docUrl}
                                download
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{margin: "10px 0"}}
                            >
                                📥 Скачати тендерну документацію
                            </ButtonLink>
                        )}


                        <strong>Комментарий из {500 - comment.length} символов</strong>
                        <div>
                            <textarea
                                value={comment}
                                onChange={handleCommentChange}
                                placeholder="Напишите комментарий..."
                                rows="4"
                                maxLength="500"
                                style={{
                                    width: "515px",
                                    padding: "10px",
                                    borderRadius: "4px",
                                    border: "1px solid #ddd",
                                    backgroundColor: hasComment && !isEditing ? '#f5f5f5' : 'white',
                                    resize: 'vertical'
                                }}
                                disabled={hasComment && !isEditing}
                            />

                            {!hasComment ? (
                                <Button
                                    onClick={handleAddClick}
                                    disabled={!comment.trim()}
                                    style={{ marginTop: '10px' }}
                                >
                                    Добавить
                                </Button>
                            ) : (
                                <div style={{ marginTop: '10px' }}>
                                    {isEditing ? (
                                        <Button onClick={handleSaveComment}>
                                            Сохранить
                                        </Button>
                                    ) : (
                                        <Button onClick={handleEditClick}>
                                            Редактировать
                                        </Button>
                                    )}
                                </div>
                            )}
                        </div>
                </div>

            </ScrollableContent>

            <ButtonGroup>
                <Button className="danger" onClick={handleDelete}>
                    Удалить
                </Button>
                <Button onClick={onClose}>ОК</Button>
            </ButtonGroup>
        </ModalContent>
</ModalOverlay>
);
};

export default TenderModal;

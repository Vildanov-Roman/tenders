// src/components/TenderModal.js
import React, { useState } from 'react';
import dayjs from "dayjs";
import { useDispatch } from 'react-redux';
import { removeTender } from '../../features/tender/tenderSlice';
import {
    ColumnsWrapper,
    LeftColumn,
    RightColumn,
    InfoRow,
    InfoBlock,
    ContactInfo,
    ButtonLink,
    ModalOverlay,
    ModalContent,
    Container,
    ScrollableContent,
    Button,
    ButtonGroup,
    NomenclaturesList,
    Buttonlot,
    Lots
} from './StyleModal'
// import Nomenclatures from '../../Blocks/NomenclaturesList'


const formatDate = (dateString) => {
    return dayjs(dateString).format("DD/MM/YY в HH:mm");
};



const TenderModal = ({ tender, isOpen, onClose }) => {

    console.log(tender.Lots)

    const dispatch = useDispatch();
    const [comment, setComment] = useState(tender.Comment || "");
    const [isEditing, setIsEditing] = useState(false);
    const [hasComment, setHasComment] = useState(!!tender.Comment);
    const [selectedLot, setSelectedLot] = useState(null);
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

    const tenderDocumentation = tender.Documents?.find(
        d => d.Title === "Тендерна документація"
    )?.Documents?.[0];

    const handleDownloadDocs = () => {
        if (tenderDocumentation?.DownloadUrl) {
            const link = document.createElement("a");
            link.href = tenderDocumentation.DownloadUrl;
            link.setAttribute("download", tenderDocumentation || "document"); // Устанавливаем имя файла
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    };


    return (
        <ModalOverlay
            $isOpen={isOpen}
            onClick={onClose}
        >
            <ModalContent onClick={e => e.stopPropagation()}>
                <Container>
                    <b>Тендер №{tender.TenderId}</b>
                    <ButtonLink
                        onClick={handleDownloadDocs}
                        style={{ marginLeft: 'auto', opacity: tenderDocumentation?.DownloadUrl ? 1 : 0.5, cursor: tenderDocumentation?.DownloadUrl ? 'pointer' : 'not-allowed' }}
                        disabled={!tenderDocumentation?.DownloadUrl}
                    >
                        📄 Тендерна документація
                    </ButtonLink>
                    <ButtonLink
                        href={tender.LinkToTender}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        {tender.ProzorroNumber}
                    </ButtonLink>
                    <div>
                        <p>Дата публикации:</p>
                        <p>{formatDate(tender.DatePublished)}</p>
                    </div>

                </Container>

                <ScrollableContent>
                    <div>
                        <ColumnsWrapper>
                            <LeftColumn>
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
                                <>
                                    <InfoBlock>
                                        <p><b>Бюджет</b> - {tender.Budget?.AmountTitle} ({tender.Budget?.VatTitle})</p>
                                        <p><b>Участие</b> - {tender.ParticipationCost}</p>
                                        <p><b>Мин. шаг</b> - {tender?.MinimalStepAmount}</p>
                                    </InfoBlock>
                                </>
                            </LeftColumn>

                            <RightColumn>
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

                                <>
                                    {tender.Lots && tender.Lots.length > 0 ? (
                                        <>
                                            <strong>Количество лотов: {tender.Lots.length}</strong>
                                            <Lots>
                                                {tender.Lots.map((lot) => (
                                                    <Buttonlot key={lot.LotId} isActive={selectedLot?.LotId === lot.LotId} onClick={() => setSelectedLot(lot) }>
                                                        Лот {lot.Title}
                                                    </Buttonlot>
                                                ))}
                                            </Lots>

                                            {selectedLot && (
                                                <>
                                                    <h3>Детали лота: {selectedLot.Title}</h3>
                                                    <p><strong>Бюджет:</strong> {selectedLot.Budget?.AmountTitle || 'Нет данных'}</p>
                                                    <strong>Номенклатура</strong>
                                                    <NomenclaturesList>
                                                        {selectedLot.Nomenclatures && selectedLot.Nomenclatures.length > 0 ? (
                                                            selectedLot.Nomenclatures.map((item, index) => (
                                                                <li key={index}>
                                                                    <span>{item.Title}</span>
                                                                    <span>{item.Count}</span>
                                                                </li>
                                                            ))
                                                        ) : (
                                                            <p>Нет номенклатур</p>
                                                        )}
                                                    </NomenclaturesList>
                                                </>
                                            )}
                                        </>
                                    ) : (
                                        <>
                                            <strong>Номенклатура</strong>
                                            <NomenclaturesList>
                                                {tender.Nomenclatures?.map((item, index) => (
                                                    <li key={index}>
                                                        <span>{item.Title}</span>
                                                        <span>{item.Count}</span>
                                                    </li>
                                                ))}
                                            </NomenclaturesList>
                                        </>

                                    )}
                                </>


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

                            </RightColumn>
                        </ColumnsWrapper>


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

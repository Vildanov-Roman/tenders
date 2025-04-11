
import React, { useState } from 'react';
import dayjs from "dayjs";
import { useDispatch } from 'react-redux';
import { deleteTenderById } from '../../features/tender/tenderActions';
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
    ButtonGroup
} from './StyleModal'
import Nomenclatures from "../../Blocks/Nomenclatures/Nomenclatures";
import {ConfirmModal} from "../../Blocks/ConfirmModal";
import {toast} from "react-toastify";
const formatDate = (dateString) => {
    return dayjs(dateString).format("DD/MM/YY в HH:mm");
};

const TenderModal = ({ tender, isOpen, onClose }) => {

    const dispatch = useDispatch();
    const [comment, setComment] = useState(tender.Comment || "");
    const [isEditing, setIsEditing] = useState(false);
    const [hasComment, setHasComment] = useState(!!tender.Comment);
    const [showConfirm, setShowConfirm] = useState(false);

    const handleDelete = () => {
        dispatch(deleteTenderById(tender.TenderId)).then(() => {
            toast.success('Тендер удалён');
            onClose();
        });
    };
    const handleCommentChange = (e) => {
        setComment(e.target.value);
    };
    const handleSaveComment = () => {
        if (comment.trim()) {
            setHasComment(true);
            setIsEditing(false);
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
        <>
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

                                <Nomenclatures tender={tender} />

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
                    <Button className="danger" onClick={() => setShowConfirm(true)}>
                        Удалить
                    </Button>
                    <Button onClick={onClose}>ОК</Button>
                </ButtonGroup>
            </ModalContent>
        </ModalOverlay>

            <ConfirmModal
                isOpen={showConfirm}
                onConfirm={handleDelete}
                onCancel={() => setShowConfirm(false)}
            />
        </>
    );
};

export default TenderModal;

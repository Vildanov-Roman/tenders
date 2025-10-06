import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TenderCard from '../TenderCard/TenderCard';
import {GridContainer, SearchContainer, SearchInput, Button, Title, WrapTitle, ImgWrap} from './StyleList';
import { fetchAllTenders, fetchArchivedTenders } from '../../features/tender/tenderActions';
import NiHia from "../../img/NiHia.png";
import HistoryList from '../History/HistoryList';

const TenderList = () => {
    const dispatch = useDispatch();
    const { tenders, status } = useSelector((state) => state.tender);
    const { archivedTenders } = useSelector((state) => state.archivedTender);
    const [searchTerm, setSearchTerm] = useState("");
    const [showArchive, setShowArchive] = useState(false);

    useEffect(() => {
        dispatch(fetchAllTenders());
        dispatch(fetchArchivedTenders());
    }, [dispatch]);

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value.toLowerCase());
    };

    const filteredTenders = tenders.filter(tender =>
        tender.TenderId.toString().includes(searchTerm) ||
        tender.Organizer?.Name?.toLowerCase().includes(searchTerm)
    );

    const isSearchActive = searchTerm.trim().length > 0;
    const isNothingFound = isSearchActive && filteredTenders.length === 0;

    return (
        <>
            {!showArchive ? (
                <>
                    {tenders.length > 3 && (
                        <SearchContainer>
                            <SearchInput
                                type="text"
                                placeholder="Поиск по ID или Организатору"
                                value={searchTerm}
                                onChange={handleSearchChange}
                            />
                            <Button type="button">Найти</Button>
                        </SearchContainer>
                    )}

                    {status === 'loading' ? (
                        <p>Загрузка...</p>
                    ) : (
                        <>
                            {tenders.length === 0 ? null : (
                                <>
                                    {isNothingFound ? (
                                        <ImgWrap>
                                            <WrapTitle>
                                                <Title>Нет</Title>
                                                <Title>такого</Title>
                                                <Title>тендера</Title>
                                            </WrapTitle>
                                            <img src={NiHia} alt="no enything" />
                                        </ImgWrap>
                                    ) : (
                                        <GridContainer>
                                            {filteredTenders.map(tender => (
                                                <TenderCard key={tender.TenderId} tender={tender} />
                                            ))}
                                        </GridContainer>
                                    )}
                                </>
                            )}
                        </>
                    )}

                    {archivedTenders.length > 0 && (
                        <Button onClick={() => setShowArchive(true)}>
                            Архив
                        </Button>
                    )}
                </>
            ) : (
                <HistoryList onClose={() => setShowArchive(false)} />
            )}
        </>
    );
};

export default TenderList;

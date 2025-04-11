import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllTenders, deleteTenderById } from '../../features/tender/tenderActions';
import TenderCard from '../TenderCard/TenderCard';
import { GridContainer, SearchContainer, SearchInput } from './StyleList';
import { Button } from '../TenderSearch/StyleSearch';

const TenderList = () => {
    const dispatch = useDispatch();
    const { tenders, status } = useSelector((state) => state.tender);
    const [searchTerm, setSearchTerm] = useState("");

    // Загружаем все тендеры при монтировании компонента
    useEffect(() => {
        dispatch(fetchAllTenders());
    }, [dispatch]);


    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value.toLowerCase());
    };

    const handleDelete = (id) => {
        dispatch(deleteTenderById(id));
    };

    const filteredTenders = tenders.filter(tender =>
        tender.TenderId.toString().includes(searchTerm) ||
        tender.Organizer?.Name?.toLowerCase().includes(searchTerm)
    );

    return (
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
            ) : filteredTenders.length === 0 ? (
                <p>Нет тендеров</p>
            ) : (
                <GridContainer>
                    {filteredTenders.map(tender => (
                        <TenderCard
                            key={tender.TenderId}
                            tender={tender}
                            onDelete={() => handleDelete(tender.TenderId)}
                        />
                    ))}
                </GridContainer>
            )}
        </>
    );
};

export default TenderList;

import React, { useState } from 'react';
import TenderCard from '../TenderCard/TenderCard';
import { useDispatch } from 'react-redux';
import { removeTender } from '../../features/tender/tenderSlice';
import { GridContainer, SearchContainer, SearchInput } from "./StyleList";
import {Button} from "../TenderSearch/StyleSearch";

const TenderList = ({ tenders }) => {
    const dispatch = useDispatch();
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredTenders, setFilteredTenders] = useState(tenders);

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value.toLowerCase());
        filterTenders(e.target.value);
    };

    const handleSearchClick = () => {
        filterTenders(searchTerm);
    };

    const filterTenders = (term) => {
        if (!term) {
            setFilteredTenders(tenders);
            return;
        }
        setFilteredTenders(
            tenders.filter(tender =>
                tender.TenderId.toString().includes(term) ||
                tender.Organizer?.Name?.toLowerCase().includes(term)
            )
        );
    };

    return (
        <>
            <SearchContainer>
                <SearchInput
                    type="text"
                    placeholder="Поиск по ID или Организатору"
                    value={searchTerm}
                    onChange={handleSearchChange}
                />
                <Button type="button" onClick={handleSearchClick}>Найти</Button>
            </SearchContainer>
            <GridContainer>
                {filteredTenders.map(tender => (
                    <TenderCard
                        key={tender.TenderId}
                        tender={tender}
                        onDelete={() => dispatch(removeTender(tender.TenderId))}
                    />
                ))}
            </GridContainer>
        </>
    );
};

export default TenderList;

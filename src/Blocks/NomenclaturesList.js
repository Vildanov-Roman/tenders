
import React from 'react';
import { NomenclaturesList } from '../components/TenderModal/StyleModal'

const Nomenclatures = ({ items }) => {
    return (
        <>
            <strong>Номенклатура</strong>
            <NomenclaturesList>
                {items?.map((item, index) => (
                    <li key={index}>
                        <span>{item.Title}</span>
                        <span>{item.Count}</span>
                    </li>
                ))}
            </NomenclaturesList>
        </>
    );
};

export default Nomenclatures;
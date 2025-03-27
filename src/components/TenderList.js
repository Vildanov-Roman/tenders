    import React from 'react';
    import styled from 'styled-components';
    import TenderCard from './TenderCard';
    import { useDispatch } from 'react-redux';
    import { removeTender } from '../features/tender/tenderSlice';

    const GridContainer = styled.div`
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 20px;
      padding: 20px;
    `;

    const TenderList = ({ tenders }) => {
        const dispatch = useDispatch();

        return (
            <GridContainer>
                {tenders.map(tender => (
                    <TenderCard
                        key={tender.TenderId}
                        tender={tender}
                        onDelete={() => dispatch(removeTender(tender.TenderId))}
                    />
                ))}
            </GridContainer>
        );
    };

    export default TenderList;
    import React from 'react';

    import TenderCard from '../TenderCard/TenderCard';
    import { useDispatch } from 'react-redux';
    import { removeTender } from '../../features/tender/tenderSlice';
    import { GridContainer} from "./StyleList";

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
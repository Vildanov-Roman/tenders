
import TenderCard from "../TenderCard/TenderCard";
import {GridContainer} from "../TenderList/StyleList";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {deleteArchivedTenderById, fetchArchivedTenders} from "../../features/tender/tenderActions";
import { Button } from '../TenderSearch/StyleSearch';

const HistoryList = ({ onClose }) => {
    const dispatch = useDispatch();
    const { archivedTenders, status } = useSelector((state) => state.archivedTender);


    useEffect(() => {
        dispatch(fetchArchivedTenders());
    }, [dispatch]);

    return (
        <>
            <Button onClick={onClose}>Назад к активным тендерам</Button>

            {status === 'loading' ? (
                <p>Загрузка...</p>
            ) : archivedTenders.length === 0 ? (
                <p style={{ textAlign: 'center', color: '#DAA520', fontSize: '36px'}}>Архив пуст</p>
            ) : (
                <GridContainer>
                    {archivedTenders.map(tender => (
                            <TenderCard
                                key={tender.TenderId}
                                tender={tender}
                                isArchiveView={true}
                                onDelete={() => dispatch(deleteArchivedTenderById(tender.TenderId))}
                            />
                        ))}
                </GridContainer>
            )}
        </>
    );
};

export default HistoryList;

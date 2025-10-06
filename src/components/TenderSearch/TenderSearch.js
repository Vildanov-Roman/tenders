import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTenderData } from '../../features/tender/tenderActions';
import { FormContainer, Input, Button, LoaderOverlay, LoaderContainer, LoaderText } from './StyleSearch';
import ModalError from '../../Blocks/Error/ModalError';
import { PuffLoader } from 'react-spinners';;


const TenderSearch = () => {
    const [inputId, setInputId] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalMessage, setModalMessage] = useState('');
    const dispatch = useDispatch();
    const { status } = useSelector(state => state.tender);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!inputId.trim()) {
            setModalMessage('Введите ID тендера');
            setIsModalOpen(true);
            return;
        }

        const actionResult = await dispatch(fetchTenderData(inputId));

        if (fetchTenderData.fulfilled.match(actionResult)) {
            const data = actionResult.payload;

            if (!data || Object.keys(data).length === 0) {
                setModalMessage('Тендер с таким ID не найден');
                setIsModalOpen(true);
                return;
            }
        }
        else if (fetchTenderData.rejected.match(actionResult)) {
            setModalMessage(actionResult.payload || 'Ошибка при загрузке данных о тендере');
            setIsModalOpen(true);
        }

        setInputId('');
    };

    return (
        <>
            {status === 'loading' && (
                <LoaderOverlay>
                    <LoaderContainer>
                        <PuffLoader color="#DAA520" size={150} />
                        <LoaderText>Ща ща ща, погодь...</LoaderText>
                    </LoaderContainer>
                </LoaderOverlay>
            )}

            <form onSubmit={handleSubmit}>
                <FormContainer>
                    <h2>Введите ID тендера</h2>
                    <div>
                        <Input
                            value={inputId}
                            onChange={e => setInputId(e.target.value)}
                            placeholder="Enter Tender ID"
                        />
                        <Button
                            type="submit"                 // <— важно
                            disabled={status === 'loading'}
                        >
                            {status === 'loading' ? 'Загрузка...' : 'Сформировать'}
                        </Button>
                    </div>

                    {isModalOpen && (
                        <ModalError onClose={() => setIsModalOpen(false)}>
                            {modalMessage}
                        </ModalError>
                    )}
                </FormContainer>
            </form>
        </>
    );
};

export default TenderSearch;

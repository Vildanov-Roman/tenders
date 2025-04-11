// components/ConfirmModal/ConfirmModal.js
import React from 'react';
import styled from 'styled-components';
import { ButtonGroup, Button } from '../components/TenderModal/StyleModal';

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: ${({ $isOpen }) => ($isOpen ? 'flex' : 'none')};
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalBox = styled.div`
  background: white;
  padding: 24px;
  border-radius: 8px;
  max-width: 400px;
  width: 100%;
  text-align: center;
`;

export const ConfirmModal = ({ isOpen, onConfirm, onCancel }) => {
    return (
        <Overlay $isOpen={isOpen}>
            <ModalBox>
                <p>Вы уверены, что хотите удалить этот тендер?</p>
                <ButtonGroup>
                    <Button className="danger" onClick={onConfirm}>
                        Удалить
                    </Button>
                    <Button onClick={onCancel}>Отмена</Button>
                </ButtonGroup>
            </ModalBox>
        </Overlay>
    );
};

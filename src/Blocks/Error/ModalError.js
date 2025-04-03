import React from 'react';
import { ErrorOverlay, ErrorContent, Button } from './StyleError';

const ModalError = ({ children, onClose }) => {
    return (
        <ErrorOverlay>
            <ErrorContent>
                <p>{children}</p>
                <Button onClick={onClose}>OK</Button>
            </ErrorContent>
        </ErrorOverlay>
    );
};

export default ModalError;

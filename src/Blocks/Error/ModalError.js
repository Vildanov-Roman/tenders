// Blocks/Error/ModalError.js
import React from 'react';
import { createPortal } from 'react-dom';
import { ErrorOverlay, ErrorContent, Button } from './StyleError';
import letsGoAgain from "../../img/letsGoAgain.png";

const ModalError = ({ children, onClose }) => {
    return createPortal(
        <ErrorOverlay
            style={{ zIndex: 3, position: 'fixed' }}
            role="dialog"
            aria-modal="true"
            onClick={onClose}
        >
            <ErrorContent onClick={(e) => e.stopPropagation()}>
                <img src={letsGoAgain} alt="Error" width="250" height="200" />
                <p>{children}</p>
                <Button onClick={onClose}>OK</Button>
            </ErrorContent>
        </ErrorOverlay>,
        document.body
    );
};

export default ModalError;

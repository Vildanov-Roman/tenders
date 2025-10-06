import React from 'react';
import {Box, Close, Empty, Header, List, Meta, Overlay, Row, Section, Title, Button} from './StyleDocsModal';

function buildDocsBySection(tender) {
    const sections = Array.isArray(tender?.Documents) ? tender.Documents : [];
    return sections.map(sec => ({
        title: sec?.Title || 'Раздел',
        docs: Array.isArray(sec?.Documents) ? sec.Documents : []
    }));
}

const DocsModal = ({ isOpen, onClose, tender }) => {
    const sections = buildDocsBySection(tender);
    const total = sections.reduce((acc, s) => acc + s.docs.length, 0);

    const download = (url, filename) => {
        if (!url) return;
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', filename || 'document');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <Overlay $isOpen={isOpen} onClick={onClose}>
            <Box onClick={(e) => e.stopPropagation()}>
                <Header>
                    <Title>Тендерная документация ({total})</Title>
                    <Close onClick={onClose}>Закрыть</Close>
                </Header>

                <List>
                    {total === 0 ? (
                        <Empty>Документов нет</Empty>
                    ) : (
                        sections.map((sec, i) => (
                            <div key={`sec-${i}`}>
                                <Section>{sec.title}</Section>
                                {sec.docs.map((docItem, idx) => (
                                    <Row key={`${i}-${idx}`}>
                                        <Meta>{docItem?.DocumentType || 'сомнительно, но okэээй (ХЗ шо за файл)'}</Meta>
                                        <Button
                                            onClick={() => download(docItem?.DownloadUrl, docItem?.FileName || docItem?.Title)}
                                            disabled={!docItem?.DownloadUrl}
                                            title={docItem?.DownloadUrl ? 'Скачать' : 'Ссылка отсутствует'}
                                        >
                                            Скачать
                                        </Button>
                                    </Row>
                                ))}
                            </div>
                        ))
                    )}
                </List>
            </Box>
        </Overlay>
    );
};
export default DocsModal;
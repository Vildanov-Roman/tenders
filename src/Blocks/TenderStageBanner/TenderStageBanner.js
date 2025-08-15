import React from 'react';

const stageColors = {
    enquiry: '#f0ad4e',
    tendering: '#5bc0de',
    auction: '#0275d8',
    qualification: '#5cb85c',
    completed: '#999'
};

const stageLabels = {
    enquiry: 'Период уточнений',
    tendering: 'Прием предложений',
    auction: 'Аукцион',
    qualification: 'Квалификация',
    completed: 'Завершено'
};

const TenderStageBanner = ({ stages }) => {
    if (!Array.isArray(stages) || stages.length === 0) return null;

    const currentStage = stages.find(stage => stage?.Current);

    if (!currentStage) return null;

    const backgroundColor = stageColors[currentStage.Name] || '#ccc';
    const label = stageLabels[currentStage.Name] || 'Предложение розглянуто';

    return (
        <div
            style={{
                backgroundColor,
                color: '#fff',
                padding: '4px 8px',
                borderRadius: '4px',
                fontSize: '12px',
                fontWeight: 'bold',
                position: 'absolute',
                top: '8px',
                right: '8px',
                zIndex: 1
            }}
        >
            {label}
        </div>
    );
};

export default TenderStageBanner;

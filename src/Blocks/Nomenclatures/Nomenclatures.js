
import React, { useState } from "react";
import { Lots, Buttonlot, NomenclaturesList } from "./StyleNomenclature";

const Nomenclatures = ({ tender }) => {
    const [selectedLot, setSelectedLot] = useState(null);

    return (
        <>
            {tender.Lots && tender.Lots.length > 0 ? (
                <>
                    <strong>Количество лотов: {tender.Lots.length}</strong>
                    <Lots>
                        {tender.Lots.map((lot) => (
                            <Buttonlot
                                key={lot.LotId}
                                $isActive={selectedLot?.LotId === lot.LotId}
                                onClick={() => setSelectedLot(lot)}
                            >
                                Лот {lot.Title}
                            </Buttonlot>
                        ))}
                    </Lots>

                    {selectedLot && (
                        <>
                            <h3>Детали лота: {selectedLot.Title}</h3>
                            <p>
                                <strong>Бюджет:</strong> {selectedLot.Budget?.AmountTitle || "Нет данных"}
                            </p>
                            <strong>Номенклатура</strong>
                            <NomenclaturesList>
                                {selectedLot.Nomenclatures && selectedLot.Nomenclatures.length > 0 ? (
                                    selectedLot.Nomenclatures.map((item, index) => (
                                        <li key={index}>
                                            <span>{item.Title}</span>
                                            <span>{item.Count}</span>
                                        </li>
                                    ))
                                ) : (
                                    <p>Нет номенклатур</p>
                                )}
                            </NomenclaturesList>
                        </>
                    )}
                </>
            ) : (
                <>
                    <strong>Номенклатура</strong>
                    <NomenclaturesList>
                        {tender.Nomenclatures?.map((item, index) => (
                            <li key={index}>
                                <span>{item.Title}</span>
                                <span>{item.Count}</span>
                            </li>
                        ))}
                    </NomenclaturesList>
                </>
            )}
        </>
    );
};

export default Nomenclatures;

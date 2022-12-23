import React, { useEffect, useState } from 'react';
import './stocks.scss';

import { getReq } from '../../utils/api';
import { baseUrl } from '../../utils/base';

//Assets
import RightCaret from '../../assets/icons/right-caret.svg';

const Stocks = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        getAllStocks();
    }, []);

    const getAllStocks = async () => {
        let url = `${baseUrl}/instruments`;
        const response = await getReq({
            url
        });
        formatResponse(response);
    };

    const formatResponse = (response) => {
        const lines = response.split('\n');

        const headers = lines[0].split(',');

        const result = lines.slice(1).map((line) => {
            const values = line.split(',');
            return headers.reduce((acc, header, index) => {
                acc[header] = values[index];
                return acc;
            }, {});
        });

        setData(result);
    };

    return (
        <div className="stocks-wrapper">
            <div className="stocks-wrapper-table">
                <div className="stocks-wrapper-table-header">
                    <div>Symbol</div>
                    <div>Name</div>
                    <div>Sector</div>
                    <div>Valid till</div>
                    <div />
                </div>
                <div className="stocks-wrapper-table-body">
                    {data.map((item, index) => {
                        if (item.Symbol) {
                            return (
                                <div key={index} className="stocks-wrapper-table-body-item">
                                    <div>{item.Symbol}</div>
                                    <div>{item.Name}</div>
                                    <div>{item.Sector || '---'}</div>
                                    <div>{item.Validtill}</div>
                                    <img src={RightCaret} alt="Icon" />
                                </div>
                            );
                        } else return null;
                    })}
                </div>
            </div>
        </div>
    );
};

export default Stocks;

import React, { useEffect, useState } from 'react';
import './stocks.scss';

import { getReq } from '../../utils/api';
import { baseUrl } from '../../utils/base';

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
            <table>
                <thead>
                    <tr>
                        <th>Symbol</th>
                        <th>Name</th>
                        <th>Sector</th>
                        <th>Valid till</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item, index) => {
                        if (item) {
                            console.log('item', item);
                            return (
                                <tr key={index}>
                                    <td>{item.Symbol}</td>
                                    <td>{item.Name}</td>
                                    <td>{item.Sector}</td>
                                    <td>{item.Validtill}</td>
                                </tr>
                            );
                        } else return null;
                    })}
                </tbody>
            </table>
        </div>
    );
};

export default Stocks;

import React, { useState, useEffect } from 'react';
import './layout.scss';

//Components
import Stocks from '../pages/stocks';
import FuzzySearch from '../components/fuzzySearch';
import Quotes from '../pages/quotes';

//Helpers
import { getReq } from '../utils/api';
import { baseUrl } from '../utils/base';

const Layout = () => {
    const [isSelected, setIsSelected] = useState(false);
    const [stocksData, setStocksData] = useState([]);
    const [selectedStock, setSelectedStock] = useState(null);

    useEffect(() => {
        getAllStocks();
    }, []);

    const getAllStocks = async () => {
        let url = `${baseUrl}/instruments`;
        const response = await getReq(
            {
                url
            },
            true
        );
        formatResponse(response);
    };

    const getSelectedStock = async (symbol) => {
        let url = `${baseUrl}/quotes/${symbol}`;
        const response = await getReq(
            {
                url
            },
            false
        );
        const { success, payload } = response;
        if (success) {
            let newData = Object.values(payload);
            newData = newData.flat();
            setSelectedStock(newData);
        }
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

        setStocksData(result);
    };

    const getSelectedItem = (symbol) => {
        getSelectedStock(symbol);
        setIsSelected(true);
    };

    const goBack = () => {
        setIsSelected(false);
    };

    return (
        <div className="layout-wrapper">
            <div className="layout-wrapper-header">
                <h1>{isSelected ? 'Quotes' : 'Stocks'}</h1>
                <FuzzySearch />
            </div>
            {isSelected ? (
                <Quotes goBack={goBack} selectedStock={selectedStock} />
            ) : (
                <Stocks getSelectedItem={getSelectedItem} stocksData={stocksData} />
            )}
        </div>
    );
};

export default Layout;

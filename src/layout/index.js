import React, { useState, useEffect } from 'react';
import './layout.scss';

//Components
import Stocks from '../pages/stocks';
import CustomFuzzySearch from '../components/fuzzySearch';
import Quotes from '../pages/quotes';

//Helpers
import { getReq } from '../utils/api';
import { baseUrl } from '../utils/base';
import FuzzySearch from 'fuzzy-search';

//Assets
import RightCaret from '../assets/icons/right-caret.svg';

const Layout = () => {
    const [stocksData, setStocksData] = useState([]);
    const [selectedStock, setSelectedStock] = useState(null);
    const [selectedStockSymbol, setSelectedStockSymbol] = useState('');
    const [searchKeyword, setSearchKeyword] = useState('');

    // useEffect hook to fetch all stocks data when the component mounts
    useEffect(() => {
        getAllStocks();
    }, []);

    // function to fetch all stocks data from the API
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

    // function to fetch selected stock data from the API
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
            setSelectedStockSymbol(Object.keys(payload)[0]);
        }
    };

    // function to format the response data from the API
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
    };

    const searcher = new FuzzySearch(stocksData, ['Symbol', 'Name'], {
        caseSensitive: false
    });

    let result = searcher.search(searchKeyword);

    // function to handle changes to the search keyword
    const handleSearch = (value) => {
        setSearchKeyword(value);
    };

    // function to clear the search keyword
    const clearKeyword = () => {
        setSearchKeyword('');
    };

    return (
        <div className="layout-wrapper">
            <div className="layout-wrapper-header">
                <h1>{selectedStockSymbol?.length ? `Quotes :` : 'Stocks'}</h1>
                <span>{selectedStockSymbol || ''}</span>
                {selectedStockSymbol?.length ? (
                    <div onClick={() => setSelectedStockSymbol('')} className="layout-wrapper-header-back">
                        <img src={RightCaret} alt="Icon" />
                    </div>
                ) : (
                    <CustomFuzzySearch clearKeyword={clearKeyword} searchKeyword={searchKeyword} handleSearch={handleSearch} />
                )}
            </div>
            {selectedStockSymbol?.length ? (
                <Quotes selectedStock={selectedStock} />
            ) : (
                <Stocks getSelectedItem={getSelectedItem} stocksData={result} />
            )}
        </div>
    );
};

export default Layout;

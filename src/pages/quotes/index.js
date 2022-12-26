import React from 'react';
import DataTable from '../../components/dataTable';
import './quotes.scss';

const Quotes = (props) => {
    const { selectedStock, getSelectedStock, selectedStockSymbol } = props;

    return (
        <div className="quotes-wrapper pos-rel">
            <div className="pos-abs r-0p t-m20p fw600 fs-12 c-lightgrey">Last Updated : {new Date().toLocaleTimeString()}</div>
            <DataTable
                onClick={getSelectedStock}
                selectedStockSymbol={selectedStockSymbol}
                type={'quotes'}
                headerData={['Time', 'Price', 'Valid till']}
                bodyData={selectedStock}
            />
        </div>
    );
};

export default Quotes;

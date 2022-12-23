import React from 'react';
import DataTable from '../../components/dataTable';
import './quotes.scss';

const Quotes = (props) => {
    const { selectedStock, goBack } = props;

    return (
        <div className="quotes-wrapper">
            <DataTable type={'quotes'} headerData={['Time', 'Price', 'Valid till']} bodyData={selectedStock} onClick={goBack} />
        </div>
    );
};

export default Quotes;

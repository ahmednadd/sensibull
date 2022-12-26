import React from 'react';
import './stocks.scss';

import DataTable from '../../components/dataTable';

const Stocks = (props) => {
    const { getSelectedStock, stocksData } = props;

    return (
        <div className="stocks-wrapper">
            <DataTable
                type={'stocks'}
                headerData={['Symbol', 'Name', 'Sector', 'Valid till']}
                bodyData={stocksData}
                onClick={getSelectedStock}
            />
        </div>
    );
};

export default Stocks;

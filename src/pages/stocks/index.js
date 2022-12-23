import React from 'react';
import './stocks.scss';

import DataTable from '../../components/dataTable';

const Stocks = (props) => {
    const { getSelectedItem, stocksData } = props;

    return (
        <div className="stocks-wrapper">
            <DataTable
                type={'stocks'}
                headerData={['Symbol', 'Name', 'Sector', 'Valid till']}
                bodyData={stocksData}
                onClick={getSelectedItem}
            />
        </div>
    );
};

export default Stocks;

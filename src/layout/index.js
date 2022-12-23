import React from 'react';
import './layout.scss';

import Stocks from '../components/stocks';

const Layout = () => {
    return (
        <div className="layout-wrapper">
            <h1>Heading</h1>
            <Stocks />
        </div>
    );
};

export default Layout;

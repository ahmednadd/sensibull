import React from 'react';
import './header.scss';

//Assets
import SensibullLogo from '../../assets/icons/sensibull-logo.svg';

const Header = () => {
    return (
        <div className="header-wrapper">
            <img src={SensibullLogo} alt="Sensibull Logo" />
        </div>
    );
};

export default Header;

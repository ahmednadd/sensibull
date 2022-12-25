import React, { useEffect, useState } from 'react';
import './fuzzySearch.scss';

//Assets
import Clear from '../../assets/icons/clear.png';

const CustomFuzzySearch = (props) => {
    const { handleSearch, searchKeyword, clearKeyword } = props;

    const [leftStyle, setLeftStyle] = useState(80);

    useEffect(() => {
        setLeftStyle(10 + searchKeyword?.length * 10);
    }, [searchKeyword]);

    return (
        <div className="search-wrapper">
            <input placeholder="Search..." value={searchKeyword} onChange={(e) => handleSearch(e.target.value)} />
            {searchKeyword?.length ? (
                <img
                    onClick={clearKeyword}
                    style={searchKeyword.length > 40 ? { right: 0 } : { left: leftStyle }}
                    src={Clear}
                    alt="Clear Icon"
                />
            ) : null}
        </div>
    );
};

export default CustomFuzzySearch;

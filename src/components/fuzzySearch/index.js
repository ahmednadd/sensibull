import React from 'react';
import './fuzzySearch.scss';

const CustomFuzzySearch = (props) => {
    const { handleSearch, searchKeyword } = props;

    return (
        <div className="search-wrapper">
            <input placeholder="Search..." value={searchKeyword} onChange={(e) => handleSearch(e.target.value)} />
        </div>
    );
};

export default CustomFuzzySearch;

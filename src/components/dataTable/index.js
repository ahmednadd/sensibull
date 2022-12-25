import React, { useEffect, useState } from 'react';
import './dataTable.scss';

//Assets
import RightCaret from '../../assets/icons/right-caret.svg';
import Sort from '../../assets/icons/sort.png';
import SortUp from '../../assets/icons/sort-up.png';
import SortDown from '../../assets/icons/sort-down.png';

const DataTable = (props) => {
    const { headerData, bodyData, onClick, type } = props;

    const [sortType, setSortType] = useState('default');
    const [quotesArray, setQuotesArray] = useState([]);

    useEffect(() => {
        if (bodyData.length && type === 'quotes') setQuotesArray(bodyData);
    }, []);

    /**
     * To sort the table on the basis of timestamp
     */
    const getSorted = (item) => {
        let newArray = bodyData;
        if (type !== 'quotes' && item.toLowerCase() !== 'time') {
            return;
        }
        if (sortType === 'default') {
            setSortType('asc');
            newArray.sort(function (a, b) {
                return new Date(a.time) - new Date(b.time);
            });
        } else if (sortType === 'asc') {
            setSortType('dsc');
            newArray.sort(function (a, b) {
                return new Date(b.time) - new Date(a.time);
            });
        } else {
            setSortType('default');
            setQuotesArray(bodyData);
            return;
        }

        setQuotesArray(newArray);
    };

    return (
        <div className="wrapper-table">
            <div
                className="wrapper-table-header noselect"
                style={{
                    gridTemplateColumns: type === 'stocks' ? '1fr 2fr 1fr 1fr 30px' : '1fr 2fr 1fr'
                }}
            >
                {headerData.map((item, index) => {
                    return (
                        <div key={index} onClick={() => getSorted(item)}>
                            {item}
                            {type === 'quotes' && item.toLowerCase() === 'time' ? (
                                <img
                                    className="h-10 ml-5"
                                    src={sortType === 'default' ? Sort : sortType === 'asc' ? SortUp : SortDown}
                                    alt="Sort Icon"
                                />
                            ) : null}
                        </div>
                    );
                })}
                {type === 'stocks' && <div />}
            </div>
            <div className="wrapper-table-body">
                {type === 'stocks'
                    ? bodyData?.map((item, index) => {
                          if (item.Symbol) {
                              return (
                                  <div
                                      onClick={() => onClick(item.Symbol)}
                                      key={index}
                                      className="wrapper-table-body-item wrapper-table-body-stocks"
                                  >
                                      <div>{item.Symbol}</div>
                                      <div>{item.Name}</div>
                                      <div>{item.Sector || '---'}</div>
                                      <div>{item.Validtill}</div>
                                      <img src={RightCaret} alt="Icon" />
                                  </div>
                              );
                          } else return null;
                      })
                    : quotesArray?.map((item, index) => {
                          if (item) {
                              return (
                                  <div key={index} className="wrapper-table-body-item wrapper-table-body-quotes">
                                      <div>{item.time}</div>
                                      <div>{item.price || '---'}</div>
                                      <div>{item.valid_till || '---'}</div>
                                  </div>
                              );
                          } else return null;
                      })}
                {!bodyData.length && <div className="wrapper-table-body-nodata">We couldn't find what you're looking for.</div>}
            </div>
        </div>
    );
};

export default DataTable;

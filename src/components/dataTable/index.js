import React from 'react';
import './dataTable.scss';

//Assets
import RightCaret from '../../assets/icons/right-caret.svg';

const DataTable = (props) => {
    const { headerData, bodyData, onClick, type } = props;

    return (
        <div className="wrapper-table">
            <div
                className="wrapper-table-header"
                style={{
                    gridTemplateColumns: type === 'stocks' ? '1fr 2fr 1fr 1fr 30px' : '1fr 1fr 1fr'
                }}
            >
                {headerData.map((item, index) => {
                    return <div key={index}>{item}</div>;
                })}
                {type === 'stocks' && <div />}
            </div>
            <div className="wrapper-table-body">
                {bodyData?.map((item, index) => {
                    if (item.Symbol && type === 'stocks') {
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
                    } else if (type === 'quotes') {
                        return (
                            <div
                                onClick={() => onClick(item.Symbol)}
                                key={index}
                                className="wrapper-table-body-item wrapper-table-body-quotes"
                            >
                                <div>{item.time}</div>
                                <div>{item.price || '---'}</div>
                                <div>{item.valid_till || '---'}</div>
                            </div>
                        );
                    } else return null;
                })}
            </div>
        </div>
    );
};

export default DataTable;

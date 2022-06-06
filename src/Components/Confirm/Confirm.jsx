import React from 'react';
import './Confirm.css';

const Confirm = ({
    show = true,
    mess = 'lsdjfalj',
    btn = [],
    btnWidth="100px"
}) => {
    return (
        <div className={`confirm-outer ${show && 'confirm-show'}`}>
            <div className="confirm-inner">
                <p>{mess}</p>
                <div className="confirm-inner-btn-cont">
                    {btn.map((e, i) => (
                        <button
                            key={i}
                            onClick={e.onClick}
                            style={{width: btnWidth}}
                            className={`confirm-inner-btn-${e.type}`}
                        >
                            {e.title}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Confirm;

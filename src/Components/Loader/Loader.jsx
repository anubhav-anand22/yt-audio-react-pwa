import React from 'react';
import Context from '../../Helpers/Context';
import './Loader.css';

const Loader = () => {
    const {loaderInfo} = React.useContext(Context);

    return <div className={`loader ${loaderInfo?.show && 'loader-show'}`}>
        <div className="loader-inner">
            <div className="loader-circle">
                <div className="loader-circle-inner"></div>
            </div>
            {loaderInfo.message && <p className="loader-message">{loaderInfo.message}</p>}
        </div>
    </div>
};

export default Loader
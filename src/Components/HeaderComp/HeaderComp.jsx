import React from 'react';
import './HeaderComp.css';
import { MdOutlineArrowBackIos, MdMenu } from 'react-icons/md';
import { Link } from 'react-router-dom';
import Context from '../../Helpers/Context';

const HeaderComp = ({ back = false, drawr = true }) => {
    const {setIsDrawrOpen} = React.useContext(Context);
    return (
        <header className="header-comp">
            <div className="header-comp-section-one">
                {back && (
                    <MdOutlineArrowBackIos className="header-comp-back-icon" />
                )}
                <h1 className="header-comp-title">
                    <Link className="header-comp-title-link" to="/">
                        YTA
                    </Link>
                </h1>
            </div>
            <div className="header-comp-section-two">
                {drawr && <MdMenu className="header-comp-menu-icon" onClick={() => setIsDrawrOpen(true)} />}
            </div>
        </header>
    );
};

export default HeaderComp;

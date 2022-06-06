import React from 'react';
import './DrawrComp.css';
import Context from '../../Helpers/Context';
import { MdOutlineCancel, MdOutlineSearch } from 'react-icons/md';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';

const DrawrComp = () => {
    const navigate = useNavigate();
    const loca = useLocation();
    const { isDrawrOpen, userInfo, setIsDrawrOpen } = React.useContext(Context);

    return (
        <div className={`drawr-comp ${isDrawrOpen && 'drawr-comp-open'}`}>
            <div className={`drawr-comp-outer`}></div>
            <div className="drawr-comp-inner">
                <form className="drawr-comp-inner-search-form">
                    <input
                        type="search"
                        className="drawr-comp-inner-search-input"
                        placeholder="Search video or playlist"
                    />
                    <button className="drawr-comp-inner-search-btn">
                        <MdOutlineSearch className="drawr-comp-inner-search-icon" />
                    </button>
                </form>
                {userInfo && userInfo.token === '' && (
                    <div className="drawr-comp-inner-auth-coct">
                        <button
                            onClick={() => {
                                navigate(`/signup/${btoa(loca.pathname)}`);
                                setIsDrawrOpen(false);
                            }}
                        >
                            Sign up
                        </button>
                        <button
                            onClick={() => {
                                navigate(`/login/${btoa(loca.pathname)}`);
                                setIsDrawrOpen(false);
                            }}
                        >
                            Log in
                        </button>
                    </div>
                )}
                <DrawrItem text="Home" to="/" setIsDrawrOpen={setIsDrawrOpen} />
                {userInfo?.name && <DrawrItem text={`User (${userInfo?.name?.slice(0, 10)})`} to="/me" setIsDrawrOpen={setIsDrawrOpen} />}
            </div>
            <MdOutlineCancel
                className="drawr-comp-close-drawr-icon"
                onClick={() => setIsDrawrOpen(false)}
            />
        </div>
    );
};

const DrawrItem = ({ text = '', to = '', setIsDrawrOpen }) => {
    const [isActive, setIsActive] = React.useState(false);

    const isActiveHandler = ({ isActive }) => {
        setTimeout(() => {
            setIsActive(isActive);
        }, 50);
        return `drawr-comp-item-navlink ${
            isActive && 'drawr-comp-item-navlink-active'
        }`;
    };

    const onItemClickHandler = () => {
        if (isActive) {
            setIsDrawrOpen(false);
        } else {
            setTimeout(() => {
                setIsDrawrOpen(false);
            }, 400);
        }
    };

    return (
        <div className="drawr-comp-inner-item">
            <NavLink to={to} className={isActiveHandler}>
                <p onClick={onItemClickHandler}>{text}</p>
            </NavLink>
        </div>
    );
};

export default DrawrComp;

import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import HeaderComp from '../../Components/HeaderComp/HeaderComp';
import Context from '../../Helpers/Context';
import { MdVisibility, MdVisibilityOff } from 'react-icons/md';
import './UserPage.css';
import Confirm from '../../Components/Confirm/Confirm';
import {
    deleteUserHandler,
    logoutUserHandler,
    updateUserHandler,
} from './UserPageFn';

const UserPage = () => {
    const navigate = useNavigate();
    const loca = useLocation();

    const { userInfo, setAlertInfo, setUserInfo, setLoaderInfo } = React.useContext(Context);

    const [name, setName] = React.useState(userInfo?.name || '');
    const [password, setPassword] = React.useState('');
    const [hasChanged, setHasChanged] = React.useState(false);
    const [isPasswordShow, setIsPasswordShow] = React.useState(false);
    const [showDeleteConfirmBox, setShowDeleteConfirmBox] =
        React.useState(false);
    const [showLogoutConfirmBox, setShowLogoutConfirmBox] =
        React.useState(false);

    React.useEffect(() => {
        if (!userInfo?.name) {
            navigate(`/login/${btoa(loca.pathname)}`);
        }
    }, [userInfo, navigate, loca]);

    return (
        <div className="user-page">
            <HeaderComp />
            <Confirm
                show={showDeleteConfirmBox}
                btn={[
                    {
                        title: 'Continue',
                        onClick: () => {
                            deleteUserHandler({
                                setAlertInfo,
                                setUserInfo,
                                userInfo,
                                setLoaderInfo
                            });
                        },
                        type: 'danger',
                    },
                    {
                        title: 'Cancel',
                        onClick: () => {
                            setShowDeleteConfirmBox(false);
                        },
                        type: 'good',
                    },
                ]}
                mess="Are you sure you want to delete your YTA account?"
            />
            <Confirm
                show={showLogoutConfirmBox}
                btn={[
                    {
                        title: 'Continue',
                        onClick: () => {
                            logoutUserHandler({ setAlertInfo, setUserInfo, setLoaderInfo, userInfo});
                        },
                        type: 'danger',
                    },
                    {
                        title: 'Cancel',
                        onClick: () => {
                            setShowLogoutConfirmBox(false);
                        },
                        type: 'good',
                    },
                ]}
                mess="Are you sure you want to log out?"
            />
            <div className="user-page-main">
                <div className="user-page-info-cont">
                    <div className="user-page-info-input-cont">
                        <p>Name</p>
                        <input
                            type="text"
                            placeholder="Name"
                            value={name}
                            onChange={(e) => {
                                if (!hasChanged) setHasChanged(true);
                                setName(e.target.value);
                            }}
                            className="user-page-info-name-input"
                        />
                    </div>
                    <div className="user-page-info-input-cont">
                        <p>Password</p>
                        <div className="user-page-info-password-input-cont">
                            <input
                                type={isPasswordShow ? 'text' : 'password'}
                                placeholder="Password"
                                value={password}
                                onChange={(e) => {
                                    if (!hasChanged) setHasChanged(true);
                                    setPassword(e.target.value);
                                }}
                                className="user-page-info-password-input"
                            />
                            {isPasswordShow ? (
                                <MdVisibility
                                    className="user-page-icon"
                                    onClick={() => setIsPasswordShow(false)}
                                />
                            ) : (
                                <MdVisibilityOff
                                    className="user-page-icon"
                                    onClick={() => setIsPasswordShow(true)}
                                />
                            )}
                        </div>
                    </div>
                    <button
                        className="user-page-btn-update"
                        disabled={!hasChanged}
                        onClick={() => {
                            updateUserHandler({
                                setAlertInfo,
                                name,
                                password,
                                setUserInfo,
                                userInfo,
                                setLoaderInfo
                            });
                            setHasChanged(false);
                        }}
                    >
                        UPDATE
                    </button>
                    <button
                        className="user-page-btn-logout"
                        onClick={() => setShowLogoutConfirmBox(true)}
                    >
                        LOG OUT
                    </button>
                    <button
                        className="user-page-btn-delete"
                        onClick={() => setShowDeleteConfirmBox(true)}
                    >
                        DELETE ACCOUNT
                    </button>
                </div>
            </div>
        </div>
    );
};

export default UserPage;

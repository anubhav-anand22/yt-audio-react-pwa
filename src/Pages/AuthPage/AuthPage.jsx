import React from 'react';
import './AuthPage.css';
import Header from '../../Components/HeaderComp/HeaderComp';
import { MdVisibility, MdVisibilityOff } from 'react-icons/md';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Context from '../../Helpers/Context';
import { onSubmitHandler } from './AuthPageFn';

const AuthPage = ({ type }) => {
    const { setAlertInfo, setUserInfo, setLoaderInfo } = React.useContext(Context);
    const navigate = useNavigate();
    const params = useParams();

    const [isPasswordVisible, setIsPasswordVisible] = React.useState(false);
    const [name, setName] = React.useState('');
    const [password, setPassword] = React.useState('');

    React.useEffect(() => {
        setPassword('');
        setName('');
    }, []);

    return (
        <div className="auth-page">
            <Header drawr={false} back={true} />
            <div className="auth-page-outer">
                <form
                    className="auth-page-inner"
                    onSubmit={(e) =>
                        onSubmitHandler(
                            e,
                            setAlertInfo,
                            password,
                            name,
                            navigate,
                            setUserInfo,
                            params,
                            setLoaderInfo,
                            type
                        )
                    }
                >
                    <h1>{type === 'login' ? 'Log in' : 'Sign up'}</h1>
                    <input
                        type="text"
                        className="auth-page-inner-input-name"
                        placeholder="Name"
                        required={true}
                        maxLength={25}
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <div className="auth-page-inner-input-password-cont">
                        <input
                            type={isPasswordVisible ? 'text' : 'password'}
                            className="auth-page-inner-input-password"
                            required={true}
                            maxLength={40}
                            minLength={8}
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        {isPasswordVisible ? (
                            <MdVisibility
                                className="auth-page-icon"
                                onClick={() => setIsPasswordVisible(false)}
                            />
                        ) : (
                            <MdVisibilityOff
                                className="auth-page-icon"
                                onClick={() => setIsPasswordVisible(true)}
                            />
                        )}
                    </div>
                    <button
                        type="submit"
                        className="auth-page-inner-form-submit-btn"
                    >
                        {type === 'login' ? 'Log in' : 'Sign up'}
                    </button>
                    <p className="auth-page-inner-form-text-btn">
                        {type === 'login'
                            ? "Don't have an account"
                            : 'Already have an account'}
                        , Switch to{' '}
                        <Link
                            to={type === 'login' ? '/signup/' + params.r : '/login/' + params.r}
                            className="auth-page-inner-form-text-btn-link"
                        >
                            {type === 'login' ? 'Sign up' : 'Log in'}
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default AuthPage;

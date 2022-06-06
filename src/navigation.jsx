import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Alert from './Components/Alert/Alert';
import DrawrComp from './Components/DrawrComp/DrawrComp';
import Loader from './Components/Loader/Loader';
import { autoLogin } from './Helpers/autoLgoing';
import Context from './Helpers/Context';
import AuthPage from './Pages/AuthPage/AuthPage';
import FourOFour from './Pages/fourOFour/fourOFour';
import HomePage from './Pages/homePage/homePage';
import PlayerPage from './Pages/PlayerPage/PlayerPage';
import UserPage from './Pages/UserPage/UserPage';

const Navigation = () => {
    const { setUserInfo} = React.useContext(Context);

    React.useEffect(() => {
        autoLogin({ setUserInfo});
    }, [])

    return (
        <div>
            <BrowserRouter>
                <DrawrComp />
                <Alert />
                <Loader />
                <Routes>
                    <Route path='/' element={<HomePage />} />
                    <Route path='/v/:id' element={<PlayerPage type="v" />} />
                    <Route path='/list/:id' element={<PlayerPage type="list" />} />
                    <Route path='/login/:r' element={<AuthPage type="login" />} />
                    <Route path='/signup/:r' element={<AuthPage type="signup" />} />
                    <Route path='/me' element={<UserPage />} />
                    <Route path='*' element={<FourOFour />} />
                </Routes>
            </BrowserRouter>
        </div>
    )
};

export default Navigation;
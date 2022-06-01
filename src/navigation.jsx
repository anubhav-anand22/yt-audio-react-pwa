import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import DrawrComp from './Components/DrawrComp/DrawrComp';
import FourOFour from './Pages/fourOFour/fourOFour';
import HomePage from './Pages/homePage/homePage';
import PlayerPage from './Pages/PlayerPage/PlayerPage';

const Navigation = () => {
    return (
        <div>
            <BrowserRouter>
                <DrawrComp />
                <Routes>
                    <Route path='/' element={<HomePage />} />
                    <Route path='/v/:id' element={<PlayerPage type="v" />} />
                    <Route path='/list/:id' element={<PlayerPage type="list" />} />
                    <Route path='*' element={<FourOFour />} />
                </Routes>
            </BrowserRouter>
        </div>
    )
};

export default Navigation;
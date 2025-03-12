import React from 'react';
import { HashRouter, Route, Routes } from 'react-router-dom';
import FrontPage from '../pages/FrontPage';
import MenuPage from '../pages/MenuPage';

const Router = () => {
    return (
        <HashRouter>
            <Routes>
                <Route path="/" element={<FrontPage />} />
                <Route path="/MenuPage" element={<MenuPage />} />
                {/* <Route path="/payment" component={Payment} /> */}
            </Routes>
        </HashRouter>
    );
}

export default Router;
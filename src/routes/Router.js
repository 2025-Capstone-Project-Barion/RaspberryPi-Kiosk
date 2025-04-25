import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import FrontPage from '../pages/FrontPage';
import MenuPage from '../pages/MenuPage';

const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<FrontPage />} />
                <Route path="/MenuPage" element={<MenuPage />} />
                {/* <Route path="/payment" component={Payment} /> */}
            </Routes>
        </BrowserRouter>
    );
}

export default Router;
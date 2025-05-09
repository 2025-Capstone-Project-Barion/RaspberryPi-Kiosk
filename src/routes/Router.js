import { BrowserRouter, Route, Routes } from 'react-router-dom';
import FrontPage from '../pages/FrontPage';
import MenuPage from '../pages/MenuPage';
import PaymentPage from '../pages/PaymentPage';
import PaymentSuccessPage from '../pages/PaymentSuccessPage';
import PaymentFailPage from '../pages/PaymentFailPage';

const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<FrontPage />} />
                <Route path="/MenuPage" element={<MenuPage />} />
                <Route path="/payment" element={<PaymentPage />} />
                <Route path="/payment/success" element={<PaymentSuccessPage />} />
                <Route path="/payment/fail" element={<PaymentFailPage />} />
            </Routes>
        </BrowserRouter>
    );
}

export default Router;
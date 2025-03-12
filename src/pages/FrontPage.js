import React from 'react';
import '../styles/Front/frontPage.css';

import { Link } from 'react-router-dom';
import MenuPage from './MenuPage';
const FrontPage = () => {
    return (
        <div className="container">
            <div className="welcome-text">
                어서오세요.
            </div>
            <div className="order-text">
                여기에서 주문할 수 있어요!s
            </div>
            <div className="performance-text">
                배리어프리 키오스크 플렛폼<br />
                Barion입니다.
            </div>
            {/* <Link to="/MenuPage" className="menu-button">     */}
            <Link to="/PracMenu" className="menu-button">
                <button>
                    주문하기
                </button>
            </Link>
        </div>
    );
}

export default FrontPage;
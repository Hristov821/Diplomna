import React from 'react';
import { Layout } from 'antd';

const { Footer } = Layout;

const FooterComponent = () => {
    return (
        <div id="footer">
        <Footer style={{ textAlign: 'center', position: 'sticky', zIndex: 1, width: '100%', bottom: '150px' }}>Дипломна работа Христо Христов</Footer>
        </div>
    );
};

export default FooterComponent;
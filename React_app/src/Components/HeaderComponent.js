import React from 'react';
import { Layout, Menu } from 'antd';
import useRedirect from '../Utils/RedirectHook'

const { Header } = Layout;

const HeaderComponent = ({ global_state, update_global_state }) => {
    const [_, redirect] = useRedirect()

    return (
        <div>
        <Header style={{ position: 'sticky', zIndex: 1, width: '100%'}}>
            <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
                <Menu.Item key="1" onClick={() => {redirect('/home')}}>Home</Menu.Item>
                <Menu.Item key="2" onClick={() => {redirect('/movie_card')}}>List Movies</Menu.Item>
                <Menu.Item key="3" onClick={() => {redirect('/list_users')}}>List Users</Menu.Item>
                <Menu.Item key="4" onClick={() => {redirect('/followers_based_recomendatation')}}>Followers movie recomendation</Menu.Item>
            </Menu>
        </Header>
        </div>
    );
};

export default HeaderComponent;
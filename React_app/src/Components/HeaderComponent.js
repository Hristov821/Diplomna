import React from 'react';
import { Layout, Menu } from 'antd';
import useRedirect from '../Utils/RedirectHook'

const { Header } = Layout;

const HeaderComponent = ({ global_state, update_global_state }) => {
    const [_, redirect] = useRedirect()

    const log_out = () => {
        var log_out_state = {
            'logged_in':false
        }

        update_global_state(log_out_state)
    }

    return (
        <div>
            <Header style={{ position: 'sticky', zIndex: 1, width: '100%' }}>
                {(() => {
                    switch (global_state.logged_in) {
                        case true: return <Menu theme="dark" mode="horizontal">
                            <Menu.Item key="movie_card" onClick={() => { redirect('/movie_card') }}>List Movies</Menu.Item>
                            <Menu.Item key="list_users" onClick={() => { redirect('/list_users') }}>List Users</Menu.Item>
                            <Menu.Item key="followers_based_recomendatation" onClick={() => { redirect('/followers_based_recomendatation') }}>Followers movie recomendation</Menu.Item>
                            <Menu.Item key="user_recomendation" onClick={() => { redirect('/user_recomendation') }}>List Users</Menu.Item>
                            <Menu.Item key="log_out" onClick={() => { log_out() }}>Log Out</Menu.Item>
                        </Menu>
                        case false: return <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['Login']}>
                            <Menu.Item key="Login" onClick={() => { redirect('/login') }}>Login</Menu.Item>
                            <Menu.Item key="Register" onClick={() => { redirect('/register') }}>Register</Menu.Item>
                        </Menu>
                    }
                })()}
            </Header>
        </div>
    );
};

export default HeaderComponent;
import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { Layout } from 'antd';
import 'antd/dist/antd.css';

import LoginComponent from './Components/LoginComponent';
import RegisterComponent from './Components/RegisterComponent'
import TestComponent from './Components/TestComponent';

import useUserIsLogged from './Utils/LoggedHook'

const { Content } = Layout;

function App() {
  const [is_logged, set_logged_in_status] = useUserIsLogged()

  return (
    <BrowserRouter>
      <Layout className='layout' >
        {/* <AppHeader /> */}
        <Content style={{ padding: '50px' }}>
          <div style={{ background: '#fff', padding: 24, minHeight: 280 }}>
            <Switch>
              {/* <Route path='/login' exact component={LoginComponent} /> */}
              {(() => {
                switch (is_logged) {
                  case true: return <Switch>
                    {/* <Route path='/' exact render={() => <TestComponent clb={set_logged_in_status} decrees={set_logged_in_status} />} /> */}
                    <div>State is</div>
                  </Switch>
                  case false: return <Switch>
                     <Route path='/login' exact render={() => <LoginComponent clb={set_logged_in_status} decrees={set_logged_in_status} />} />
                     <Route path='/register' exact render={() => <RegisterComponent/>} />
                  </Switch>
                }
              })()}
              {/* <Redirect from='/login' to='/' /> */}
            </Switch>
          </div>
        </Content>
        {/* <AppFooter /> */}
      </Layout>
    </BrowserRouter>
  );
}

export default App;

// {(props) => <testec {...props} title={`Props through render`}/>}
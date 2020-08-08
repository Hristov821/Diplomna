import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Layout } from 'antd';

import 'antd/dist/antd.css';

import LoginComponent from './Components/LoginComponent';
import RegisterComponent from './Components/RegisterComponent'
import FooterComponent from './Components/FooterComponent'
import HeaderComponent from './Components/HeaderComponent'
import HomeComponent from './Components/HomeComponent'
import MovieInfoComponent from './Components/MovieInfoComponent'
import MovieCardGridComponent from './Components/MovieCardGridComponent'
import ListUsersComponent from './Components/ListUsersComponent'
import UserInfoComponent from './Components/UserInfoComponent'


import useGlobalState from './Utils/GlobalStateHook'

const { Content } = Layout;

function App() {
  const [global_state, update_global_state] = useGlobalState({'logged_in':false, access_token:'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE1OTMzMzM2NDcsIm5iZiI6MTU5MzMzMzY0NywianRpIjoiZTlhMGM4ODQtMDIxOC00YTA4LTlkYTctMTRmNDA3MTlmNmQ2IiwiaWRlbnRpdHkiOnsidXNlcm5hbWUiOiJpY2tvMjMxMzEifSwiZnJlc2giOmZhbHNlLCJ0eXBlIjoiYWNjZXNzIn0.jMQHcAcEEi-R9CdzWh5zq8mMuO9l3jWGtaVKuS4fDuk'})

  return (
    <>
      <BrowserRouter>
        <HeaderComponent global_state={global_state} update_global_state={update_global_state}/>
        <Layout>
          <Content style={{backgroundColor:'white',}}>
            <Route path='/home' exact render={() => <HomeComponent global_state={global_state} update_global_state={update_global_state} />} />
              <Switch>
                {(() => {
                  switch (global_state.logged_in) {
                    case true: return <Switch>
                    </Switch>
                    case false: return <Switch>
                      <Route path='/login' exact render={() => <LoginComponent global_state={global_state} update_global_state={update_global_state} />} />
                      <Route path='/register' exact render={() => <RegisterComponent global_state={global_state} update_global_state={update_global_state} />} />
                      <Route path='/movie_card' exact render={() => <MovieCardGridComponent global_state={global_state} update_global_state={update_global_state} />} />
                      <Route path='/movie_info' exact render={() => <MovieInfoComponent global_state={global_state} update_global_state={update_global_state} />} />
                      <Route path='/list_users' exact render={() => <ListUsersComponent global_state={global_state} update_global_state={update_global_state} />} />
                      <Route path='/user_info' exact render={() => <UserInfoComponent global_state={global_state} update_global_state={update_global_state} />} />
                    </Switch>
                  }
                })()}
              </Switch>
          </Content>
        </Layout>
      </BrowserRouter>
      <FooterComponent />
    </>
  );
}

export default App;
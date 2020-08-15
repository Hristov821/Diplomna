import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { Layout } from 'antd';

import 'antd/dist/antd.css';

import LoginComponent from './Components/LoginComponent';
import RegisterComponent from './Components/RegisterComponent'
import FooterComponent from './Components/FooterComponent'
import HeaderComponent from './Components/HeaderComponent'
import MovieInfoComponent from './Components/MovieInfoComponent'
import MovieCardGridComponent from './Components/MovieCardGridComponent'
import ListUsersComponent from './Components/ListUsersComponent'
import UserInfoComponent from './Components/UserInfoComponent'
import FollowersBasedRecomendationComponent from './Components/FollowersBasedRecomendationComponent'
import RecomendPeopleBasedOnPeopleComponent from './Components/RecomendPeopleBasedOnPeopleComponent'


import useGlobalState from './Utils/GlobalStateHook'

const { Content } = Layout;

function App() {
  const [global_state, update_global_state] = useGlobalState({'logged_in':false})

  return (
    <>
      <BrowserRouter>
        <HeaderComponent global_state={global_state} update_global_state={update_global_state}/>
        <Layout>
          <Content style={{backgroundColor:'white',}}>
              <Switch>
                {(() => {
                  switch (global_state.logged_in) {
                    case true: return <Switch>
                      <Route path='/movie_card' exact render={() => <MovieCardGridComponent global_state={global_state} update_global_state={update_global_state} />} />
                      <Route path='/movie_info' exact render={() => <MovieInfoComponent global_state={global_state} update_global_state={update_global_state} />} />
                      <Route path='/list_users' exact render={() => <ListUsersComponent global_state={global_state} update_global_state={update_global_state} />} />
                      <Route path='/user_info' exact render={() => <UserInfoComponent global_state={global_state} update_global_state={update_global_state} />} />
                      <Route path='/followers_based_recomendatation' exact render={() => <FollowersBasedRecomendationComponent global_state={global_state} update_global_state={update_global_state} />} />
                      <Route path='/user_recomendation' exact render={() => <RecomendPeopleBasedOnPeopleComponent global_state={global_state} update_global_state={update_global_state} />} />
                    </Switch>
                    case false: return <Switch>
                      <Route path='/login' exact render={() => <LoginComponent global_state={global_state} update_global_state={update_global_state} />} />
                      <Route path='/register' exact render={() => <RegisterComponent global_state={global_state} update_global_state={update_global_state} />} />
                      <Route render={() => <Redirect to="/login" />} />
                    </Switch>
                  }
                })()}
                <Route exact path="/">
                  <Redirect to="/login" />
                </Route>
              </Switch>
          </Content>
        </Layout>
      </BrowserRouter>
      <FooterComponent />
    </>
  );
}

export default App;
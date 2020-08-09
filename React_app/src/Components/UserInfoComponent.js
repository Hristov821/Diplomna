
import React from 'react';
import { useLocation } from "react-router-dom";
import { Form, Button, Skeleton } from 'antd';
import { postData, getData } from '../Utils/FetchUtils'
import { useState, useEffect } from 'react';
import useRedirect from '../Utils/RedirectHook'
import useLocalState from '../Utils/LocalStateHook'

const UserInfoComponent = () => {
    const location = useLocation();
    const [_, redirect] = useRedirect()
    const [user, global_state] = location.state
    const [local_state, update_local_state] = useLocalState({ "loaded": false })

    if (global_state.username === user.username) {
        redirect("/home")
    }

    useEffect(() => {
        async function setup() {
            const followers = await get_followers()
            const following = await get_following()
            const rated_movies = await get_rated_movies()
            
            update_local_state(
                {
                    "loaded": true,
                    "followers": followers,
                    "following": following,
                    "rated_movies": rated_movies
                })
          }
          setup()
    }, []);


    const follow_user = () => {
        const url = "api/user_following/"
        const data = {
            'user_to_follow': user.username,
            'access_token': global_state.access_token
        }

        postData(url, data).then(response => {
            if (response.status === false) {
                return
            }
        });
    }

    const get_followers = () => {
        const url = "api/user_followers/"
        const data = {
            'username': user.username,
            'access_token': global_state.access_token,
        }

        return getData(url, data).then(response => {
            if (response.status === false) {
                return
            }
            return response.response.followers
        });
    }

    const get_following = () => {
        const url = "api/user_following/"
        const data = {
            'username': user.username,
            'access_token': global_state.access_token,
        }

        return getData(url, data).then(response => {
            if (response.status === false) {
                return
            }
            return response.response.following
        });
    }

    const get_rated_movies = values => {
        const url = "api/user_rating/"

        const data = {
          'username': user.username,
          'access_token': global_state.access_token
        }
    
        return getData(url, data).then(response => {
          if (response.status === false) {
            return
          }
            return response.response.movies
        });
    }

    const render_choice = (choice) =>{
        if(choice === "movies"){
            return (<Row type="flex" style={{ alignItems: 'center' }} align="midle" justify="center">
            {local_state.rated_movies.map(item => <Col key={item.id}><MovieCardComponent movie={item}  global_state={global_state}/></Col>)}
          </Row>)
        }
    }

    return (
        <div class="movie_info">
            <div class="movie_content">
                <img
                    alt="example"
                    style={{ height: '600px', width: '900px' }}
                    src={user.poster}
                />
                <div>User: {user.username}</div>
                <div>
                    <div>
                        {(function () {
                            switch (local_state.loaded) {
                                case true:
                                    return <>
                                        <Form
                                            name="basic"
                                        >
                                            <Form.Item>
                                                <Button
                                                    type="primary"
                                                    disabled={false}
                                                    onClick={() => {
                                                        console.log("kilkam")
                                                    }}
                                                    style={{ margin: '2px' }}
                                                >
                                                    List Rated Movies
                                                </Button>
                                                <Button
                                                    type="primary"
                                                    disabled={false}
                                                    onClick={() => {
                                                        console.log("kilkam")
                                                    }}
                                                    style={{ margin: '2px' }}
                                                >
                                                    List Followers
                                                </Button>
                                                <Button
                                                    type="primary"
                                                    disabled={false}
                                                    onClick={() => {
                                                        console.log("kilkam")
                                                    }}
                                                    style={{ margin: '2px' }}
                                                >
                                                    List Following
                                                </Button>
                                                <Button
                                                    type="primary"
                                                    disabled={false}
                                                    onClick={() => {
                                                        follow_user()
                                                    }}
                                                    style={{ margin: '2px' }}
                                                >
                                                    Follow_user
                                            </Button>
                                            </Form.Item>
                                        </Form>

                                    </>;
                                case false:
                                    return <Skeleton />;
                                default:
                                    return null;
                            }
                        })()}
                    </div>

                </div>
            </div>
        </div>
    );
};

export default UserInfoComponent
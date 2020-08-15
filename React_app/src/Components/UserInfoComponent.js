
import React from 'react';
import { useLocation } from "react-router-dom";
import { Form, Button, Skeleton, Row, Col } from 'antd';
import { postData, getData } from '../Utils/FetchUtils'
import { useEffect } from 'react';
import MovieCardComponent from './MovieCardComponent'
import UserCardComponent from './UserCardComponent'
import useRedirect from '../Utils/RedirectHook'
import useLocalState from '../Utils/LocalStateHook'

const UserInfoComponent = () => {
    const location = useLocation();
    const [_, redirect] = useRedirect()
    const [user, global_state] = location.state
    const [local_state, update_local_state] = useLocalState({
        "loaded": false,
        "current_user": user.username,
        "view_logged_user": false
    })

    if (global_state.username === user.username && local_state.view_logged_user === false) {
        update_local_state({
            "user_follows": true,
            "view_logged_user": true,
        })
    }

    if (user.username != local_state.current_user) {
        window.location.reload()
    }

    useEffect(() => {
        async function setup() {
            const followers = await get_followers()
            const following = await get_following()
            const rated_movies = await get_rated_movies()
            const user_follows = await list_user_is_followed()

            update_local_state(
                {
                    "loaded": true,
                    "followers": followers,
                    "following": following,
                    "rated_movies": rated_movies,
                    "user_follows": user_follows
                })
        }
        setup()
    }, [local_state.current_user]);


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
            update_local_state({ "user_follows": true })
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

    const get_rated_movies = () => {
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

    const list_user_is_followed = () => {
        const url = "api/user_followers/"
        const data = {
            'current_username': local_state.current_user,
            'username': user.username,
            'access_token': global_state.access_token
        }

        return getData(url, data).then(response => {
            if (response.status === false) {
                return
            }

            return response.response.user_follows
        });
    }

    const render_choice = () => {
        if (local_state.choice === "movies") {
            if (local_state.rated_movies.length === 0) {
                return <p>User '{user.username}' does not rated movies</p>
            }
            return (<Row type="flex" style={{ alignItems: 'center' }} align="midle" justify="center">
                {local_state.rated_movies.map(item => <Col key={item.id}><MovieCardComponent movie={item.movie} global_state={global_state} /></Col>)}
            </Row>)
        }
        else if (local_state.choice === "followers") {
            if (local_state.followers.length === 0) {
                return <p>User '{user.username}' doesn't have followers</p>
            }
            return (<Row type="flex" style={{ alignItems: 'center' }} align="midle" justify="center">
                {local_state.followers.map(item => <Col key={item.id}><UserCardComponent user_entry={item} global_state={global_state} /></Col>)}
            </Row>
            )
        }
        else if (local_state.choice === "following") {
            if (local_state.following.length === 0) {
                return <p>User '{user.username}' does not follow anyone</p>
            }
            return (<Row type="flex" style={{ alignItems: 'center' }} align="midle" justify="center">
                {local_state.following.map(item => <Col key={item.id}><UserCardComponent user_entry={item} global_state={global_state} /></Col>)}
            </Row>
            )
        }
        else {
            return <p>Choice some listing...</p>
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
                                                        update_local_state({ "choice": "movies" })
                                                    }}
                                                    style={{ margin: '2px' }}
                                                >
                                                    List Rated Movies
                                                </Button>
                                                <Button
                                                    type="primary"
                                                    disabled={false}
                                                    onClick={() => {
                                                        update_local_state({ "choice": "followers" })
                                                    }}
                                                    style={{ margin: '2px' }}
                                                >
                                                    List Followers
                                                </Button>
                                                <Button
                                                    type="primary"
                                                    disabled={false}
                                                    onClick={() => {
                                                        update_local_state({ "choice": "following" })
                                                    }}
                                                    style={{ margin: '2px' }}
                                                >
                                                    List Following
                                                </Button>
                                                {!local_state.user_follows ?
                                                    <Button
                                                        type="primary"
                                                        disabled={false}
                                                        onClick={() => {
                                                            follow_user()
                                                        }}
                                                        style={{ margin: '2px' }}
                                                    >
                                                        Follow_user
                                            </Button> : null
                                                }
                                            </Form.Item>
                                        </Form>
                                        <div>{render_choice()}</div>
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
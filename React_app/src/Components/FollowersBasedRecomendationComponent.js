
import React from 'react';
import { useEffect } from 'react';
import { Row, Col, Skeleton } from 'antd';

import useLocalState from '../Utils/LocalStateHook'
import MovieCardComponent from './MovieCardComponent'
import { getData } from '../Utils/FetchUtils'

const FollowersBasedRecomendationComponent = ({ global_state, update_global_state }) => {
    const [local_state, update_local_state] = useLocalState({ "loaded": false })

    useEffect(() => {
        async function setup() {
            const recomended_movies = await get_followers_based_movies()

            update_local_state(
                {
                    "loaded": true,
                    "movies": recomended_movies
                })
        }
        setup()
    }, []);

    const get_followers_based_movies = () => {
        const url = "api/followers_based_recomendation/"
        const data = {
            'access_token': global_state.access_token,
        }

        return getData(url, data).then(response => {
            if (response.status === false) {
                return
            }
            return response.response.movies
        });
    }

    return <>
        <div class="cardcontent">
            {(() => {
                switch (local_state.loaded) {
                    case true: return <Row type="flex" style={{ alignItems: 'center' }} align="midle" justify="center">
                        {local_state.movies.map(item => <Col key={item.id}><MovieCardComponent movie={item.movie} global_state={global_state} /></Col>)}
                    </Row>;
                    case false: return <Skeleton />;;
                }
            })()}
        </div>
    </>
};

export default FollowersBasedRecomendationComponent;
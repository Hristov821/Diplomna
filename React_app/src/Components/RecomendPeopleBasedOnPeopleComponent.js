
import React from 'react';
import { useEffect } from 'react';
import { Row, Col, Skeleton, Typography } from 'antd';

import useLocalState from '../Utils/LocalStateHook'
import { getData } from '../Utils/FetchUtils'

import UserCardComponent from './UserCardComponent'

const { Title } = Typography;

const RecomendPeopleBasedOnPeopleComponent = ({ global_state, update_global_state }) => {
    const [local_state, update_local_state] = useLocalState({ "loaded": false })

    useEffect(() => {
        async function setup() {
            const recomended_users = await get_recomended_users()

            update_local_state(
                {
                    "loaded": true,
                    "recomended_users": recomended_users
                })
        }
        setup()
    }, []);

    const get_recomended_users = () => {
        const url = "api/users_based_recomendation/"
        const data = {
            'access_token': global_state.access_token,
        }

        return getData(url, data).then(response => {
            if (response.status === false) {
                return
            }
            return response.response.recomended_users
        });
    }

    return <>
        <div class="cardcontent">
        <Title style={{textAlign: 'center',}}>Recommend People based on people that you are following</Title>
            {(() => {
                switch (local_state.loaded) {
                    case true: return <Row type="flex" style={{ alignItems: 'center' }} align="midle" justify="center">
                    {local_state.recomended_users.map(item => <Col key={item.id}><UserCardComponent user_entry={item}  global_state={global_state}/></Col>)}
                  </Row>
                    case false: return <Skeleton />;;
                }
            })()}
        </div>
    </>
};

export default RecomendPeopleBasedOnPeopleComponent;
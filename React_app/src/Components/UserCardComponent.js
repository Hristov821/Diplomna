import React from 'react';
import { Card, Avatar, Button } from 'antd';
import useRedirect from '../Utils/RedirectHook'
import { postData } from '../Utils/FetchUtils'

const { Meta } = Card;

const UserCardComponent = ({user_entry, global_state}) => {
    const [_, redirect] = useRedirect()

    if ( ! user_entry.poster){
        user_entry.poster = "https://www.computerhope.com/jargon/g/guest-user.jpg"
    }
    
    
    return <Card
        style={{ height: 240, width: 320}}
        cover={
            <img
                alt="example"
                style={{ height: '400px'}}
                src={user_entry.poster}
            />
        }
        actions={[
        <Button type="primary" onClick={() => redirect('/user_info', [user_entry, global_state])}>
                    More
                </Button>
        ]}
    >
        <Meta
            avatar={<Avatar src={user_entry.poster} />}
            title={user_entry.username}
            style={{ height: 100}}
        />
    </Card>
};

export default UserCardComponent;
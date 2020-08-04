import React from 'react';
import { Card, Avatar, Button } from 'antd';
import useRedirect from '../Utils/RedirectHook'

const { Meta } = Card;

const MovieCardComponent = ({movie, global_state}) => {
    const [_, redirect] = useRedirect()

    if ( ! movie.poster){
        movie.poster = "https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
    }
    
    return <Card
        style={{ height: 640, width: 480}}
        cover={
            <img
                alt="example"
                style={{ height: '400px'}}
                src={movie.poster}
            />
        }
        actions={[
            <Button type="primary" onClick={() => redirect('/movie_info', [movie, global_state])}>
            More
        </Button>
        ]}
    >
        <Meta
            avatar={<Avatar src={movie.poster} />}
            title={movie.title}
            description={movie.description}
            style={{ height: 100}}
        />
    </Card>
};

export default MovieCardComponent;
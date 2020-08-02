import React from 'react';
import { Card, Avatar, Button } from 'antd';
import useRedirect from '../Utils/RedirectHook'

const { Meta } = Card;

const MovieCardComponent = ({movie, global_state}) => {
    const [_, redirect] = useRedirect()
    console.log(movie)
    console.log(global_state)

    if ( ! movie.image){
        movie.image = "https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
    }

    return <Card
        style={{ width: 300}}
        cover={
            <img
                alt="example"
                src={movie.image}
            />
        }
        actions={[
            <Button type="primary" onClick={() => redirect('/movie_info', [movie, global_state])}>
            More
        </Button>
        ]}
    >
        <Meta
            avatar={<Avatar src={movie.image} />}
            title={movie.title}
            description={movie.description}
        />
    </Card>
};

export default MovieCardComponent;
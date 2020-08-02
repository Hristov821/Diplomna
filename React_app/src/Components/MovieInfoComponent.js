
import React from 'react';
import { useLocation } from "react-router-dom";
import { Form, Button, Rate } from 'antd';
import { postData } from '../Utils/FetchUtils'

const MovieInfoComponent = () => {

    const location = useLocation();
    const [movie_data, global_state] = location.state


    console.log(global_state)
    const onFinish = values => {
        const url = "api/user_rating/"

        const data = {
          'rating': values.rating,
          'movie_title': movie_data.title,
          'username': 'movie_title'
        }
    
        postData(url, data).then(response => {
          if (response.status === false) {
            return
          }
        });
    }
    return (<>
        <div class="movie_info">
            <div class="movie_content">
                <img alt={movie_data.title} src={movie_data.image} width={900} height={600} />
                <div>Title: {movie_data.title}</div>
                <div>Description: {movie_data.description}</div>
                <div>Release Year: {movie_data.release_year}</div>
                <div>Duration: {movie_data.duration}</div>
                <div>Listed in: {movie_data.listed_in}</div>
                <div>Netflix Id: {movie_data.id}</div>
                <div>Netflix Rating: {movie_data.rating}</div>

                <Form
                    name="basic"
                    initialValues={{
                        remember: true,
                    }}
                    onFinish={onFinish}
                >
                    <Form.Item name="rating"><Rate /></Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            Add your movie rating
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    </>);
};

export default MovieInfoComponent
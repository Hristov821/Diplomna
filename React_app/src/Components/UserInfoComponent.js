
import React from 'react';
import { useLocation } from "react-router-dom";
import { Form, Button, Rate } from 'antd';
import { postData } from '../Utils/FetchUtils'

const UserInfoComponent = () => {
    const location = useLocation();
    const [user, global_state] = location.state

    return (
        <div class="movie_info">
            <div class="movie_content">
            <img
                alt="example"
                style={{ height: '600px', width: '900px'}}
                src={user.poster}
            />
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
                            style={{ margin:'2px'}}
                        >
                            List Followers
                        </Button>
                        <Button
                            type="primary"
                            disabled={false}
                            onClick={() => {
                                console.log("kilkam")
                            }}
                            style={{ margin:'2px'}}
                        >
                            List Followers
                        </Button>
                        <Button
                            type="primary"
                            disabled={false}
                            onClick={() => {
                                console.log("kilkam")
                            }}
                            style={{ margin:'2px'}}
                        >
                            List Following
                        </Button>
                        <Button
                            type="primary"
                            disabled={false}
                            onClick={() => {
                                console.log("kilkam")
                            }}
                            style={{ margin:'2px'}}
                        >
                            Follow_user
                        </Button>
                    </Form.Item>
                </Form>
        </div>
        </div>
    );
};

export default UserInfoComponent
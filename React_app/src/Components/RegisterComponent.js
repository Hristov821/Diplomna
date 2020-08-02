import React from 'react';
import {postData} from '../Utils/FetchUtils'
import useRedirect from '../Utils/RedirectHook'
import useDisplayAlert from '../Utils/AlertHook'

import {displayAlert} from '../Utils/Common'

import {
    Form,
    Input,
    Tooltip,
    Checkbox,
    Button,
} from 'antd';

const RegisterComponent = ({ global_state, update_global_state }) => {
    const [form] = Form.useForm();
    const [_, redirect] = useRedirect()
    const [display_alert, set_dispaly_alert] = useDisplayAlert()

    const onFinish = values => {
        const url = "api/register/"
        const data = {
            'username': values.username,
            'password': values.password,
            'email': values.email
        }

        postData(url, data).then(response => {
            if (response.status === false) {
                set_dispaly_alert({ 'display': true, 'display_msg': response.response.msg })
                return
            }

            data.logged_in = true
            data.access_token = response.response.access_token
            update_global_state(data)
            redirect('/home')
        });
    };

    return (
        <>
            <div class="content">
                <Form
                    form={form}
                    name="register"
                    onFinish={onFinish}
                    scrollToFirstError
                >
                    <Form.Item
                        name="email"
                        label="E-mail"
                        rules={[
                            {
                                type: 'email',
                                message: 'The input is not valid E-mail!',
                            },
                            {
                                required: true,
                                message: 'Please input your E-mail!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        name="password"
                        label="Password"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your password!',
                            },
                        ]}
                        hasFeedback
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item
                        name="confirm"
                        label="Confirm Password"
                        dependencies={['password']}
                        hasFeedback
                        rules={[
                            {
                                required: true,
                                message: 'Please confirm your password!',
                            },
                            ({ getFieldValue }) => ({
                                validator(rule, value) {
                                    if (!value || getFieldValue('password') === value) {
                                        return Promise.resolve();
                                    }

                                    return Promise.reject('The two passwords that you entered do not match!');
                                },
                            }),
                        ]}
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item
                        name="username"
                        label={
                            <span>
                                username&nbsp;
            <Tooltip title="What do you want others to call you?">
                                </Tooltip>
                            </span>
                        }
                        rules={[
                            {
                                required: true,
                                message: 'Please input your nickname!',
                                whitespace: true,
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        name="agreement"
                        valuePropName="checked"
                        rules={[
                            {
                                validator: (_, value) =>
                                    value ? Promise.resolve() : Promise.reject('Should accept agreement'),
                            },
                        ]}>
                        <Checkbox>
                            I have read the <a href="">agreement</a>
                        </Checkbox>
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            Register
        </Button>
                    </Form.Item>
                </Form>
                <br></br>
                <div>{displayAlert(display_alert, set_dispaly_alert)}</div>
            </div>
        </>
    );
};

export default RegisterComponent;
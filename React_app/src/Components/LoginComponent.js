import React from 'react';
import { Form, Input, Button } from 'antd';

import postData from '../Utils/FetchUtils'
import useRedirect from '../Utils/RedirectHook'
import useDisplayAlert from '../Utils/AlertHook'

import displayAlert from '../Utils/Common'

const LoginComponent = ({ global_state, update_global_state }) => {
  const [_, redirect] = useRedirect()
  const [display_alert, set_dispaly_alert] = useDisplayAlert()

  const onFinish = values => {
    const url = "api/login/"
    const data = {
      'username': values.username,
      'password': values.password
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

  const onFinishFailed = () => {
    set_dispaly_alert(true)
  };

  return (
    <>
      <div class="content">
        <Form
          name="basic"
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item
            label="Username"
            name="username"
            rules={[
              {
                required: true,
                message: 'Please input your username!',
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: 'Please input your password!',
              },
            ]}>
            <Input.Password />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Log In
        </Button>
          </Form.Item>

          <Form.Item>
            <Button type="primary" onClick={() => redirect('/register')}>
              Register
          </Button>
          </Form.Item>
        </Form>
        <br></br>
        <div>{displayAlert(display_alert, set_dispaly_alert)}</div>
      </div>
    </>
  );
}

export default LoginComponent;

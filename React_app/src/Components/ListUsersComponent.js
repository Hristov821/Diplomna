
import React from 'react';
import { useState } from 'react';
import { Row, Col, Button, Form } from 'antd';

import UserCardComponent from './UserCardComponent'
import { get_search_form } from '../Utils/Common'
import { getData } from '../Utils/FetchUtils'

const ListUsersComponent = ({ global_state, update_global_state }) => {
  const [list_data, set_list_data] = useState([])

  const [form] = Form.useForm();

  const onFinish = values => {
    const url = "api/list_users/"
    const data = {
      'check_user': values.user,
      'exclude_user': global_state.username,
      'access_token': global_state.access_token
    }
    
    getData(url, data).then(response => {
      if (response.status === false) {
        return
      }
      
      set_list_data(response.response.result)
    });
  }

  return <>
    <div class="cardcontent">
      <Form
        form={form}
        name="advanced_search"
        className="ant-advanced-search-form"
        onFinish={onFinish}
      >
        <Row align="center" gutter={24}>{get_search_form("list_users")}</Row>
        <Row align="center">
          <Col
            span={24}
            style={{
              textAlign: 'center',
            }}
          >
            <Button type="primary" htmlType="submit">
              Search
          </Button>
            <Button
              style={{
                margin: '0 8px',
              }}
              onClick={() => {
                form.resetFields();
                set_list_data([])
              }}
            >
              Clear
          </Button>
          </Col>
        </Row>
      </Form>
      <Row type="flex" style={{ alignItems: 'center' }} align="midle" justify="center">
        {list_data.map(item => <Col key={item.id}><UserCardComponent user_entry={item}  global_state={global_state}/></Col>)}
      </Row>;
    </div>
  </>
};

export default ListUsersComponent;
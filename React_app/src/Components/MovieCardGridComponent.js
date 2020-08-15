
import React from 'react';
import { useState } from 'react';
import { Row, Col, Button, Form, Skeleton, Typography } from 'antd';

import useDisplayAlert from '../Utils/AlertHook'
import MovieCardComponent from './MovieCardComponent'
import { get_search_form } from '../Utils/Common'
import { getData } from '../Utils/FetchUtils'
import { displayAlert } from '../Utils/Common'

const { Title } = Typography;

const MovieCardGridComponent = ({ global_state, update_global_state }) => {
  const [display_alert, set_dispaly_alert] = useDisplayAlert({
    'display': true,
    'display_msg': "Please enter requerd arguments"
  })

  const [list_data, set_list_data] = useState([])
  const [is_loading, set_is_loading] = useState(false)

  const [form] = Form.useForm();

  const onFinish = values => {
    const url = "api/movie/"
    const data = {
      'movie': values.movie,
      'categories': values.categories,
    }

    set_is_loading(true)
    getData(url, data).then(response => {
      set_is_loading(false)
      if (response.status === false) {
        set_dispaly_alert({ 'display': true, 'display_msg': response.response.msg })
        return
      }
      else if (response.response.movies.length === 0) {
        set_dispaly_alert({ 'display': true, 'display_msg': "Such combination for movies does not exist" })
        return
      }

      set_dispaly_alert({ 'display': false, 'display_msg': "Such combination for movies does not exist" })
      set_list_data(response.response.movies)
    });
  }

  return <>
    <div class="cardcontent">
    <Title style={{textAlign: 'center',}}>Recommend Movies based on relations with other movies</Title>
      <Form
        form={form}
        name="advanced_search"
        className="ant-advanced-search-form"
        onFinish={onFinish}
      >
        <Row align="center" gutter={24}>{get_search_form("movie")}</Row>
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
                set_dispaly_alert({
                  'display': true,
                  'display_msg': "Please enter requerd arguments"
                })
              }}
            >
              Clear
          </Button>
          </Col>
        </Row>
      </Form>
      <br></br>
      <div>{displayAlert(display_alert, set_dispaly_alert)}</div>
      {(() => {
        switch (is_loading) {
          case false: return <Row type="flex" style={{ alignItems: 'center' }} align="midle" justify="center">
            {list_data.map(item => <Col key={item.id}><MovieCardComponent movie={item.recommendation} global_state={global_state} /></Col>)}
          </Row>
          case true: return <Skeleton />;;
        }
      })()}
    </div>
  </>
};

export default MovieCardGridComponent;
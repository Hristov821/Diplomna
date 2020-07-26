import React from 'react';
import { Row, Col,Button } from 'antd';

import CardComponent from './CardComponent'

const CardGridComponent = () => {
    var list=[]
    for(var i=0; i< 2; i++){
      list.push(i)
    }

    return <>
    <div class="cardcontent">
      <Row  type="flex" style={{alignItems: 'center'}} align="midle" justify="center">
        {list.map(item => <Col key={item.id}><CardComponent/></Col>)}
      </Row>
    </div>
  </>
};

export default CardGridComponent;
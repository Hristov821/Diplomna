import React from 'react';
import {Button } from 'antd';

const TestComponent = ({clb, decrees}) => {
  return (
      <>
        <Button type="primary" onClick={(e) =>{clb(false)}}>Plus Button</Button>
        <Button type="primary" onClick={(e) =>{decrees(true)}}>Minus Button</Button>
        <div>From testec</div>
        <div>From testec</div>
      </>
    );
}

export default TestComponent;

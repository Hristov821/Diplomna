import React from 'react';
import { Card, Avatar, Button } from 'antd';
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';

const { Meta } = Card;

const CardComponent = (DATA) => {
    return <Card
        style={{ width: 300}}
        cover={
            <img
                alt="example"
                src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
            />
        }
        actions={[
            <Button>More</Button>
        ]}
    >
        <Meta
            avatar={<Avatar src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png" />}
            title="<MOVIE TITLEdsaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa123> Rating 6.8"
            description="<Description>"
        />
    </Card>
};

export default CardComponent;
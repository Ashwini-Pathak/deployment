import React from 'react';
import { Layout, Row, Tag, Col, Space, Typography } from 'antd';
import { PhoneOutlined, MailOutlined } from '@ant-design/icons';

import './aboutcompany.scss';

const { Content } = Layout;
const { Text } = Typography;

const AboutCompany = () => {
  return (
    <Content className="content">
      <Row>
        <Col span={24} className="section">
          <span style={{ display: 'inline-block', marginBottom: '10px' }}>
            <strong>About</strong>
          </span>
          <p className="font16 fontExtraLight">-</p>
        </Col>

        <Col span={24} className="section">
          <span>
            <strong>Key Offerings</strong>
          </span>
          <div style={{ marginTop: '10px' }}>
            -
            {/* {data?.offerings?.map((el) => (
              <Tag color="#F3F9FF" style={{ borderRadius: '100px', marginBottom: '5px' }}>
                <span style={{ color: '#349AFD', fontSize: '12px' }}>{el}</span>
              </Tag>
            ))} */}
          </div>
        </Col>
        <Col span={24} className="section">
          <div className="director">
            <span>
              <strong>Directors</strong>
              <p>-</p>
            </span>
            <div>
              <span>
                <strong>Founded Year</strong>
              </span>
              <p>-</p>
            </div>
          </div>
          <Space direction="vertical">
            <Text className="text" underline>
              {' '}
              {/* Mr. Nishikant Dabbas */}
            </Text>
            <Text className="text" underline>
              {' '}
              {/* <PhoneOutlined /> <span className="contact">+61800 008 007</span> */}
            </Text>
            <Text className="text" underline>
              {' '}
              {/* <MailOutlined /> */}
              {/* <span className="contact">nishikant.dabbas@jcpgroup.com</span> */}
            </Text>
          </Space>
        </Col>
      </Row>
    </Content>
  );
};

export default AboutCompany;

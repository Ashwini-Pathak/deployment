import { Avatar, Col, Layout, Rate, Row, Space, Typography } from 'antd';
import React from 'react';

import './organization.scss';

const { Content } = Layout;
const { Text } = Typography;

const Organization = ({ stats, industry, companyData }) => {
  return (
    <Content className="content">
      <Row>
        <Col span={24} className="section">
          <span style={{ display: 'inline-block', marginBottom: '10px', color: '#1677ff', font: '20px' }}>
            {companyData?.name?.toUpperCase()}
          </span>
          <div className="avatar-title-container">
            <div className="avatar-wrapper">
              <Avatar src={'https://placehold.jp/18/1677ff/ffffff/200x200.png?text=TryThat.ai'} size={100} />
            </div>
            <div className="titles">
              <div>
                <p>{stats?.followers || 0}</p> <p>Followers</p>
              </div>
              <div>
                <p>{stats?.following || 0}</p> <p>Following</p>
              </div>
            </div>
          </div>
        </Col>

        <Col span={24} className="section">
          <p>
            <strong>Organization Details:</strong>
          </p>
          <Space direction="vertical">
            <Text className="org_text">Office Mail id: - </Text>
            <Text className="org_text">Head Office : - </Text>
            {/* <Text className="org_text">Industry Type : {industry}</Text> */}
            <Text className="org_text">Industry Type : - </Text>
            <Text className="org_text">Website Link : - </Text>
            <Text className="org_text">Company Strength : - </Text>
          </Space>
        </Col>
        <Col span={24} className="section">
          <div className="director">
            <span>
              <strong>Photo Gallery</strong>
            </span>
            <span className="font16">-</span>
          </div>
          {/* <Space className="photoGallary" direction="horizontal">
            <img src="https://www.gstatic.com/webp/gallery3/1.sm.png" alt="Profile" className="image" />
            <img src="https://www.gstatic.com/webp/gallery3/1.sm.png" alt="Profile" className="image" />
            <img src="https://www.gstatic.com/webp/gallery3/1.sm.png" alt="Profile" className="image" />
            <img src="https://www.gstatic.com/webp/gallery3/1.sm.png" alt="Profile" className="image" />
          </Space> */}
        </Col>
        <Col span={24} className="section">
          <span>
            <strong>Reviews</strong>
          </span>
          <div className="director">
            <span className="font16 ">
              {/* Average Rating: <Rate allowHalf disabled defaultValue={3} />{' '} */}
              Average Rating: -{' '}
            </span>
            <span className="font16 ">Total Reviews: -</span>
          </div>
        </Col>

        {/* <Col span={24} className="section">
          <div className="director">
            <Rate allowHalf disabled defaultValue={3} />
            <span className="font16 ">08/06/2024| 5pm</span>
          </div>
          <Text style={{ display: 'inline-block', font: '12px', paddingTop: '0.5rem' }}>
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
            industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and
            scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into
            electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of
            Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like
            Aldus PageMaker including versions of Lorem Ipsum.
          </Text>
        </Col> */}
      </Row>
    </Content>
  );
};

export default Organization;

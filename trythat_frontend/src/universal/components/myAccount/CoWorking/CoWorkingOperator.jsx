import { Button, Card, Form, Input, Space, Tooltip, Typography } from 'antd';
import Title from 'antd/es/typography/Title';
import { truncate } from 'lodash';
import React from 'react';
import { useSelector } from 'react-redux';
import Location from '../common/Location';
import OpenToBrokerForm from '../common/OpenToBrokerForm';
import MyProperties from '../common/myProperties/MyProperties';

const CoWorkingOperator = ({}) => {
  // States and hooks
  const { Text } = Typography;
  const { user } = useSelector((store) => store.user);
  const columns = [
    {
      title: 'Location',
      dataIndex: 'location',
      render: (text) => (
        <Tooltip title={text?.map((elem) => elem?.label)?.join(' , ')}>
          {truncate(text?.map((elem) => elem?.label)?.join(' , '))}
        </Tooltip>
      ),
    },
    {
      title: 'Price per seat',
      dataIndex: 'expectation',
      key: 'expectation',
      render: (text) => <span>Rs. {text}</span>,
    },
    {
      title: 'Open to brokers',
      dataIndex: 'openToBrokers',
      key: 'openToBrokers',
    },
    {
      title: 'Available Seats',
      dataIndex: 'availability',
      key: 'availability',
    },
  ];

  return (
    <>
      {/* ----------All peroperties---------  */}

      <div style={{ display: 'flex', gap: '20px' }}>
        <div style={{ flex: '2' }}>
          <MyProperties
            dataSource={Array.isArray(user?.offerings?.coworking) ? user?.offerings?.coworking : []}
            columns={columns}
            user={user}
          />
        </div>
        {/* ----------All peroperties---------  */}

        <Card style={{ flex: '1.5', background: '#F8F8F8' }}>
          <Title level={4}>Add New Property</Title>
          <Location name="coworking_location" />

          <div style={{ marginTop: '12px' }}>
            <Text style={{ fontSize: '8px', fontWeight: 100 }}>
              Note: You can add multiple properties from your account in your profile
            </Text>
          </div>

          <Form.Item required label={"Expectation"} style={{ marginBottom: '0px' }}>
            <Space style={{ alignItems: 'baseline' }}>
              <Text style={{ fontSize: '12px', fontWeight: 400 }}>Price I want</Text>
              <Form.Item
                name="coworking_expectaion"
                rules={[
                  {
                    required: true,
                    message: 'Please Provide Expectation',
                  },
                ]}
              >
                <Input type="number" style={{ width: '250px' }} min={0} prefix="Rs." />
              </Form.Item>
            </Space>
          </Form.Item>
          <Form.Item required style={{ marginBottom: '0px' }}>
            <Space style={{ alignItems: 'baseline' }}>
              <Text style={{ fontSize: '12px', fontWeight: 400 }}>Open to brokers?</Text>
              <Form.Item
                name="coworking_openToBrokers"
                rules={[
                  {
                    required: true,
                    message: 'Please select the option',
                  },
                ]}
              >
                <OpenToBrokerForm />
              </Form.Item>
            </Space>
          </Form.Item>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '10px',
              width: '100%',
            }}
          >
            <Form.Item required label={"Availability"}>
              <Space style={{ alignItems: 'baseline' }}>
                <Text style={{ fontSize: '12px', fontWeight: 400 }}>Total seats available</Text>
                <Form.Item
                  name="coworking_availability"
                  rules={[
                    {
                      required: true,
                      message: 'Please Provide Seat Availability',
                    },
                  ]}
                >
                  <Input type="number" placeholder="0" style={{ width: '250px' }} min={0} />
                </Form.Item>
              </Space>
            </Form.Item>
            <Form.Item>
              <Button className="editSaveBtn" htmlType="submit" type="primary">
                Save
              </Button>
            </Form.Item>
          </div>
        </Card>
      </div>
    </>
  );
};

export default CoWorkingOperator;

import { Col, Divider, Form, Input, Row, Space, Typography } from 'antd';
import React from 'react';
import Location from '../common/Location';
import OpenToBrokerForm from '../common/OpenToBrokerForm';
import './coworkingoperator.scss';

const CoWorkingOperator = () => {
  const { Text } = Typography;
  return (
    <>
      {/* -----location------- */}
      <Location name="coworking_location" />
      {/* -----location------- */}

      <div className="location-box">
        <Text className="location-box__text">
          Note: You can add multiple properties from your account in your profile
        </Text>
      </div>
      <Divider />
      <Row>
        <Col span={12}>
          <div className="workingcontainer">
            {/* -------Per sest pricek-------- */}

            <Form.Item required label="Expectation" className="workingcontainer-form">
              <Space className="workingcontainer-form__space">
                <Text className="workingcontainer-form__space--text">Per seat rate</Text>
                <Form.Item
                  name="coworking_expectaion"
                  rules={[
                    {
                      required: true,
                      message: 'Please Provide Expectation',
                    },
                  ]}
                >
                  <Input type="number" placeholder="Rs." style={{ width: '250px' }} min={0} />
                </Form.Item>
              </Space>
            </Form.Item>
            {/* -------Per sest pricek-------- */}

            {/* -------Open to borker-------- */}
            <Form.Item className="workingcontainer-form">
              <Space className="workingcontainer-form__space">
                <Text className="workingcontainer-form__space--text">Open to broker?</Text>
                <Form.Item name="coWorking_open_to_broker">
                  <OpenToBrokerForm />
                </Form.Item>
              </Space>
            </Form.Item>
          </div>
        </Col>
        {/* -------Total seats available-------- */}
        <Col span={12}>
          <div className="workingcontainer">
            <Form.Item required label="Availability">
              <Space className="workingcontainer-form__space">
                <Text className="workingcontainer-form__space--text">Total seats available</Text>
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
          </div>
        </Col>
      </Row>
    </>
  );
};

export default CoWorkingOperator;

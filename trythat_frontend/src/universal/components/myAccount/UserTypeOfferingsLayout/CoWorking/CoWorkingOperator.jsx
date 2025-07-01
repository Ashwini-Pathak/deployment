import { Col, Divider, Form, Input, Radio, Row, Space, Tag, Typography } from 'antd';
import React, { useEffect, useState } from 'react';
import Location from './Location';
import { nanoid } from '@reduxjs/toolkit';
import { isEmpty } from 'lodash';
import './coworkingoperator.scss';

const CoWorkingOperator = ({ _openToBrokerState, _coworkingLocation }) => {
  const { Text } = Typography;
  const [openToBrokers, setOpenToBrokers] = useState('');

  useEffect(() => {
    if (isEmpty(_openToBrokerState)) return;
    setOpenToBrokers(_openToBrokerState);
  }, []);
  return (
    <>
      <Location _coworkingLocation={_coworkingLocation} />
      <div className='location-box' >
        <Text className='location-box__text'>
          Note: You can add multiple properties from your account in your profile
        </Text>
      </div>
      <Divider />
      <Row>
        <Col span={12}>
          <div className='workingcontainer'
          >
            <Form.Item label="Expectation" className='workingcontainer-form' >
              <Space  className='workingcontainer-form__space' >
                <Text  className='workingcontainer-form__space--text'>Price I want</Text>
                <Form.Item
                  name="coworking_expectaion"
                  rules={[
                    {
                      required: true,
                      message: 'Please provide expectation',
                    },
                  ]}
                >
                  <Input type="number" placeholder="Rs." className='workingcontainer-form__space--input'  />
                </Form.Item>
              </Space>
            </Form.Item>
            <Form.Item className='workingcontainer-form'>
              <Space className='workingcontainer-form__space'>
                <Text className='workingcontainer-form__space--text'>Open to brokers?</Text>
                <Form.Item
                  name="coworking_openToBrokers"
                  rules={[
                    {
                      required: true,
                      message: 'Select Price Quoted Negotiable',
                    },
                  ]}
                >
                  {/* <OpenToBrokersFormItem /> */}
                  <Radio.Group
                    onChange={(e) => {
                      setOpenToBrokers(e?.target?.value);
                    }}
                  >
                    <Tag
                      key={nanoid()}
                      className='workingcontainer-form__space--tag'
                      
                    >
                      <Radio.Button
                        value="yes"
                        style={{
                          background: openToBrokers === 'yes' ? '#0081FC' : '#DEF0FF',
                          borderStyle: 'none',
                          borderRadius: '100px',
                          fontSize: '12px',
                          padding: '0px 30px 0px 30px',
                          height: '20px',
                          textAlign: 'center',

                          lineHeight: '1.5714285714285714',
                        }}
                      >
                        <Text
                          style={{
                            color: openToBrokers === 'yes' ? 'white' : '#548AD3',
                            fontSize: '12px',
                            margin: '0px',
                            padding: '0px',
                          }}
                        >
                          Yes
                        </Text>
                      </Radio.Button>
                    </Tag>
                    <Tag
                      key={nanoid()}
                      className='workingcontainer-form__space--tag'
                    >
                      <Radio.Button
                        value="no"
                        style={{
                          background: openToBrokers === 'no' ? '#0081FC' : '#DEF0FF',
                          borderStyle: 'none',
                          borderRadius: '100px',
                          fontSize: '12px',
                          padding: '0px 30px 0px 30px',
                          height: '20px',
                          textAlign: 'center',

                          lineHeight: '1.5714285714285714',
                        }}
                      >
                        <Text
                          style={{
                            color: openToBrokers === 'no' ? 'white' : '#548AD3',
                            fontSize: '12px',
                            margin: '0px',
                            padding: '0px',
                          }}
                        >
                          No
                        </Text>
                      </Radio.Button>
                    </Tag>
                  </Radio.Group>
                </Form.Item>
              </Space>
            </Form.Item>
          </div>
        </Col>
        <Col span={12}>
          <div className='workingcontainer'
            
          >
            <Form.Item required label="Availability">
              <Space className='workingcontainer-form__space'>
                <Text className='workingcontainer-form__space--text'>Total seats available</Text>
                <Form.Item
                  name="coworking_availability"
                  rules={[
                    {
                      required: true,
                      message: 'Please Provide Seat Availability',
                    },
                  ]}
                >
                  <Input type="number" placeholder="0" className='workingcontainer-form__space--input' />
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

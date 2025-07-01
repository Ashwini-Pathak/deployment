import React, { useEffect, useState } from 'react';
import Location from './Location';
import { Col, DatePicker, Divider, Form, Input, Radio, Row, Space, Tag, Typography } from 'antd';
import { nanoid } from '@reduxjs/toolkit';
import { isEmpty } from 'lodash';
import dayjs from 'dayjs';
import './sellerwanttorent.scss';

const SellerWanttoRent = ({ _negotiableState }) => {
  const { Text } = Typography;
  const [selectedNegotitablePrice, setSelectedNegotitablePrice] = useState('');
  const currDate = new Date();
  currDate.setDate(currDate.getDate() + 1);

  useEffect(() => {
    if (isEmpty(_negotiableState)) return;
    setSelectedNegotitablePrice(_negotiableState);
  }, []);
  return (
    <>
      <Location />
      <div className="locationcontainer">
        <Text className="locationcontainer-text">
          Note: You can add multiple properties from your account in your profile
        </Text>
      </div>
      <Divider />
      <Row>
        <Col span={12}>
          <div className="sellercontainer">
            <Form.Item label="Expectation" className="sellercontainer-form">
              <Space className="sellercontainer-form__space">
                <Text className="sellercontainer-form__space--text">Price I want</Text>
                <Form.Item
                  name="seller_expectation"
                  rules={[
                    {
                      required: true,
                      message: 'Select Expectation',
                    },
                  ]}
                >
                  <Input placeholder="Rs." style={{ width: '250px' }} type="number" min={0} />
                </Form.Item>
              </Space>
            </Form.Item>
            <Form.Item className="sellercontainer-form">
              <Space className="sellercontainer-form__space">
                <Text className="sellercontainer-form__space--text">Is the price quoted negotiable?</Text>
                <Form.Item
                  name="seller_priceQuotedNegotiable"
                  rules={[
                    {
                      required: true,
                      message: 'Select Price Quoted Negotiable',
                    },
                  ]}
                >
                  <Radio.Group
                    onChange={(e) => {
                      setSelectedNegotitablePrice(e?.target?.value);
                    }}
                  >
                    <Tag key={nanoid()} className="sellercontainer-form__space--tagbox">
                      <Radio.Button
                        value="yes"
                        style={{
                          background: selectedNegotitablePrice === 'yes' ? '#0081FC' : '#DEF0FF',
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
                            color: selectedNegotitablePrice === 'yes' ? 'white' : '#548AD3',
                            fontSize: '12px',
                            margin: '0px',
                            padding: '0px',
                          }}
                        >
                          Yes
                        </Text>
                      </Radio.Button>
                    </Tag>
                    <Tag key={nanoid()} className="sellercontainer-form__space--tagbox">
                      <Radio.Button
                        value="no"
                        style={{
                          background: selectedNegotitablePrice === 'no' ? '#3F51A3' : '#DEF0FF',
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
                            color: selectedNegotitablePrice === 'no' ? 'white' : '#548AD3',
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
          <div className="sellercontainer">
            <Form.Item label="Availability">
              <Space className="sellercontainer-form__space">
                <Text className="sellercontainer-form__space--text">Property available from</Text>
                <Form.Item
                  name="seller_propertyAvailableDate"
                  rules={[
                    {
                      required: true,
                      message: 'Please provide a date',
                    },
                  ]}
                >
                  <DatePicker
                    placeholder="00-00-0000"
                    format={'DD-MM-YYYY'}
                    className="sellercontainer-form__space--date"
                    minDate={dayjs(dayjs(currDate).format('YYYY-MM-DD'))}
                  />
                </Form.Item>
              </Space>
            </Form.Item>
          </div>
        </Col>
      </Row>
    </>
  );
};

export default SellerWanttoRent;

import React from 'react';
import Location from './Location';
import { Col, DatePicker, Divider, Form, Row, Slider, Space, Tag, Typography } from 'antd';
import dayjs from 'dayjs';
import LookingForFormItem from './LookingForFormItem';
import InterestedInFormItem from './InterestedInFormItem';

const Buyer = () => {
  const { Text } = Typography;
  const currDate = new Date();
  currDate.setDate(currDate.getDate());
  return (
    <>
      <Location title={'Location Preference'} />
      <Divider />
      <Row justify={'space-around'}>
        <Col span={15}>
          <div className='buyerrow'
           
          >
            <Form.Item required label="Property" className='buyerrow-form'>
              <Space className='buyerrow-form__space' >
                <Text className='buyerrow-form__space--text' >Looking for</Text>
                <Form.Item
                  name="buyer_lookingFor"
                  rules={[
                    {
                      required: true,
                      message: 'Select Purpose',
                    },
                  ]}
                >
                  <LookingForFormItem />
                </Form.Item>
              </Space>
            </Form.Item>
            <Form.Item className='buyerrow-form'>
              <Space className='buyerrow-form__space'>
                <Text className='buyerrow-form__space--text'>Interested In</Text>
                <Form.Item
                  name="buyer_interestedIn"
                  rules={[
                    {
                      required: true,
                      message: 'Select Property Interested In',
                    },
                  ]}
                >
                  <InterestedInFormItem />
                </Form.Item>
              </Space>
            </Form.Item>
          </div>
        </Col>
        <Col span={9}>
          <div
            className='buyerrow'
          >
            <Form.Item
              label="Budget Range"
              name="buyer_budgetRange"
              rules={[
                {
                  required: true,
                  message: 'Select Budget Range',
                },
              ]}
            >
              <Slider
                marks={{
                  0: 'Rs. 0/-',
                  100: 'Rs. 100/-',
                }}
                range
                defaultValue={[42, 80]}
              />
            </Form.Item>
          </div>
        </Col>
        <Divider />
        <div
          className='buyerrow'
        >
          <Form.Item label="Availability" className='buyerrow-form'>
            <Space className='buyerrow-form__space'>
              <Text className='buyerrow-form__space--text'>Property available from</Text>
              <Form.Item
                name="buyer_availabilityDate"
                rules={[
                  {
                    required: true,
                    message: 'Select Availability Date',
                  },
                ]}
              >
                <DatePicker
                  placeholder="00-00-0000"
                  format="DD/MM/YYYY"
                  className='buyerrow-form__space--date'
                  
                  minDate={dayjs(dayjs(currDate).format('YYYY-MM-DD'))}
                />
              </Form.Item>
            </Space>
          </Form.Item>
        </div>
      </Row>
    </>
  );
};

export default Buyer;

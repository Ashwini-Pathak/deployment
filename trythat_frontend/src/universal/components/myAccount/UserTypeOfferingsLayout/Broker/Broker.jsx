import { Divider, Form, Row, Space, Typography } from 'antd';
import React from 'react';
import Location from './Location';
import ExpertiseFormItem from './ExpertiseFormItem';
import InterestFormItem from './InterestFormItem';
import './broker.scss';

const Broker = ({ _broker_location }) => {
  const { Text } = Typography;
  return (
    <>
      <Row>
        <div className='brokerrow'
          
        >
          <Form.Item label="Expertise" className='brokerrow-form' >
            <Space className='brokerrow-form__space' >
              <Text className='brokerrow-form__space--text' >I can close</Text>
              <Form.Item
                name="broker_expertise"
                rules={[
                  {
                    required: true,
                    message: 'Select Expertise',
                  },
                ]}
              >
                <ExpertiseFormItem />
              </Form.Item>
            </Space>
          </Form.Item>
        </div>
      </Row>
      <Divider />
      <Location label={'My Preferred city is'} />
      <Divider />
      <Row>
        <div className='brokerrow'
          
        >
          <Form.Item label="Interest" className='brokerrow-form'>
            <Space className='brokerrow-form__space'>
              <Text className='brokerrow-form__space--text'>I can close</Text>
              <Form.Item
                name="broker_interest"
                rules={[
                  {
                    required: true,
                    message: 'Select Interest',
                  },
                ]}
              >
                <InterestFormItem />
              </Form.Item>
            </Space>
          </Form.Item>
        </div>
      </Row>
    </>
  );
};

export default Broker;

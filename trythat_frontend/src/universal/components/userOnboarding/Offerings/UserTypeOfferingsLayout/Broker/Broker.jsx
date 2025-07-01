import { Divider, Form, Row, Space, Typography } from 'antd';
import React from 'react';
import Location from '../common/Location';
import MultipleSelectTags from '../common/MultipleSelectTags';
import OpenToBrokerForm from '../common/OpenToBrokerForm';
import './broker.scss';
import PropertyType from '../common/PropertyType';

const Broker = () => {
  const { Text } = Typography;
  return (
    <>
      {/* ------- Deal with checkboxes------- */}

      <Row>
        <div className="brokerrow">
          <Form.Item required label="Client" className="brokerrow-form">
            <Space className="brokerrow-form__space">
              <Text className="brokerrow-form__space--text">I deal with</Text>
              <Form.Item
                name="broker_expertise"
                rules={[
                  {
                    required: true,
                    message: 'Select Expertise',
                  },
                ]}
              >
                <MultipleSelectTags tagsData={['Rent/Lease', 'Buy/Sell']} />
              </Form.Item>
            </Space>
          </Form.Item>
        </div>
      </Row>
      {/* ------- Deal with checkboxes------- */}

      <Divider />
      {/* ------- Select property type------- */}

      <Row>
        <div className="brokerrow">
          <Form.Item required label="Property type" className="brokerrow-form">
            <Space className="brokerrow-form__space">
              <Form.Item
                name="broker_property_type"
                rules={[
                  {
                    required: true,
                    message: 'Select Property Type',
                  },
                ]}
              >
                <PropertyType otherRequirementName={'broker_property_type_other'} />
              </Form.Item>
            </Space>
          </Form.Item>
        </div>
      </Row>
      {/* ------- Select property type------- */}

      <Divider />
      {/* -------Location------ */}
      <Location label={'My preferred city is'} name="broker_location" />
      {/* -------Location------ */}

      <Divider />

      {/* ------- open to broker------- */}
      <Row>
        <div className="brokerrow">
          <Form.Item className="brokerrow-form">
            <Space className="brokerrow-form__space">
              <Text className="brokerrow-form__space--subTitle">Open to broker ?</Text>
              <Form.Item name="broker_open_to_broker">
                <OpenToBrokerForm />
              </Form.Item>
            </Space>
          </Form.Item>
        </div>
      </Row>
      {/* ------- open to broker------- */}
    </>
  );
};

export default Broker;

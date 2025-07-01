import { Button, Divider, Flex, Form, Input, Row, Space, Typography } from 'antd';
import React from 'react';
import Location from '../common/Location';
import MultipleSelectTags from '../common/MultipleSelectTags';
import OpenToBrokerForm from '../common/OpenToBrokerForm';
import './buyer.scss';
import PropertyType from '../common/PropertyType';

const Buyer = ({ _openToBrokerState }) => {
  const { Text } = Typography;
  const { TextArea } = Input;
  const currDate = new Date();
  currDate.setDate(currDate.getDate());

  return (
    <>
      {/* ---------PROPERTY/LOOKING FOR--------- */}
      <Form.Item required label="Property" className="buyerrow-form">
        <Space className="buyerrow-form__space">
          <Text className="buyerrow-form__space--text">Looking for</Text>
          <Form.Item
            name="buyer_lookingFor"
            rules={[
              {
                required: true,
                message: 'Select Purpose',
              },
            ]}
          >
            <MultipleSelectTags tagsData={['Purchase', 'Rent']} />
          </Form.Item>
        </Space>
      </Form.Item>
      {/* ---------PROPERTY/LOOKING FOR--------- */}

      {/* ---------property type-------- */}

      <Form.Item required label="Property type" className="buyerrow-form">
        <Space className="buyerrow-form__space">
          <Form.Item
            name="buyer_propertyType"
            rules={[
              {
                required: true,
                message: 'Select Property Type',
              },
            ]}
          >
            <PropertyType otherRequirementName="buyer_property_type_other" />
          </Form.Item>
        </Space>
      </Form.Item>
      {/* ---------property type-------- */}

      {/* -------Location-------- */}
      <Location label="My preferred city is" title={'Location preference'} name="buyer_location" />
      {/* -------Location-------- */}

      <Divider />
      {/* ------Requirments----- */}
      <Row style={{ justifyContent: 'space-between' }}>
        <div className="buyerrow" style={{ flexDirection: 'row' }}>
          <Form.Item  required label="Add requirements" className="buyerrow-form">
            <Flex gap="middle" horizontal>
              <Form.Item
                name="buyer_requirements"
                className="buyerrow-form__space--text"
                rules={[
                  {
                    required: true,
                    message: 'Add Requirements',
                  },
                ]}
              >
                <TextArea style={{ width: '250px', height: 80 }} min={0} />
              </Form.Item>
            </Flex>
          </Form.Item>
          <Form.Item label="Budget Range" className="buyerrow-form">
            <Flex gap="middle" horizontal>
              <Form.Item
                label="Lower limit"
                name="buyer_budgetRange_lower_limit"
                dependencies={['buyer_budgetRange_upper_limit']}
                className="buyerrow-form__space--text"
                rules={[
                  {
                    required: true,
                    message: 'Select Budget Range',
                  },
                ]}
              >
                <Input type="number" placeholder="Rs. 0.00" style={{ width: '150px' }} min={0} />
              </Form.Item>
              <Form.Item
                label="Upper limit"
                className="buyerrow-form__space--text"
                name="buyer_budgetRange_upper_limit"
                dependencies={['buyer_budgetRange_lower_limit']}
                rules={[
                  {
                    required: true,
                    message: 'Select Budget Range',
                  },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      const lowerLimit = getFieldValue('buyer_budgetRange_lower_limit');
                      const isUpperLimitField = true; // Assuming this is the Upper Limit field
                      if (value && lowerLimit && parseFloat(value) <= parseFloat(lowerLimit) && isUpperLimitField) {
                        return Promise.reject('Upper limit must be greater than lower limit');
                      }
                      return Promise.resolve();
                    },
                  }),
                ]}
              >
                <Input type="number" placeholder="Rs. 0.00" style={{ width: '150px' }} min={0} />
              </Form.Item>
            </Flex>
          </Form.Item>
        </div>

        <Divider />
      </Row>
      <div className="buyerrow">
        <Flex gap="middle" horizontal>
          <Form.Item className="workingcontainer-form" style={{ marginTop: '1.3rem' }}>
            <Space className="workingcontainer-form__space">
              <Text className="workingcontainer-form__space--text">Open to brokers?</Text>
              <Form.Item name="buyer_open_to_broker">
                <OpenToBrokerForm />
              </Form.Item>
            </Space>
          </Form.Item>
        </Flex>
      </div>
      {/* -------save------- */}

      <div style={{ marginTop: 20 }} className="w-100 d-flex jc-center">
        <Button style={{ width: 100 }} type="primary" htmlType="submit">
          Save
        </Button>
      </div>
    </>
  );
};

export default Buyer;

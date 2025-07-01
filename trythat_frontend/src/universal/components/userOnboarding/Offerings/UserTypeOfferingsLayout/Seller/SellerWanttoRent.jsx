import { Divider, Form, Row, Space, Typography } from 'antd';
import React from 'react';
import Location from '../common/Location';
import MultipleSelectTags from '../common/MultipleSelectTags';
import OpenToBrokerForm from '../common/OpenToBrokerForm';
import PropertyType from '../common/PropertyType';
import './sellerwanttorent.scss';

const SellerWanttoRent = () => {
  const { Text } = Typography;
  const currDate = new Date();
  currDate.setDate(currDate.getDate() + 1);

  return (
    <>
      {/* ----------Sell or Rent---------  */}

      <Form.Item  className="sellercontainer-form" label="Client">
        <Space className="sellercontainer-form__space">
          <Text className="sellercontainer-form__space--text">I am here to</Text>
          <Form.Item
            name="seller_iAmHereTo"
            rules={[
              {
                required: true,
                message: 'Select Purpose',
              },
            ]}
          >
            <MultipleSelectTags tagsData={['Sell', 'Rent']} />
          </Form.Item>
        </Space>
      </Form.Item>

      {/* ----------Sell or Rent---------  */}

      {/* ----------Property type---------  */}
      <Form.Item required label="Property type" className="sellercontainer-form">
        <Space className="sellercontainer-form__space">
          <Form.Item
            name="seller_property_type"
            rules={[
              {
                required: true,
                message: 'Select Property Type',
              },
            ]}
          >
            <PropertyType otherRequirementName={'seller_property_type_other'} />
          </Form.Item>
        </Space>
      </Form.Item>
      {/* ----------Property type---------  */}

      {/* ----------Location ---------  */}

      <Location label="My preferred City is" name="seller_location" />
      {/* ----------Location ---------  */}

      <Divider />

      {/* --------Open to broker--------- */}

      <Row>
        <div className="sellercontainer">
          <Form.Item className="sellercontainer-form">
            <Space className="sellercontainer-form__space">
              <Text className="sellercontainer-form__space--subTitle">Open to brokers?</Text>
              <Form.Item name="seller_open_to_broker">
                <OpenToBrokerForm />
              </Form.Item>
            </Space>
          </Form.Item>
        </div>
      </Row>
      {/* --------Open to broker--------- */}
    </>
  );
};

export default SellerWanttoRent;

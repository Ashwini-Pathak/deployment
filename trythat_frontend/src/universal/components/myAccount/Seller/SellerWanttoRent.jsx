import { Button, Card, Divider, Form, Row, Space, Tooltip, Typography } from 'antd';
import Title from 'antd/es/typography/Title';
import { truncate } from 'lodash';
import { default as React } from 'react';
import { useSelector } from 'react-redux';
import Location from '../common/Location';
import MultipleSelectTags from '../common/MultipleSelectTags';
import OpenToBrokerForm from '../common/OpenToBrokerForm';
import PropertyType from '../common/PropertyType';
import MyProperties from '../common/myProperties/MyProperties';

const SellerWanttoRent = () => {
  const { Text } = Typography;
  const { user } = useSelector((store) => store.user);

  const currDate = new Date();
  currDate.setDate(currDate.getDate());

  const columns = [
    {
      title: 'Location',
      dataIndex: 'location',
      key: 'location',
      render: (text) => (
        <Tooltip title={text?.map((elem) => elem?.label)?.join(',')}>
          {truncate(text?.map((elem) => elem?.label)?.join(','))}
        </Tooltip>
      ),
    },
    {
      title: 'Purpose',
      dataIndex: 'purpose',
      key: 'purpose',
      render: (text) => text?.join(','),
    },
    {
      title: 'propertyType',
      dataIndex: 'propertyType',
      key: 'propertyType',
      render: (text) => (
        <Tooltip title={text?.map((elem) => elem?.text)?.join(' , ')}>
          {truncate(text?.map((elem) => elem?.text)?.join(' , '))}
        </Tooltip>
      ),
    },
    {
      title: 'Open to Broker',
      dataIndex: 'openToBrokers',
      key: 'openToBrokers',
      render: (text) => text?.[0] || '-',
    },
  ];

  return (
    <>
      {/* ----------All peroperties---------  */}

      <div style={{ display: 'flex', gap: '20px' }}>
        <div style={{ flex: '2' }}>
          <MyProperties
            dataSource={Array.isArray(user?.offerings?.seller) ? user?.offerings?.seller : []}
            columns={columns}
          />
        </div>

        {/* ----------All peroperties---------  */}

        <Card style={{ flex: '1.5', background: '#F8F8F8' }}>
          <Title level={4}>Add New Property</Title>
          <>
            {/* ----------Sell or Rent---------  */}

            <Form.Item required className="sellercontainer-form" label="Client">
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
                  <PropertyType otherRequirementName="seller_property_type_other" />
                </Form.Item>
              </Space>
            </Form.Item>
            {/* ----------Property type---------  */}

            {/* ----------Location ---------  */}

            <Location label="My preferred city is" name="seller_location" />
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
            <Form.Item>
              <Button className="" htmlType="submit" type="primary">
                Save
              </Button>
            </Form.Item>
            {/* --------Open to broker--------- */}
          </>
        </Card>
      </div>
    </>
  );
};

export default SellerWanttoRent;

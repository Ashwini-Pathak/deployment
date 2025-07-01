import { nanoid } from '@reduxjs/toolkit';
import { Col, Divider, Form, Radio, Row, Tag, Typography } from 'antd';
import { isEmpty } from 'lodash';
import React, { useEffect, useState } from 'react';
import Broker from './UserTypeOfferingsLayout/Broker/Broker';
import Buyer from './UserTypeOfferingsLayout/Buyer/Buyer';
import CoWorkingOperator from './UserTypeOfferingsLayout/CoWorking/CoWorkingOperator';
import SellerWanttoRent from './UserTypeOfferingsLayout/Seller/SellerWanttoRent';
import './offerings.scss';

const Offerings = ({ _IAmA }) => {
  const { Text } = Typography;

  const [selectedIAmI, setSelectedIAmI] = useState('');
  const [renderingComponent, setRenderingComponent] = useState();

  // type selection ocomponent ----- I am a Broker/ seller etc
  const IAmA = {
    broker: <Broker />,
    seller: <SellerWanttoRent />,
    buyer: <Buyer />,
    coworking: <CoWorkingOperator />,
  };

  // navigation items for  I am a Broker/ seller etc
  const navItems = [
    { label: 'Broker', value: 'broker' },
    { label: 'Seller/Landlord', value: 'seller' },
    { label: 'Buyer/Tenant', value: 'buyer' },
    { label: 'Co-Working Operator', value: 'coworking' },
  ];

  useEffect(() => {
    if (isEmpty(_IAmA)) return;
    setRenderingComponent(IAmA[_IAmA]);
    setSelectedIAmI(_IAmA);
  }, []);

  return (
    <div className="offeringcontainer">
      <Row>
        <Col>
          <Form.Item
            name="iAmI"
            label="I am a"
            rules={[
              {
                required: true,
                message: 'Please pick an item!',
              },
            ]}
          >
            <Radio.Group
              onChange={(e) => {
                setSelectedIAmI(e?.target?.value);
                setRenderingComponent(IAmA?.[e?.target?.value]);
              }}
            >
              {navItems?.map((el) => {
                return (
                  <Tag key={nanoid()} className="offeringcontainer-item">
                    <Radio.Button
                      value={el?.value}
                      style={{
                        background: selectedIAmI === el?.value ? '#3F51A3' : '#DEF0FF',
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
                          color: selectedIAmI === el?.value ? 'white' : '#548AD3',
                          fontSize: '12px',
                          margin: '0px',
                          padding: '0px',
                        }}
                      >
                        {el?.label}
                      </Text>
                    </Radio.Button>
                  </Tag>
                );
              })}
            </Radio.Group>
          </Form.Item>
        </Col>
      </Row>
      <Divider />
      <div>{renderingComponent}</div>
    </div>
  );
};

export default Offerings;

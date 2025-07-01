import React, { Fragment } from 'react';
import { Row, Col } from 'antd';
import Text from 'antd/es/typography/Text';
import './Address.scss';

const Address = ({ addressInfo }) => {
  return (
    <Fragment>
      <Text style={{ fontWeight: '900' }} className="address-head">
        Address
      </Text>
      <Row className="address-container__items">
        <Col span={2}>
          <img
            src={require('../../../assets/images/location.png')}
            alt="location"
            className="items-img"
            style={{ width: '15px', height: '15px' }}
          />
        </Col>
        <Col span={20}>
          <p className="items-para" style={{ paddingLeft: '15px', fontSize: '11px', color: '#0081fc' }}>
            {addressInfo}
          </p>
        </Col>
      </Row>
    </Fragment>
  );
};

export default Address;

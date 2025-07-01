import React, { Fragment, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { MailOutlined, PhoneOutlined, PushpinOutlined, EllipsisOutlined } from '@ant-design/icons';
import { Button, Card, Checkbox, Row, Col, Rate, List, Divider, Typography } from 'antd';
// import { fetchOrganizationList, setPropertyData } from '../../../../features/searchSlice';
import ShareIcon from '../../../../../assets/images/share.png';
import ReferIcon from '../../../../../assets/images/refer.png';
import AmenitiesIconEnum from '../../../../../utils/referenceData/search/amenitiesIconEnum';
import { isEmpty } from 'lodash';
import { nanoid } from '@reduxjs/toolkit';
import { unlockPropertyFields } from '../../../../features/searchSlice';
import properties from '../../../../../assets/images/properties.svg';
import { useNavigate } from 'react-router';
import { populateAddressInfo } from '../../../../../utils/formatSearchData/Address';

const PropertyDetailV1 = ({ record: propertyItem }) => {
  const navigateTo = useNavigate();
  const dispatch = useDispatch();
  const { Text } = Typography;
  const { crmData } = useSelector((store) => store.userDashboard);
  return (
    <div className="organizationListContainer__div__card" key={nanoid()} style={{ width: '100%', overflow: 'auto' }}>
      <Row className="propertyListContainer__div__card__row" style={{ justifyContent: 'space-between' }}>
        <Col span={20} className="propertyListContainer__div__card__row__col">
          <Row className="propertyListContainer__div__card__row__col__row">
            <Col span={2} className="propertyListContainer__div__card__row__col__row__col">
              <img
                src={properties}
                alt="Property Image"
                className="propertyListContainer__div__card__row__col__row__col__img"
              />
              <img
                src={require(`../../../../../assets/images/verified.png`)}
                alt="Verified"
                className="propertyListContainer__div__card__row__col__row__col__verifiedimg"
              />
            </Col>
            <Col span={16} className="propertyListContainer__div__card__row__col__row__col1">
              <h5
                className="propertyListContainer__div__card__row__col__row__col1__h5"
                onClick={() => {
                  if (!propertyItem?.isResourceLocked) {
                    navigateTo(`/leadgen/propertyDetails/${propertyItem?._id}`);
                  }
                }}
              >
                <u>{propertyItem?.buildingName}</u>
              </h5>
              <p className="propertyListContainer__div__card__row__col__row__col1__para">
                {propertyItem?.addressInfo?.[0]?.locality}
              </p>
              <Rate allowHalf disabled defaultValue={propertyItem?.averageRating || 0} />
            </Col>
          </Row>
        </Col>
      </Row>
      <Row className="propertyListContainer__div__card__row1">
        <Col span={12} className="propertyListContainer__div__card__row1__col1">
          <Row className="propertyListContainer__div__card__row1__col1__row">
            <Col span={1} className="propertyListContainer__div__card__row1__col1__row__col">
              <img
                src={require('../../../../../assets/images/location.png')}
                alt="location"
                className="propertyListContainer__div__card__row1__col1__row__col__img"
              />
            </Col>
            <Col span={20} className="propertyListContainer__div__card__row1__col1__row__col1">
              <p className="propertyListContainer__div__card__row1__col1__row__col1__para">
                {populateAddressInfo(propertyItem?.addressInfo?.[0])}
              </p>
            </Col>
          </Row>
          <Fragment>
            <Row className="propertyListContainer__div__card__row1__col1__row1">
              <Col span={8} className="propertyListContainer__div__card__row1__col1__row1__col1">
                <h5 className="propertyListContainer__div__card__row1__col1__row1__col1__h5">
                  Owner/ Representative: &nbsp;
                </h5>
              </Col>
              <Col span={8} className="propertyListContainer__div__card__row1__col1__row1__col2">
                <span className="propertyListContainer__div__card__row1__col1__row1__col2__span">
                  {propertyItem?.representativeName}
                </span>
              </Col>
              <Card className="propertyListContainer__div__card__row1__col1__row1__card">
                <div className="propertyListContainer__div__card__row1__col1__row1__card__div">
                  <Row className="propertyListContainer__div__card__row1__col1__row1__card__div__row">
                    <span className="propertyListContainer__div__card__row1__col1__row1__card__div__row__span">
                      <img
                        src={require('../../../../../assets/images/phone.png')}
                        alt="phone"
                        className="propertyListContainer__div__card__row1__col1__row1__card__div__row__span__img"
                      />
                      <Text style={{ fontSize: '12px' }}>{propertyItem?.representativeNumber || '--'}</Text>
                    </span>
                  </Row>
                  <Row className="propertyListContainer__div__card__row1__col1__row1__card__div__row1">
                    <span className="propertyListContainer__div__card__row1__col1__row1__card__div__row1__span">
                      <img
                        src={require('../../../../../assets/images/mail.png')}
                        alt="mail"
                        className="propertyListContainer__div__card__row1__col1__row1__card__div__row1__span__img"
                      />
                      <Text style={{ fontSize: '12px' }}>{propertyItem?.representativeEmail || '--'}</Text>
                    </span>
                  </Row>
                </div>
                {propertyItem?.isResourceLocked && (
                  <div
                    className="propertyListContainer__div__card__row1__col1__row1__card__hidediv"
                    onClick={() => {
                      dispatch(
                        unlockPropertyFields({
                          body: {
                            payload: [
                              {
                                name: propertyItem?.buildingName,
                                resourceId: propertyItem?._id,
                                resourceType: 'commercial',
                                resourceSubType: 'property',
                                unlockedFields: ['representativeEmail', 'representativeNumber'],
                                crmPayload: {
                                  FirstName: propertyItem?.buildingName,
                                  Micromarket: populateAddressInfo(propertyItem?.addressInfo?.[0]),
                                },
                              },
                            ],
                            crmDetails: {
                              id: crmData?.id,
                              accessToken: crmData?.accessToken,
                            },
                          },
                        }),
                      );
                    }}
                  >
                    <span className="propertyListContainer__div__card__row1__col1__row1__card__hidediv__span">
                      <img
                        src={require('../../../../../assets/images/phone.png')}
                        alt="phone"
                        className="propertyListContainer__div__card__row1__col1__row1__card__hidediv__span__img"
                      />
                      Click to unhide Owner Info Details
                    </span>
                  </div>
                )}
              </Card>
            </Row>
            {!isEmpty(propertyItem?.amenities?.general) && (
              <Fragment>
                <Row className="propertyListContainer__div__card__row1__col1__row2">
                  <h5 className="propertyListContainer__div__card__row1__col1__row2__h5">Amenities:</h5>
                </Row>
                {propertyItem?.amenities?.general?.map((item) => {
                  return (
                    <Row className="propertyListContainer__div__card__row1__col1__row3">
                      <p className="propertyListContainer__div__card__row1__col1__row3__para">{item}</p>
                    </Row>
                  );
                })}
              </Fragment>
            )}
            {propertyItem?.amenities?.general && (
              <div className="propertyListContainer__div__card__row1__col1__div">
                {propertyItem?.amenities?.general?.map((item) => {
                  return (
                    <Col span={6} className="propertyListContainer__div__card__row1__col1__div__col">
                      {isEmpty(AmenitiesIconEnum[item]) && (
                        <img
                          src={AmenitiesIconEnum['DEFAULT']}
                          className="propertyListContainer__div__card__row1__col1__div__col__img"
                        />
                      )}
                      {!isEmpty(AmenitiesIconEnum[item]) && (
                        <img
                          src={AmenitiesIconEnum[item]}
                          className="propertyListContainer__div__card__row1__col1__div__col__img"
                        />
                      )}
                      <p className="propertyListContainer__div__card__row1__col1__div__col__para">{item}</p>
                    </Col>
                  );
                })}
              </div>
            )}
          </Fragment>
        </Col>
      </Row>
    </div>
  );
};

export default PropertyDetailV1;

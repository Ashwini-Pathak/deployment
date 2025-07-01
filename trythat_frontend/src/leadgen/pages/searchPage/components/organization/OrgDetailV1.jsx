import React from 'react';
import { Button, Card, Col, Row, Checkbox, Rate, List, Divider } from 'antd';
import { Fragment, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { setPropertyData } from '../../../../features/searchSlice';
import ShareIcon from '../../../../../assets/images/share.png';
import ReferIcon from '../../../../../assets/images/refer.png';
import { compact, isEmpty } from 'lodash';
import { nanoid } from '@reduxjs/toolkit';
import organizations from '../../../../../assets/images/organizations.svg';
import InfiniteScroll from 'react-infinite-scroll-component';
import { EllipsisOutlined } from '@ant-design/icons';
import { unlockOrganizationFields } from '../../../../features/searchSlice';
import dayjs from 'dayjs';
import bookmark from '../../../../../assets/images/bookmark.svg';
import bookmark_selected from '../../../../../assets/images/bookmark_selected.svg';
import properties from '../../../../../assets/images/properties.svg';
import connects from '../../../../../assets/images/connects.svg';
import search_organization from '../../../../../assets/images/search_organization.svg';
import { useNavigate } from 'react-router';

const OrgDetailV1 = ({ record: org }) => {
  const navigateTo = useNavigate();
  const dispatch = useDispatch();
  return (
    <div className="organizationListContainer__div__card" key={nanoid()} style={{ width: '100%', overflow: 'auto' }}>
      <Row className="organizationListContainer__div__card__row">
        <Col span={24} className="organizationListContainer__div__card__row__col">
          <Row className="organizationListContainer__div__card__row__col__row">
            <Col span={2} className="organizationListContainer__div__card__row__col__row__col">
              {org?.propertyImageURL ? (
                <img
                  src={require(`../../../../../assets/images/${org?.organizationImgURL}`)}
                  alt="Organization Image"
                  className="organizationListContainer__div__card__row__col__row__col__img"
                />
              ) : (
                // <img
                //   src={require(`../../../../../assets/images/property2.jpg`)}
                //   alt="Organization Image"
                //   className="organizationListContainer__div__card__row__col__row__col__img"
                // />
                <img
                  src={search_organization}
                  alt="search_organization"
                  className="organizationListContainer__div__card__row__col__row__col__img"
                />
              )}
              {org?.isVerified && (
                <img
                  src={require(`../../../../../assets/images/verified.png`)}
                  alt="Verified"
                  className="organizationListContainer__div__card__row__col__row__col__verifiedimg"
                />
              )}
            </Col>
            <Col span={14} className="organizationListContainer__div__card__row__col__row__col1">
              <h5
                className="organizationListContainer__div__card__row__col__row__col1__h5"
                onClick={() => {
                  if (!org?.isResourceLocked) {
                    navigateTo(`/leadgen/organizationDetails/${org?._id}`);
                  }
                }}
              >
                <u>{org?.name}</u>
              </h5>
              <p className="organizationListContainer__div__card__row__col__row__col1__para">Public Limited Company</p>

              <Rate allowHalf disabled defaultValue={org?.average_rating} />
            </Col>
          </Row>
          <Row className="organizationListContainer__div__card__row3">
            <Col span={12} className="organizationListContainer__div__card__row3__col">
              <Row className="organizationListContainer__div__card__row3__col__row">
                {org?.foundedYear && (
                  <Row className="organizationListContainer__div__card__row2__col__row3">
                    <h5 className="organizationListContainer__div__card__row2__col__row3__h5">Founded Year</h5>
                    <p className="organizationListContainer__div__card__row2__col__row3__para">
                      {org?.foundedYear?.$numberInt}
                    </p>
                  </Row>
                )}
              </Row>
              <Row className="organizationListContainer__div__card__row3__col__row">
                <h5 className="organizationListContainer__div__card__row3__col__row__h5">Directors</h5>
                {org?.directorDetails?.map((item) => {
                  return (
                    <>
                      <p className="organizationListContainer__div__card__row3__col__row__para">{item?.name}</p>
                      <Card className="organizationListContainer__div__card__row3__col__row__card">
                        <div className="organizationListContainer__div__card__row3__col__row__card__div">
                          <Row className="organizationListContainer__div__card__row3__col__row__card__div__row">
                            <span className="organizationListContainer__div__card__row3__col__row__card__div__row__span">
                              <img
                                src={require('../../../../../assets/images/phone.png')}
                                alt="phone"
                                className="organizationListContainer__div__card__row3__col__row__card__div__row__span__img"
                              />
                              {item?.phone}
                            </span>
                          </Row>
                          <Row className="organizationListContainer__div__card__row3__col__row__card__div__row1">
                            <span className="organizationListContainer__div__card__row3__col__row__card__div__row1__span">
                              <img
                                src={require('../../../../../assets/images/mail.png')}
                                alt="mail"
                                className="organizationListContainer__div__card__row3__col__row__card__div__row1__span__img"
                              />
                              {item?.mail}
                            </span>
                          </Row>
                        </div>
                        {(org?.lockedResourceDetails?.lockedFields?.includes('directorDetails') ||
                          org?.directorDetails?.[0]?.phone === 'locked') && (
                          <div
                            className="organizationListContainer__div__card__row3__col__row__card__hidediv"
                            // onClick={() => {
                            //   dispatch(
                            //     unlockOrganizationFields({
                            //       body: {
                            //         payload: [
                            //           {
                            //             name: org?.name,
                            //             resourceId: org?._id,
                            //             resourceType: 'commercial',
                            //             resourceSubType: 'organization',
                            //             unlockedFields: org?.lockedResourceDetails?.lockedFields?.includes(
                            //               'propertyEngagement',
                            //             )
                            //               ? ['directorDetails']
                            //               : ['directorDetails', 'propertyEngagement'],
                            //             crmPayload: {
                            //               Email: org?.officemailid,
                            //               FirstName: org?.name,
                            //               Mobile: org?.headOfficeNumber,
                            //               Website: org?.websiteLink,
                            //               Description: org?.description,
                            //               Micromarket: org?.location?.mapLocation,
                            //             },
                            //           },
                            //         ],
                            //         crmDetails: {
                            //           id: crmData?.id,
                            //           accessToken: crmData?.accessToken,
                            //         },
                            //       },
                            //     }),
                            //   );
                            // }}
                          >
                            <span className="organizationListContainer__div__card__row3__col__row__card__hidediv__span">
                              <img
                                src={require('../../../../../assets/images/phone.png')}
                                alt="phone"
                                className="organizationListContainer__div__card__row3__col__row__card__hidediv__span__img"
                              />
                              Click unlock button to unhide Director Info Details
                            </span>
                          </div>
                        )}
                      </Card>
                    </>
                  );
                })}
              </Row>
            </Col>
            <Col span={12} className="organizationListContainer__div__card__row2__col1">
              <Row className="organizationListContainer__div__card__row__col__row1__col1__row">
                <h5 className="organizationListContainer__div__card__row__col__row1__col1__row__h5">Industry</h5>
                <p className="organizationListContainer__div__card__row__col__row1__col1__row__para">
                  {org?.industryType}
                </p>
              </Row>
              <Row className="organizationListContainer__div__card__row__col__row1__col1__row1">
                <h5 className="organizationListContainer__div__card__row__col__row1__col1__row1__h5">Strength</h5>
                <p className="organizationListContainer__div__card__row__col__row1__col1__row1__para">
                  {org?.companyStrength?.$numberInt}
                </p>
              </Row>
              <Row className="organizationListContainer__div__card__row2__col1__row">
                <Col span={2} className="organizationListContainer__div__card__row2__col1__row__col">
                  <img
                    src={require('../../../../../assets/images/location.png')}
                    alt="location"
                    className="organizationListContainer__div__card__row2__col1__row__col__img"
                  />
                </Col>
                <Col span={20} className="organizationListContainer__div__card__row2__col1__row__col1">
                  <h5 className="organizationListContainer__div__card__row2__col1__row__col1__h5">Nearest to you</h5>
                  <p className="organizationListContainer__div__card__row2__col1__row__col1__para">
                    {org?.nearestAddress || '--'}
                  </p>
                </Col>
              </Row>
              <Row className="organizationListContainer__div__card__row2__col1__row1">
                <Col span={2} className="organizationListContainer__div__card__row2__col1__row1__col">
                  <img
                    src={require('../../../../../assets/images/location.png')}
                    alt="location"
                    className="organizationListContainer__div__card__row2__col1__row1__col__img"
                  />
                </Col>
                <Col span={20} className="organizationListContainer__div__card__row2__col1__row1__col1">
                  <h5 className="organizationListContainer__div__card__row2__col1__row1__col1__h5">Head Office</h5>
                  <p className="organizationListContainer__div__card__row2__col1__row1__col1__para">
                    {org?.location?.[0].mapLocation}
                  </p>
                </Col>
              </Row>
            </Col>
          </Row>
          <Row className="organizationListContainer__div__card__row__col__row1">
            <Col span={14} className="organizationListContainer__div__card__row__col__row1__col">
              <Row className="organizationListContainer__div__card__row__col__row1__col__row">
                <Col span={1} className="organizationListContainer__div__card__row__col__row1__col__row__col">
                  <img
                    src={require('../../../../../assets/images/phone.png')}
                    alt="Phone"
                    className="organizationListContainer__div__card__row__col__row1__col__row__col__img"
                  />
                </Col>
                <Col span={22} className="organizationListContainer__div__card__row__col__row1__col__row__col1">
                  <p className="organizationListContainer__div__card__row__col__row1__col__row__col1__para">
                    {org?.headOfficeNumber || '--'}
                  </p>
                </Col>
              </Row>

              <Row className="organizationListContainer__div__card__row__col__row1__col__row1">
                <Col span={1} className="organizationListContainer__div__card__row__col__row1__col__row1__col">
                  <img
                    src={require('../../../../../assets/images/mail.png')}
                    alt="email"
                    className="organizationListContainer__div__card__row__col__row1__col__row1__col__img"
                  />
                </Col>
                <Col span={22} className="organizationListContainer__div__card__row__col__row1__col__row1__col1">
                  <p className="organizationListContainer__div__card__row__col__row1__col__row1__col1__para">
                    {org?.officeMailId || '--'}
                  </p>
                </Col>
              </Row>

              <Row className="organizationListContainer__div__card__row__col__row1__col__row2">
                <Col span={1} className="organizationListContainer__div__card__row__col__row1__col__row2__col">
                  <img
                    src={require('../../../../../assets/images/websiteUrl.png')}
                    alt="websiteUrl"
                    className="organizationListContainer__div__card__row__col__row1__col__row2__col__img"
                  />
                </Col>
                <Col span={22} className="organizationListContainer__div__card__row__col__row1__col__row2__col1">
                  <p className="organizationListContainer__div__card__row__col__row1__col__row2__col1__para">
                    {org?.websiteLink || '--'}
                  </p>
                </Col>
              </Row>
            </Col>
          </Row>
        </Col>
      </Row>
      <Row className="organizationListContainer__div__card__row1">
        <Col span={24} className="organizationListContainer__div__card__row1__col">
          {org?.keyOfferings?.map((item) => {
            return <div className="organizationListContainer__div__card__row1__col__div">{item}</div>;
          })}
        </Col>
      </Row>
      <Row className="organizationListContainer__div__card__row2">
        <Col span={24} className="organizationListContainer__div__card__row2__col">
          {org?.propertyEngagement && (
            <Row className="organizationListContainer__div__card__row2__col__row">
              <h5 className="organizationListContainer__div__card__row2__col__row__h5">Property Engagement</h5>
              <p className="organizationListContainer__div__card__row2__col__row__para">
                {org?.propertyEngagement?.currentEnagaement}
              </p>
            </Row>
          )}
          <Row className="organizationListContainer__div__card__row2__col__row1">
            <Card className="organizationListContainer__div__card__row2__col__row1__card">
              <div className="organizationListContainer__div__card__row2__col__row1__card__div">
                <Row className="organizationListContainer__div__card__row2__col__row1__card__div__row">
                  <span className="organizationListContainer__div__card__row2__col__row1__card__div__row__span">
                    Start Date:&nbsp;
                    {dayjs(org?.propertyEngagement?.startDate).format('DD/MM/YYYY')}
                  </span>
                </Row>
                <Row className="organizationListContainer__div__card__row2__col__row1__card__div__row1">
                  <span className="organizationListContainer__div__card__row2__col__row1__card__div__row1__span">
                    End Date:{dayjs(org?.propertyEngagement?.endDate).format('DD/MM/YYYY')}
                  </span>
                </Row>
              </div>
              {(org?.lockedResourceDetails?.lockedFields?.includes('propertyEngagement') ||
                (org?.propertyEngagement?.startDate === 'locked' && org?.propertyEngagement?.endDate === 'locked')) && (
                <div
                  className="organizationListContainer__div__card__row2__col__row1__card__hidediv"
                  // onClick={() => {
                  //   dispatch(
                  //     unlockOrganizationFields({
                  //       body: {
                  //         payload: [
                  //           {
                  //             name: org?.name,
                  //             resourceId: org?._id,
                  //             resourceType: 'commercial',
                  //             resourceSubType: 'organization',
                  //             unlockedFields: org?.lockedResourceDetails?.lockedFields?.includes('directorDetails')
                  //               ? ['propertyEngagement']
                  //               : ['directorDetails', 'propertyEngagement'],
                  //             crmPayload: {
                  //               Email: org?.officemailid,
                  //               FirstName: org?.name,
                  //               Mobile: org?.headOfficeNumber,
                  //               Website: org?.websiteLink,
                  //               Description: org?.description,
                  //               Micromarket: org?.location?.mapLocation,
                  //             },
                  //           },
                  //         ],
                  //         crmDetails: {
                  //           id: crmData?.id,
                  //           accessToken: crmData?.accessToken,
                  //         },
                  //       },
                  //     }),
                  //   );
                  // }}
                >
                  <span className="organizationListContainer__div__card__row2__col__row1__card__hidediv__span">
                    <img
                      src={require('../../../../../assets/images/phone.png')}
                      alt="phone"
                      className="organizationListContainer__div__card__row2__col__row1__card__hidediv__span__img"
                    />
                    Click unlock button to unhide Dates
                  </span>
                </div>
              )}
            </Card>
          </Row>
          {org?.description && (
            <Row className="organizationListContainer__div__card__row2__col__row2">
              <h5 className="organizationListContainer__div__card__row2__col__row2__h5">Description</h5>
              <p className="organizationListContainer__div__card__row2__col__row2__para">{org?.description}</p>
            </Row>
          )}
        </Col>
      </Row>
    </div>
  );
};

export default OrgDetailV1;

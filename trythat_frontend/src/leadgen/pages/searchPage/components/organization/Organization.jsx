import { Button, Card, Col, Row, Rate, List, Divider } from 'antd';
import React, { Fragment, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ShareIcon from '../../../../../assets/images/share.png';
import ReferIcon from '../../../../../assets/images/refer.png';
import { isEmpty } from 'lodash';
import { nanoid } from '@reduxjs/toolkit';
import organizations from '../../../../../assets/images/organizations.svg';
import InfiniteScroll from 'react-infinite-scroll-component';
import { getOrganizationFromProperty, unlockOrganizationFields } from '../../../../features/searchSlice';
import dayjs from 'dayjs';
import bookmark from '../../../../../assets/images/bookmark.svg';
import bookmark_selected from '../../../../../assets/images/bookmark_selected.svg';
import search_organization from '../../../../../assets/images/OrgWall.svg';
import { useNavigate } from 'react-router';
import { populateAddressInfo } from '../../../../../utils/formatSearchData/Address';
import phone from '../../../../../assets/images/phone1.svg';
import email from '../../../../../assets/images/email1.svg';
import website from '../../../../../assets/images/website.svg';
import redunhide from '../../../../../assets/images/redunhide.svg';




const Organization = ({
  organizationsData,
  handleExpandOrganizationCard,
  onDeleteCard,
  onSaveCard,
  onSaveAllCard,
  onDeleteAllCard,
}) => {
  const [openOverflowMenu, setOpenOverflowMenu] = useState(false);
  const { crmData } = useSelector((store) => store.userDashboard);
  const { selectedPropertyId, isSavedAllOrganization } = useSelector((store) => store.search);

  const dispatch = useDispatch();
  const navigateTo = useNavigate();

  const getLockedArray = (org) => {
    // const directorDetailsPresent = !org?.lockedResourceDetails?.lockedFields.includes('directorDetails');
    // const propertyEngagementPresent = !org?.lockedResourceDetails?.lockedFields.includes('propertyEngagement');
    // return compact([
    //   directorDetailsPresent ? '' : 'directorDetails',
    //   propertyEngagementPresent ? '' : 'propertyEngagement',
    // ]);
    return ['directorInfo', 'propertyEngagement'];
  };

  const loadMoreData = () => {
    dispatch(getOrganizationFromProperty(selectedPropertyId));
  };

  const handleSelectAllOrganizations = () => {
    const filteredProperties = organizationsData
      ?.filter((el) => !el?.isSaved && el?.isResourceLocked)
      ?.map((data) => {
        return {
          resourceId: data?._id,
          name: data?.companyName,
          resourceSubType: 'organization',
          unlockedFields: ['directorInfo', 'propertyEngagement'],
          resourceType: 'commercial',
        };
      });
    return filteredProperties;
  };
  const handleUnSelectAllOrganizations = () => {
    const filteredProperties = organizationsData
      ?.filter((el) => el?.isSaved && el?.isResourceLocked)
      ?.map((data) => {
        return {
          resourceId: data?._id,
          name: data?.companyName,
          resourceSubType: 'organization',
          unlockedFields: ['directorInfo', 'propertyEngagement'],
          resourceType: 'commercial',
        };
      });
    return filteredProperties;
  };

  console.log(organizationsData);

  return isEmpty(organizationsData) ? (
    <></>
  ) : (
    <div>
      {!isEmpty(organizationsData) && (
        <div style={{ display: 'flex', justifyContent: 'flex-start', marginLeft: '40px', height: '35px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px',fontWeight: '600'  }}>
            <img src={search_organization} alt={'organizations'} style={{ width: '23px' }} /> Organization
            <img
              src={isSavedAllOrganization ? bookmark_selected : bookmark}
              alt="bookmark_selected"
              style={{ cursor: 'pointer',marginLeft:'45px' }}
              onClick={() => {
                if (isSavedAllOrganization) {
                  onDeleteAllCard(handleUnSelectAllOrganizations());
                  return;
                }
                onSaveAllCard(handleSelectAllOrganizations());
              }}
            />{' '}
            Save All
          </div>
        </div>
      )}
      <div id="columnTwoDiv" style={{ height: '100vh', overflow: 'auto', paddingBottom: '100px' }}>
        <InfiniteScroll
          dataLength={organizationsData?.length}
          next={() => {
            loadMoreData();
          }}
          hasMore={organizationsData?.length < 50}
          endMessage={<Divider plain>It is all, nothing more </Divider>}
          scrollableTarget="columnTwoDiv"
        >
          <List
            dataSource={organizationsData}
            renderItem={(org) => (
              <List.Item key={nanoid()} style={{ borderBlockEnd: 'none' }}>
                <div key={org} className="organizationListContainer__div">
                  {!org?.isSaved && (
                    <img
                      src={bookmark}
                      alt="bookmark"
                      style={{ visibility: !org?.isResourceLocked ? 'hidden' : 'visible', cursor: 'pointer' }}
                      onClick={() => {
                        onSaveCard(org?._id, org?.companyName, 'organization', getLockedArray(org), 'commercial');
                      }}
                    />
                  )}
                  {org?.isSaved && (
                    <img
                      src={bookmark_selected}
                      alt="bookmark_selected"
                      style={{ visibility: !org?.isResourceLocked ? 'hidden' : 'visible', cursor: 'pointer' }}
                      onClick={() => {
                        onDeleteCard(org?._id, org?.companyName, 'organization', getLockedArray(org), 'commercial');
                      }}
                    />
                  )}
                  <Card className="organizationListContainer__div__card" key={nanoid()}>
                    <Row className="organizationListContainer__div__card__row">
                      <Col span={22} className="organizationListContainer__div__card__row__col">
                        <Row className="organizationListContainer__div__card__row__col__row">
                          <Col span={8} className="organizationListContainer__div__card__row__col__row__col">
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
                                // if (!org?.isResourceLocked) {
                                navigateTo(`/leadgen/organizationDetails/${org?._id}`);
                                // }
                              }}
                            >
                              <u >{org?.companyName}</u>
                            </h5>
                            <p className="organizationListContainer__div__card__row__col__row__col1__para">
                              Public Limited Company
                            </p>

                            <Rate allowHalf disabled defaultValue={org?.average_rating} />
                          </Col>
                        </Row>
                        <Row className="organizationListContainer__div__card__row__col__row1">
                          <Col span={14} className="organizationListContainer__div__card__row__col__row1__col">
                            <Row className="organizationListContainer__div__card__row__col__row1__col__row">
                              <Col
                                span={2}
                                className="organizationListContainer__div__card__row__col__row1__col__row__col"
                              >
                                <img
                                  src={phone}
                                  alt="Phone"
                                  className="organizationListContainer__div__card__row__col__row1__col__row__col__img"
                                />
                              </Col>
                              <Col
                                span={22}
                                className="organizationListContainer__div__card__row__col__row1__col__row__col1"
                              >
                                <p className="organizationListContainer__div__card__row__col__row1__col__row__col1__para">
                                  {org?.otherCompanyInfo?.headOfficeNumber ?? 'Awaited'}
                                </p>
                              </Col>
                            </Row>

                            <Row className="organizationListContainer__div__card__row__col__row1__col__row1">
                              <Col
                                span={2}
                                className="organizationListContainer__div__card__row__col__row1__col__row1__col"
                              >
                                <img
                                  src={email}
                                  alt="email"
                                  className="organizationListContainer__div__card__row__col__row1__col__row1__col__img"
                                />
                              </Col>
                              <Col
                                span={22}
                                className="organizationListContainer__div__card__row__col__row1__col__row1__col1"
                              >
                                <p
                                  className="organizationListContainer__div__card__row__col__row1__col__row1__col1__para"
                                  title={org?.companyEmail}
                                  style={{
                                    whiteSpace: 'nowrap',
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                    maxWidth: '200px', // Adjust the width as needed
                                  }}
                                >
                                  {org?.companyEmail ?? 'Awaited'}
                                </p>
                              </Col>
                            </Row>

                            <Row className="organizationListContainer__div__card__row__col__row1__col__row2">
                              <Col
                                span={2}
                                className="organizationListContainer__div__card__row__col__row1__col__row2__col"
                              >
                                <img
                                  src={website}
                                  alt="websiteUrl"
                                  className="organizationListContainer__div__card__row__col__row1__col__row2__col__img"
                                />
                              </Col>
                              <Col
                                span={22}
                                className="organizationListContainer__div__card__row__col__row1__col__row2__col1"
                              >
                                <p
                                  className="organizationListContainer__div__card__row__col__row1__col__row2__col1__para"
                                  title={org?.otherCompanyInfo?.websiteLink}
                                  style={{
                                    whiteSpace: 'nowrap',
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                    maxWidth: '200px', // Adjust the width as needed
                                  }}
                                >
                                  {org?.otherCompanyInfo?.websiteLink ?? 'Awaited'}
                                </p>
                              </Col>
                            </Row>
                          </Col>
                          <Col span={10} className="organizationListContainer__div__card__row__col__row1__col1">
                            <Row className="organizationListContainer__div__card__row__col__row1__col1__row">
                              <h5 className="organizationListContainer__div__card__row__col__row1__col1__row__h5">
                                Industry
                              </h5>
                              <p className="organizationListContainer__div__card__row__col__row1__col1__row__para">
                                {org?.industryType ?? 'Awaited'}
                              </p>
                            </Row>
                            <Row className="organizationListContainer__div__card__row__col__row1__col1__row1">
                              <h5 className="organizationListContainer__div__card__row__col__row1__col1__row1__h5">
                                Strength
                              </h5>
                              <p className="organizationListContainer__div__card__row__col__row1__col1__row1__para">
                                {org?.otherCompanyInfo?.maximumNumberOfMembers ?? 'Awaited'}
                              </p>
                            </Row>
                          </Col>
                        </Row>
                      </Col>
                      <Col span={2} className="organizationListContainer__div__card__row__col1">
                        <div
                          className="organizationListContainer__div__card__row__col1__ellipsisContainer"
                          onClick={() => setOpenOverflowMenu(!openOverflowMenu)}
                        >
                          {/* <EllipsisOutlined style={{ fontSize: '20px', color: '#99CDFE', rotate: '90deg' }} /> */}
                        </div>
                        {openOverflowMenu && (
                          <Card className="organizationListContainer__div__card__row__col1__card">
                            <Col span={12} className="organizationListContainer__div__card__row__col1__card__col">
                              <Row
                                span={8}
                                className="organizationListContainer__div__card__row__col1__card__col__row1"
                              >
                                <img
                                  src={ShareIcon}
                                  alt="share"
                                  className="organizationListContainer__div__card__row__col1__card__col__row1__img"
                                />
                              </Row>
                              <Row
                                span={8}
                                className="organizationListContainer__div__card__row__col1__card__col__row2"
                              >
                                <img src={ReferIcon} alt="refer" />
                              </Row>
                            </Col>
                            <Col span={12} className="organizationListContainer__div__card__row__col1__card__col1">
                              <Row
                                span={8}
                                className="organizationListContainer__div__card__row__col1__card__col1__row1"
                              >
                                Share
                              </Row>
                              <Row
                                span={8}
                                className="organizationListContainer__div__card__row__col1__card__col1__row2"
                              >
                                Refer
                              </Row>
                            </Col>
                          </Card>
                        )}
                      </Col>
                    </Row>
                    <Row className="organizationListContainer__div__card__row1">
                      <Col span={24} className="organizationListContainer__div__card__row1__col">
                        {org?.otherCompanyInfo?.keyOfferings?.map((item) => {
                          return <div className="organizationListContainer__div__card__row1__col__div">{item}</div>;
                        })}
                      </Col>
                    </Row>
                    {org?.isExpanded && (
                      <Fragment>
                        <Row className="organizationListContainer__div__card__row2">
                          <Col span={12} className="organizationListContainer__div__card__row2__col">
                            {org?.propertyEngagement && (
                              <Row className="organizationListContainer__div__card__row2__col__row">
                                <h5 className="organizationListContainer__div__card__row2__col__row__h5">
                                  Property Engagement
                                </h5>
                                <p className="organizationListContainer__div__card__row2__col__row__para">
                                  {org?.propertyEngagement?.currentEnagaement ?? 'Awaited'}
                                </p>
                              </Row>
                            )}
                            <Row className="organizationListContainer__div__card__row2__col__row1">
                              <Card className="organizationListContainer__div__card__row2__col__row1__card">
                                <div className="organizationListContainer__div__card__row2__col__row1__card__div">
                                  <Row className="organizationListContainer__div__card__row2__col__row1__card__div__row">
                                    <span className="organizationListContainer__div__card__row2__col__row1__card__div__row__span">
                                      Start Date:&nbsp;
                                      {org?.propertyEngagement?.startDate
                                        ? dayjs(org?.propertyEngagement?.startDate).format('DD/MM/YYYY')
                                        : 'Awaited'}
                                    </span>
                                  </Row>
                                  <Row className="organizationListContainer__div__card__row2__col__row1__card__div__row1">
                                    <span className="organizationListContainer__div__card__row2__col__row1__card__div__row1__span">
                                      End Date:
                                      {org?.propertyEngagement?.endDate
                                        ? dayjs(org?.propertyEngagement?.endDate).format('DD/MM/YYYY')
                                        : 'Awaited'}
                                    </span>
                                  </Row>
                                </div>
                                {(org?.lockedResourceDetails?.lockedFields?.includes('propertyEngagement') ||
                                  (org?.propertyEngagement?.startDate === 'locked' &&
                                    org?.propertyEngagement?.endDate === 'locked')) && (
                                  <div
                                    className="organizationListContainer__div__card__row2__col__row1__card__hidediv"
                                    onClick={() => {
                                      dispatch(
                                        unlockOrganizationFields({
                                          body: {
                                            payload: [
                                              {
                                                name: org?.name,
                                                resourceId: org?._id,
                                                resourceType: 'commercial',
                                                resourceSubType: 'organization',
                                                unlockedFields: org?.lockedResourceDetails?.lockedFields?.includes(
                                                  'directorInfo',
                                                )
                                                  ? ['propertyEngagement']
                                                  : ['directorInfo', 'propertyEngagement'],
                                                crmPayload: {
                                                  Email: org?.officemailid,
                                                  FirstName: org?.name,
                                                  Mobile: org?.headOfficeNumber,
                                                  Website: org?.websiteLink,
                                                  Description: org?.description,
                                                  Micromarket: org?.location?.mapLocation,
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
                                    <span style={{color: 'red'}} className="organizationListContainer__div__card__row2__col__row1__card__hidediv__span">
                                      <img
                                        src={redunhide}
                                        alt="phone"
                                        className="organizationListContainer__div__card__row2__col__row1__card__hidediv__span__img"
                                      />
                                      Unhide Dates
                                    </span>
                                  </div>
                                )}
                              </Card>
                            </Row>
                            {org?.otherCompanyInfo?.description && (
                              <Row className="organizationListContainer__div__card__row2__col__row2">
                                <h5 className="organizationListContainer__div__card__row2__col__row2__h5">
                                  Description
                                </h5>
                                <p className="organizationListContainer__div__card__row2__col__row2__para">
                                  {org?.otherCompanyInfo?.description}
                                </p>
                              </Row>
                            )}
                            {org?.otherCompanyInfo && (
                              <Row className="organizationListContainer__div__card__row2__col__row3">
                                <h5 className="organizationListContainer__div__card__row2__col__row3__h5">
                                  Founded Date
                                </h5>
                                <p className="organizationListContainer__div__card__row2__col__row3__para">
                                  {org?.otherCompanyInfo?.dateOfIncorporation}
                                </p>
                              </Row>
                            )}
                          </Col>
                          <Col span={12} className="organizationListContainer__div__card__row2__col1">
                            <Row className="organizationListContainer__div__card__row2__col1__row">
                              <Col span={2} className="organizationListContainer__div__card__row2__col1__row__col">
                                <img
                                  src={require('../../../../../assets/images/location-orange.png')}
                                  alt="location"
                                  className="organizationListContainer__div__card__row2__col1__row__col__img"
                                />
                              </Col>
                              <Col span={20} className="organizationListContainer__div__card__row2__col1__row__col1">
                                <h5 className="organizationListContainer__div__card__row2__col1__row__col1__h5">
                                  Nearest to you
                                </h5>
                                <p className="organizationListContainer__div__card__row2__col1__row__col1__para">
                                  {populateAddressInfo(org?.companyAddressInfo?.[0])}
                                </p>
                              </Col>
                            </Row>
                            <Row className="organizationListContainer__div__card__row2__col1__row1">
                              <Col span={2} className="organizationListContainer__div__card__row2__col1__row1__col">
                                <img
                                  src={require('../../../../../assets/images/location-orange.png')}
                                  alt="location"
                                  className="organizationListContainer__div__card__row2__col1__row1__col__img"
                                />
                              </Col>
                              <Col span={20} className="organizationListContainer__div__card__row2__col1__row1__col1">
                                <h5 className="organizationListContainer__div__card__row2__col1__row1__col1__h5">
                                  Head Office
                                </h5>
                                <p className="organizationListContainer__div__card__row2__col1__row1__col1__para">
                                  {org?.headOfficeLocation}
                                </p>
                              </Col>
                            </Row>
                          </Col>
                        </Row>
                        <Row className="organizationListContainer__div__card__row3">
                          <Col span={24} className="organizationListContainer__div__card__row3__col">
                            <Row className="organizationListContainer__div__card__row3__col__row">
                              <h5 className="organizationListContainer__div__card__row3__col__row__h5">Directors</h5>
                              {org?.directorInfo?.map((item) => {
                                return (
                                  <>
                                    <p className="organizationListContainer__div__card__row3__col__row__para">
                                      {item?.personName ?? 'Awaited'}
                                    </p>
                                    <Card className="organizationListContainer__div__card__row3__col__row__card">
                                      <div className="organizationListContainer__div__card__row3__col__row__card__div">
                                        <Row className="organizationListContainer__div__card__row3__col__row__card__div__row">
                                          <span className="organizationListContainer__div__card__row3__col__row__card__div__row__span">
                                            <img
                                              src={require('../../../../../assets/images/phone.png')}
                                              alt="phone"
                                              className="organizationListContainer__div__card__row3__col__row__card__div__row__span__img"
                                            />
                                            {item?.contactNumber ?? 'Awaited'}
                                          </span>
                                        </Row>
                                        <Row className="organizationListContainer__div__card__row3__col__row__card__div__row1">
                                          <span className="organizationListContainer__div__card__row3__col__row__card__div__row1__span">
                                            <img
                                              src={require('../../../../../assets/images/mail.png')}
                                              alt="mail"
                                              className="organizationListContainer__div__card__row3__col__row__card__div__row1__span__img"
                                            />
                                            {item?.emailId ?? 'Awaited'}
                                          </span>
                                        </Row>
                                      </div>
                                      {(org?.lockedResourceDetails?.lockedFields?.includes('directorInfo') ||
                                        item?.contactNumber === 'locked') && (
                                        <div
                                          className="organizationListContainer__div__card__row3__col__row__card__hidediv"
                                          onClick={() => {
                                            dispatch(
                                              unlockOrganizationFields({
                                                body: {
                                                  payload: [
                                                    {
                                                      name: org?.companyName,
                                                      resourceId: org?._id,
                                                      resourceType: 'commercial',
                                                      resourceSubType: 'organization',
                                                      unlockedFields:
                                                        org?.lockedResourceDetails?.lockedFields?.includes(
                                                          'propertyEngagement',
                                                        )
                                                          ? ['directorInfo']
                                                          : ['directorInfo', 'propertyEngagement'],
                                                      crmPayload: {
                                                        Email: org?.officemailid,
                                                        FirstName: org?.name,
                                                        Mobile: org?.headOfficeNumber,
                                                        Website: org?.websiteLink,
                                                        Description: org?.description,
                                                        Micromarket: org?.location?.mapLocation,
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
                                          <span className="organizationListContainer__div__card__row3__col__row__card__hidediv__span">
                                            <img
                                              src={redunhide}
                                              alt="phone"
                                              className="organizationListContainer__div__card__row3__col__row__card__hidediv__span__img"
                                            />
                                            Click to Unhide Director Info Details
                                          </span>
                                        </div>
                                      )}
                                    </Card>
                                  </>
                                );
                              })}
                            </Row>
                          </Col>
                        </Row>
                      </Fragment>
                    )}
                    <Row className="organizationListContainer__div__card__row3">
                      <Button
                        type="link"
                        style={{fontWeight:'600' }}
                        className="organizationListContainer__div__card__row3__btn"
                        onClick={() => handleExpandOrganizationCard(org?._id, org?.isExpanded)}
                      >
                        {org?.isExpanded ? 'Show Less' : 'View More'}
                      </Button>
                    </Row>
                  </Card>
                </div>
              </List.Item>
            )}
          />
        </InfiniteScroll>
      </div>
    </div>
  );
};

export default Organization;

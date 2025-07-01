import React, { Fragment, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Card, Checkbox, Row, Col, Rate, List, Divider, Typography } from 'antd';
import ShareIcon from '../../../../../assets/images/share.png';
import ReferIcon from '../../../../../assets/images/refer.png';
import AmenitiesIconEnum from '../../../../../utils/referenceData/search/amenitiesIconEnum';
import { isEmpty } from 'lodash';
import { nanoid } from '@reduxjs/toolkit';
import { getSearchResults } from '../../../../features/searchSlice';
import properties from '../../../../../assets/images/properties.svg';
import InfiniteScroll from 'react-infinite-scroll-component';
import bookmark from '../../../../../assets/images/bookmark.svg';
import bookmark_selected from '../../../../../assets/images/bookmark_selected.svg';
import { useNavigate } from 'react-router';
import { populateAddressInfo } from '../../../../../utils/formatSearchData/Address';

const ResidentialProperty = ({
  propertyData,
  handleExpandPropertyCard,
  onSaveCard,
  onDeleteCard,
  onSaveAllCard,
  onDeleteAllCard,
}) => {
  const [openOverflowMenu, setOpenOverflowMenu] = useState(false);
  const { searchQuery, pagination, hasMoreData, isSavedAllResidentialProperty } = useSelector((store) => store.search);
  const navigateTo = useNavigate();

  const dispatch = useDispatch();

  const loadMoreData = () => {
    dispatch(
      getSearchResults({
        body: {
          query: searchQuery?.body?.query,
          offset: pagination?.offset,
          limit: pagination?.limit,
        },
      }),
    );
  };

  const handleSelectAllProperties = () => {
    const filteredProperties = propertyData
      ?.filter((el) => !el?.isSaved && el?.isResourceLocked)
      ?.map((data) => {
        return {
          resourceId: data?._id,
          name: data?.buildingName,
          resourceSubType: 'property',
          unlockedFields: ['representativeInfo'],
          resourceType: 'residential',
        };
      });
    return filteredProperties;
  };

  const handleUnSelectAllProperties = () => {
    const filteredProperties = propertyData
      ?.filter((el) => el?.isSaved && el?.isResourceLocked)
      ?.map((data) => {
        return {
          resourceId: data?._id,
          name: data?.buildingName,
          resourceSubType: 'property',
          unlockedFields: ['representativeInfo'],
          resourceType: 'residential',
        };
      });
    return filteredProperties;
  };

  return isEmpty(propertyData) ? (
    <></>
  ) : (
    <div style={{ paddingBottom: '200px' }}>
      {!isEmpty(propertyData) && (
        <div style={{ display: 'flex', justifyContent: 'flex-start', marginLeft: '40px', height: '35px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <img src={properties} alt={'properties'} /> Property
            <img
              src={isSavedAllResidentialProperty ? bookmark_selected : bookmark}
              alt="bookmark_selected"
              style={{ cursor: 'pointer' }}
              onClick={() => {
                if (isSavedAllResidentialProperty) {
                  onDeleteAllCard(handleUnSelectAllProperties());
                  return;
                }
                onSaveAllCard(handleSelectAllProperties());
              }}
            />{' '}
            Save All
          </div>
        </div>
      )}
      <div id="columnOneDiv" style={{ height: '100vh', overflow: 'auto', paddingBottom: '100px' }}>
        <InfiniteScroll
          dataLength={propertyData?.length}
          next={() => {
            loadMoreData();
          }}
          hasMore={hasMoreData}
          endMessage={<Divider plain>It is all, nothing more </Divider>}
          scrollableTarget="columnOneDiv"
        >
          <List
            dataSource={propertyData}
            renderItem={(propertyItem) => (
              <List.Item key={nanoid()} style={{ borderBlockEnd: 'none' }}>
                <div key={propertyItem?._id} className="propertyListContainer__div">
                  {!propertyItem?.isSaved && (
                    <img
                      src={bookmark}
                      alt="bookmark"
                      style={{ cursor: 'pointer' }}
                      onClick={() => {
                        onSaveCard(
                          propertyItem?._id,
                          propertyItem?.buildingName,
                          'property',
                          ['representativeInfo'],
                          'residential',
                        );
                      }}
                    />
                  )}
                  {propertyItem?.isSaved && (
                    <img
                      src={bookmark_selected}
                      alt="bookmark_selected"
                      style={{ cursor: 'pointer' }}
                      onClick={() => {
                        onDeleteCard(
                          propertyItem?._id,
                          propertyItem?.buildingName,
                          'property',
                          ['representativeInfo'],
                          'residential',
                        );
                      }}
                    />
                  )}
                  <Card className="propertyListContainer__div__card">
                    <Row className="propertyListContainer__div__card__row" style={{ justifyContent: 'space-between' }}>
                      <Col span={20} className="propertyListContainer__div__card__row__col">
                        <Row className="propertyListContainer__div__card__row__col__row">
                          <Col span={8} className="propertyListContainer__div__card__row__col__row__col">
                            {/* <img
                              src={require(`../../../../../assets/images/property2.jpg`)}
                              alt="Property Image"
                              className="propertyListContainer__div__card__row__col__row__col__img"
                            /> */}
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
                                // if (!propertyItem?.isResourceLocked) {
                                navigateTo(`/leadgen/propertyDetails/${propertyItem?._id}`);
                                // }
                              }}
                            >
                              <u>{propertyItem?.buildingName ?? 'Awaited'}</u>
                            </h5>
                            <p className="propertyListContainer__div__card__row__col__row__col1__para">
                              {propertyItem?.location?.area ?? 'Awaited'}
                            </p>
                            <Rate allowHalf disabled defaultValue={propertyItem?.average_rating || 0} />
                          </Col>
                        </Row>
                      </Col>
                      <Col className="propertyListContainer__div__card__row__col1">
                        {/* <div
                          className="organizationListContainer__div__card__row__col1__ellipsisContainer"
                          onClick={() => setOpenOverflowMenu(!openOverflowMenu)}
                        >
                          <EllipsisOutlined style={{ fontSize: '20px', color: '#99CDFE', rotate: '90deg' }} />
                        </div> */}
                        {openOverflowMenu && (
                          <Card className="propertyListContainer__div__card__row__col1__card">
                            <Col span={12} className="propertyListContainer__div__card__row__col1__card__col">
                              <Row span={8} className="propertyListContainer__div__card__row__col1__card__col__row1">
                                <img
                                  src={ShareIcon}
                                  alt="share"
                                  className="propertyListContainer__div__card__row__col1__card__col__row1__img"
                                />
                              </Row>
                              <Row span={8} className="propertyListContainer__div__card__row__col1__card__col__row2">
                                <img src={ReferIcon} alt="refer" />
                              </Row>
                            </Col>
                            <Col span={12} className="propertyListContainer__div__card__row__col1__card__col1">
                              <Row span={8} className="propertyListContainer__div__card__row__col1__card__col1__row1">
                                Share
                              </Row>
                              <Row span={8} className="propertyListContainer__div__card__row__col1__card__col1__row2">
                                Refer
                              </Row>
                            </Col>
                          </Card>
                        )}
                      </Col>
                    </Row>

                    <Row className="propertyListContainer__div__card__row1">
                      <Col span={24} className="propertyListContainer__div__card__row1__col1">
                        <Row className="propertyListContainer__div__card__row1__col1__row">
                          <h5>Developer Name:</h5>&nbsp;&nbsp;
                          <p className="propertyListContainer__div__card__row1__col1__row__col1__para">
                            {propertyData?.developerName ?? 'Awaited'}
                          </p>
                        </Row>
                      </Col>
                    </Row>

                    <Row className="propertyListContainer__div__card__row1">
                      <Col span={24} className="propertyListContainer__div__card__row1__col1">
                        <Row className="propertyListContainer__div__card__row1__col1__row">
                          <Col span={2} className="propertyListContainer__div__card__row1__col1__row__col">
                            <img
                              src={require('../../../../../assets/images/phone.png')}
                              alt="phone"
                              className="propertyListContainer__div__card__row1__col1__row__col__img"
                            />
                          </Col>
                          <Col span={20} className="propertyListContainer__div__card__row1__col1__row__col1">
                            <p className="propertyListContainer__div__card__row1__col1__row__col1__para">
                              {populateAddressInfo(propertyItem?.contactNumber)}
                            </p>
                          </Col>
                        </Row>
                      </Col>
                    </Row>

                    <Row className="propertyListContainer__div__card__row1">
                      <Col span={24} className="propertyListContainer__div__card__row1__col1">
                        <Row className="propertyListContainer__div__card__row1__col1__row">
                          <Col span={2} className="propertyListContainer__div__card__row1__col1__row__col">
                            <img
                              src={require('../../../../../assets/images/mail.png')}
                              alt="mail"
                              className="propertyListContainer__div__card__row1__col1__row__col__img"
                            />
                          </Col>
                          <Col span={20} className="propertyListContainer__div__card__row1__col1__row__col1">
                            <p className="propertyListContainer__div__card__row1__col1__row__col1__para">
                              {populateAddressInfo(propertyItem?.emailId)}
                            </p>
                          </Col>
                        </Row>
                      </Col>
                    </Row>

                    <Row className="propertyListContainer__div__card__row1">
                      <Col span={24} className="propertyListContainer__div__card__row1__col1">
                        <Row className="propertyListContainer__div__card__row1__col1__row">
                          <Col span={2} className="propertyListContainer__div__card__row1__col1__row__col">
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

                        {propertyItem?.isExpanded && (
                          <Fragment>
                            {propertyItem?.amenities?.general && (
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
                                      <p className="propertyListContainer__div__card__row1__col1__div__col__para">
                                        {item}
                                      </p>
                                    </Col>
                                  );
                                })}
                              </div>
                            )}
                            {propertyItem?.areaFacilities && (
                              <div className="propertyListContainer__div__card__row1__col1__div1">
                                {propertyItem?.areaFacilities?.map((item) => {
                                  return (
                                    <span className="propertyListContainer__div__card__row1__col1__div1__span">
                                      <p className="propertyListContainer__div__card__row1__col1__div1__span__para">
                                        {item?.facility}
                                      </p>
                                      :&nbsp;{' '}
                                      <p className="propertyListContainer__div__card__row1__col1__div1__span__para">
                                        {item?.metadata?.location}
                                      </p>
                                    </span>
                                  );
                                })}
                              </div>
                            )}
                          </Fragment>
                        )}
                      </Col>
                    </Row>
                    <Row className="propertyListContainer__div__card__row2">
                      <Button
                        type="link"
                        className="propertyListContainer__div__card__row2__btn"
                        onClick={() => handleExpandPropertyCard(propertyItem?._id, propertyItem?.isExpanded)}
                        style={{ fontSize: '10px',fontWeight :'600'  }}
                      >
                        {propertyItem?.isExpanded ? 'Show Less' : 'View More'}
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

export default ResidentialProperty;

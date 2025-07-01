import React from 'react';
import { Card, Row, Col, Rate, List, Divider } from 'antd';
import { isEmpty } from 'lodash';
import { nanoid } from '@reduxjs/toolkit';
import properties from '../../../../../assets/images/properties.svg';
import InfiniteScroll from 'react-infinite-scroll-component';
import bookmark from '../../../../../assets/images/bookmark.svg';
import bookmark_selected from '../../../../../assets/images/bookmark_selected.svg';
import { populateAddressInfo } from '../../../../../utils/formatSearchData/Address';

const Units = ({ unitsData, onSaveCard, onDeleteCard }) => {
  return isEmpty(unitsData) ? (
    <></>
  ) : (
    <div style={{ paddingBottom: '200px' }}>
      {!isEmpty(unitsData) && (
        <div style={{ display: 'flex', justifyContent: 'flex-start', marginLeft: '40px', height: '35px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <img src={properties} alt={'properties'} /> Units
          </div>
        </div>
      )}
      <div id="columnOneDiv" style={{ height: '100vh', overflow: 'auto', paddingBottom: '100px' }}>
        <InfiniteScroll
          dataLength={unitsData?.length}
          next={() => {
            // loadMoreData();
          }}
          hasMore={false}
          endMessage={<Divider plain>It is all, nothing more </Divider>}
          scrollableTarget="columnOneDiv"
        >
          <List
            dataSource={unitsData}
            renderItem={(unitsData) => (
              <List.Item key={nanoid()} style={{ borderBlockEnd: 'none' }}>
                <div key={unitsData?._id} className="organizationListContainer__div">
                  {!unitsData?.isSaved && (
                    <img
                      src={bookmark}
                      alt="bookmark"
                      style={{ visibility: !unitsData?.isResourceLocked ? 'hidden' : 'visible', cursor: 'pointer' }}
                      onClick={() => {
                        onSaveCard(unitsData?._id, unitsData?.buildingName, 'property', ['representativeInfo']);
                      }}
                    />
                  )}
                  {unitsData?.isSaved && (
                    <img
                      src={bookmark_selected}
                      alt="bookmark_selected"
                      style={{ visibility: !unitsData?.isResourceLocked ? 'hidden' : 'visible', cursor: 'pointer' }}
                      onClick={() => {
                        onDeleteCard(unitsData?._id, unitsData?.buildingName, 'property', ['representativeInfo']);
                      }}
                    />
                  )}
                  <Card className="organizationListContainer__div__card">
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
                            <h5 className="propertyListContainer__div__card__row__col__row__col1__h5">
                              <u>{`Flat No. ${unitsData?.address?.unitNo ?? 'Awaited'}`}</u>
                            </h5>
                            <p className="propertyListContainer__div__card__row__col__row__col1__para">
                              {unitsData?.address?.buildingName ?? 'Awaited'}
                            </p>
                            <Rate allowHalf disabled defaultValue={unitsData?.average_rating || 0} />
                          </Col>
                        </Row>
                      </Col>
                    </Row>
                    <Row className="propertyListContainer__div__card__row1">
                      <Col span={24} className="propertyListContainer__div__card__row1__col1">
                        <Row className="propertyListContainer__div__card__row1__col1__row">
                          <h5>Unit Status:</h5>&nbsp;&nbsp;
                          <p className="propertyListContainer__div__card__row1__col1__row__col1__para">
                            {unitsData?.unitStatus ?? 'Awaited'}
                          </p>
                        </Row>
                      </Col>
                    </Row>
                    <Row className="propertyListContainer__div__card__row1__col1__row">
                      <Col span={2} className="propertyListContainer__div__card__row1__col1__row__col">
                        <img
                          src={require('../../../../../assets/images/location-orange.png')}
                          alt="location"
                          className="propertyListContainer__div__card__row1__col1__row__col__img"
                        />
                      </Col>
                      <Col span={20} className="propertyListContainer__div__card__row1__col1__row__col1">
                        <p className="propertyListContainer__div__card__row1__col1__row__col1__para">
                          {populateAddressInfo(unitsData?.address?.buildingName)}
                        </p>
                      </Col>
                    </Row>
                    <Row className="propertyListContainer__div__card__row1">
                      <Col span={24} className="propertyListContainer__div__card__row1__col1">
                        <Row className="propertyListContainer__div__card__row1__col1__row">
                          <h5>Carpet Area:</h5>&nbsp;&nbsp;
                          <p className="propertyListContainer__div__card__row1__col1__row__col1__para">
                            {unitsData?.moreTransactionInfo?.[0]?.carpetArea
                              ? `${unitsData?.moreTransactionInfo?.[0]?.carpetArea} sq.ft`
                              : 'Awaited'}
                          </p>
                        </Row>
                      </Col>
                    </Row>
                    <Row className="propertyListContainer__div__card__row1">
                      <Col span={24} className="propertyListContainer__div__card__row1__col1">
                        <Row className="propertyListContainer__div__card__row1__col1__row">
                          <h5>Chargeable Area:</h5>&nbsp;&nbsp;
                          <p className="propertyListContainer__div__card__row1__col1__row__col1__para">
                            {unitsData?.moreTransactionInfo?.[0]?.chargableArea
                              ? `${unitsData?.moreTransactionInfo?.[0]?.chargableArea} sq.ft`
                              : 'Awaited'}
                          </p>
                        </Row>
                      </Col>
                    </Row>
                    <Row className="propertyListContainer__div__card__row1">
                      <h5>Unit Configuration:</h5>&nbsp;&nbsp;
                      <p className="propertyListContainer__div__card__row1__col1__row__col1__para">
                        {unitsData?.unitConfiguration ?? 'Awaited'}
                      </p>
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

export default Units;

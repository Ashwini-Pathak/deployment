import { Button, Card, Col, Row, Rate, List, Divider } from 'antd';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ShareIcon from '../../../../../assets/images/share.png';
import ReferIcon from '../../../../../assets/images/refer.png';
import { isEmpty } from 'lodash';
import { nanoid } from '@reduxjs/toolkit';
import InfiniteScroll from 'react-infinite-scroll-component';
import { unlockConnectsFields } from '../../../../features/searchSlice';
import bookmark from '../../../../../assets/images/bookmark.svg';
import bookmark_selected from '../../../../../assets/images/bookmark_selected.svg';
import search_connect from '../../../../../assets/images/person.svg';
import { useNavigate } from 'react-router';
import phone from '../../../../../assets/images/phone2.svg'
import email from '../../../../../assets/images/email2.svg'
import redunhide from '../../../../../assets/images/redunhide.svg';




const Contacts = ({
  connectsData,
  onDeleteCard,
  onSaveCard,
  handleConnectsViewMore,
  onSaveAllCard,
  onDeleteAllCard,
}) => {
  const dispatch = useDispatch();
  const [openOverflowMenu, setOpenOverflowMenu] = useState(false);
  const navigateTo = useNavigate();

  const { searchClasifier, isSavedAllConnects } = useSelector((store) => store.search);
  const { crmData } = useSelector((store) => store.userDashboard);

  const handleSelectAllProperties = () => {
    const filteredProperties = connectsData
      ?.filter((el) => !el?.isSaved && el?.isResourceLocked)
      ?.map((data) => {
        return {
          resourceId: data?._id,
          name: data?.personalInfo?.personName,
          resourceSubType: 'connect',
          unlockedFields: ['personalInfo'],
          resourceType: 'commercial',
        };
      });
    return filteredProperties;
  };

  const handleUnSelectAllProperties = () => {
    const filteredProperties = connectsData
      ?.filter((el) => el?.isSaved && el?.isResourceLocked)
      ?.map((data) => {
        return {
          resourceId: data?._id,
          name: data?.personalInfo?.personName,
          resourceSubType: 'connect',
          unlockedFields: ['personalInfo'],
          resourceType: 'commercial',
        };
      });
    return filteredProperties;
  };

  return isEmpty(connectsData) ? (
    <></>
  ) : (
    <div>
      {!isEmpty(connectsData) && (
        <div style={{ display: 'flex', justifyContent: 'flex-start', marginLeft: '40px', height: '35px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px',fontWeight: '600'  }}>
            <img src={search_connect} alt={'connects'} style={{ width: '25px' }} /> Connects
            <img
              src={isSavedAllConnects ? bookmark_selected : bookmark}
              alt="bookmark_selected"
              style={{ cursor: 'pointer',marginLeft:'45px' }}
              onClick={() => {
                if (isSavedAllConnects) {
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
      <div id="columnThreeDiv" style={{ height: '100vh', overflow: 'auto', paddingBottom: '100px' }}>
        <InfiniteScroll
          dataLength={connectsData?.length}
          next={() => {
            // loadMoreData();
          }}
          hasMore={connectsData?.length < 50}
          endMessage={<Divider plain>It is all, nothing more </Divider>}
          scrollableTarget="columnThreeDiv"
        >
          <List
            dataSource={connectsData}
            renderItem={(contactItem) => (
              <List.Item key={nanoid()} style={{ borderBlockEnd: 'none' }}>
                <div className="connectsListContainer__div">
                  {!contactItem?.isSaved && (
                    <img
                      src={bookmark}
                      alt="bookmark"
                      style={{ visibility: !contactItem?.isResourceLocked ? 'hidden' : 'visible', cursor: 'pointer' }}
                      onClick={() => {
                        onSaveCard(
                          contactItem?._id,
                          contactItem?.personalInfo?.personName,
                          'connect',
                          ['personalInfo'],
                          'commercial',
                        );
                      }}
                    />
                  )}
                  {contactItem?.isSaved && (
                    <img
                      src={bookmark_selected}
                      alt="bookmark_selected"
                      style={{ visibility: !contactItem?.isResourceLocked ? 'hidden' : 'visible', cursor: 'pointer' }}
                      onClick={() => {
                        onDeleteCard(
                          contactItem?._id,
                          contactItem?.personalInfo?.personName,
                          'connect',
                          ['personalInfo'],
                          'commercial',
                        );
                      }}
                    />
                  )}
                  <Card className="connectsListContainer__div__card">
                    <Row className="connectsListContainer__div__card__row">
                      <Col span={20} className="connectsListContainer__div__card__row__col">
                        <Row className="connectsListContainer__div__card__row__col__row">
                          <Col span={8} className="connectsListContainer__div__card__row__col__row__col">
                            {/* <img
                              src={require(`../../../../../assets/images/user.png`)}
                              alt="Organization Image"
                              className="connectsListContainer__div__card__row__col__row__col__img"
                            /> */}
                            <img
                              src={search_connect}
                              alt="Organization Image"
                              className="connectsListContainer__div__card__row__col__row__col__img"
                            />
                            <img
                              src={require(`../../../../../assets/images/verified.png`)}
                              alt="Verified"
                              className="connectsListContainer__div__card__row__col__row__col__verifiedimg"
                            />
                          </Col>
                          <Col span={14} className="connectsListContainer__div__card__row__col__row__col1">
                            <h5
                              className="connectsListContainer__div__card__row__col__row__col1__h5"
                              onClick={() => {
                                // if (!contactItem?.isResourceLocked) {
                                navigateTo(`/leadgen/connectDetails/${contactItem?._id}`);
                                // }
                              }}
                            >
                              <u>{contactItem?.personalInfo?.personName ?? 'Awaited'}</u>
                            </h5>
                            <p className="connectsListContainer__div__card__row__col__row__col1__para">
                              {contactItem?.personalInfo?.designation}
                              <span className="connectsListContainer__div__card__row__col__row__col1__para__span">
                                &nbsp;@{contactItem?.personalInfo?.companyName ?? 'Awaited'}
                              </span>
                            </p>
                            <Rate allowHalf disabled defaultValue={contactItem?.average_rating} />
                          </Col>
                        </Row>
                      </Col>
                      <Col span={4} className="connectsListContainer__div__card__row__col1">
                        {/* <img
                          src={require(`../../../../../assets/images/chat.png`)}
                          alt="Chat"
                          className="connectsListContainer__div__card__row__col1__img"
                        /> */}
                        {/* <div
                          className="connectsListContainer__div__card__row__col1__ellipsisContainer"
                          onClick={() => setOpenOverflowMenu(!openOverflowMenu)}
                        >
                          <div className="connectsListContainer__div__card__row__col1__ellipsisContainer__div"></div>
                          <div className="connectsListContainer__div__card__row__col1__ellipsisContainer__div"></div>
                          <div className="connectsListContainer__div__card__row__col1__ellipsisContainer__div"></div>
                        </div> */}
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
                    <Row className="connectsListContainer__div__card__row1">
                      <Col span={18} className="connectsListContainer__div__card__row1__col">
                        <Card className="connectsListContainer__div__card__row1__col__card">
                          <div className="connectsListContainer__div__card__row1__col__card__div">
                            <Row className="connectsListContainer__div__card__row1__col__card__div__row">
                              <span className="connectsListContainer__div__card__row1__col__card__div__row__span">
                                <img
                                  src={phone}
                                  alt="phone"
                                  className="connectsListContainer__div__card__row1__col__card__div__row__span__img"
                                />
                                {contactItem?.personalInfo?.contactNumber ?? 'Awaited'}
                              </span>
                            </Row>
                            <Row className="connectsListContainer__div__card__row1__col__card__div__row1">
                              <span className="connectsListContainer__div__card__row1__col__card__div__row1__span">
                                <img
                                  src={email}
                                  alt="mail"
                                  className="connectsListContainer__div__card__row1__col__card__div__row1__span__img"
                                />
                                {contactItem?.personalInfo?.emailId ?? 'Awaited'}
                              </span>
                            </Row>
                          </div>
                          {/* {contactItem?.isResourceLocked && (
                            <div
                              className="connectsListContainer__div__card__row1__col__card__hidediv"
                              onClick={() => {
                                dispatch(
                                  unlockPropertyFields({
                                    body: {
                                      payload: [
                                        {
                                          name: contactItem?.name,
                                          resourceId: contactItem?._id,
                                          resourceType: 'commercial',
                                          resourceSubType: 'connects',
                                          unlockedFields: ['ownerDetails'],
                                        },
                                      ],
                                    },
                                  }),
                                );
                              }}
                            >
                              <span className="connectsListContainer__div__card__row1__col__card__hidediv__span">
                                <img
                                  src={require('../../../../../assets/images/phone.png')}
                                  alt="phone"
                                  className="connectsListContainer__div__card__row1__col__card__hidediv__span__img"
                                />
                                Click to Unhide Details
                              </span>
                            </div>
                          )} */}
                          {contactItem?.isResourceLocked && (
                            <div
                              className="connectsListContainer__div__card__row1__col__card__hidediv"
                              onClick={() => {
                                dispatch(
                                  unlockConnectsFields({
                                    body: {
                                      payload: [
                                        {
                                          name: contactItem?.personalInfo?.personName,
                                          resourceId: contactItem?._id,
                                          resourceType: 'commercial',
                                          resourceSubType: 'connect',
                                          unlockedFields: ['personalInfo'],
                                          crmPayload: {
                                            Email: contactItem?.personalDetails?.email,
                                            FirstName: contactItem?.personalDetails?.name,
                                            Mobile: contactItem?.personalDetails?.phone,
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
                              <span className="connectsListContainer__div__card__row1__col__card__hidediv__span">
                                <img
                                  src={require('../../../../../assets/images/phone.png')}
                                  alt="phone"
                                  className="connectsListContainer__div__card__row1__col__card__hidediv__span__img"
                                />
                                Click to Unhide Details
                              </span>
                            </div>
                          )}
                        </Card>
                      </Col>
                      <Col span={4} className="connectsListContainer__div__card__row1__col1">
                        <Row className="connectsListContainer__div__card__row1__col1__row">
                          {/* <img
                            src={require(`../../../../../assets/images/jnc.png`)}
                            alt="Organization Image"
                            className="connectsListContainer__div__card__row1__col1__row__img"
                          /> */}
                        </Row>
                      </Col>
                    </Row>
                    <Row className="connectsListContainer__div__card__row2">
                      <Col span={24} className="connectsListContainer__div__card__row2__col">
                        Years of experience: {contactItem?.additionalConnectInfo?.experience}
                      </Col>
                    </Row>
                    <Row className="connectsListContainer__div__card__row3">
                      {/* <Col span={24} className="connectsListContainer__div__card__row3__col">
                        <div className="connectsListContainer__div__card__row3__col__div">Construction</div>
                        <div className="connectsListContainer__div__card__row3__col__div">Software</div>
                      </Col> */}
                    </Row>
                    <Row className="connectsListContainer__div__card__row4">Key Skills:</Row>
                    <Row className="connectsListContainer__div__card__row5">
                      <Col span={24} className="connectsListContainer__div__card__row5__col">
                        {contactItem?.additionalConnectInfo?.keySkills?.map((el) => {
                          return el.split(',').map((e) => {
                            return <div className="connectsListContainer__div__card__row5__col__div">{e}</div>;
                          });
                        })}
                      </Col>
                    </Row>
                    {['Individual', 'Company'].includes(searchClasifier) && (
                      <Row className="connectsListContainer__div__card__row6">
                        <Button
                          type="link"
                          className="connectsListContainer__div__card__row6__btn"
                          style={{ fontSize: '12px',fontWeight :'600' }}
                          onClick={() => {
                            handleConnectsViewMore(contactItem?._id);
                          }}
                        >
                          {contactItem?.isExpanded ? 'Show Less' : 'View More'}
                        </Button>
                      </Row>
                    )}
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

export default Contacts;

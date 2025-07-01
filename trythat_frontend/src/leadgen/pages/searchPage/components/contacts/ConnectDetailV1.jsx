import { Card, Col, Rate, Row } from 'antd';
import React from 'react';
import { useNavigate } from 'react-router';
import search_connect from '../../../../../assets/images/search_connect.svg';

const ConnectDetailV1 = ({ record: contactItem }) => {
  const navigateTo = useNavigate();
  return (
    <div className="connectsListContainer__div__card">
      <Row className="connectsListContainer__div__card__row">
        <Col span={20} className="connectsListContainer__div__card__row__col">
          <Row className="connectsListContainer__div__card__row__col__row">
            <Col span={2} className="connectsListContainer__div__card__row__col__row__col">
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
                  if (!contactItem?.isResourceLocked) {
                    navigateTo(`/leadgen/connectDetails/${contactItem?._id}`);
                  }
                }}
              >
                <u>{contactItem?.personalDetails?.name}</u>
              </h5>
              <p className="connectsListContainer__div__card__row__col__row__col1__para">
                {contactItem?.professionalDetails?.designation || '--'}
                <br />
                <span className="connectsListContainer__div__card__row__col__row__col1__para__span">@company</span>
              </p>
              <Rate allowHalf disabled defaultValue={contactItem?.average_rating} />
            </Col>
          </Row>
        </Col>
      </Row>
      <Row className="connectsListContainer__div__card__row1">
        <Col span={8} className="connectsListContainer__div__card__row1__col">
          <Card className="connectsListContainer__div__card__row1__col__card">
            <div className="connectsListContainer__div__card__row1__col__card__div">
              <Row className="connectsListContainer__div__card__row1__col__card__div__row">
                <span className="connectsListContainer__div__card__row1__col__card__div__row__span">
                  <img
                    src={require('../../../../../assets/images/phone.png')}
                    alt="phone"
                    className="connectsListContainer__div__card__row1__col__card__div__row__span__img"
                  />
                  {contactItem?.personalDetails?.phone || '--'}
                </span>
              </Row>
              <Row className="connectsListContainer__div__card__row1__col__card__div__row1">
                <span className="connectsListContainer__div__card__row1__col__card__div__row1__span">
                  <img
                    src={require('../../../../../assets/images/mail.png')}
                    alt="mail"
                    className="connectsListContainer__div__card__row1__col__card__div__row1__span__img"
                  />
                  {contactItem?.personalDetails?.email || '--'}
                </span>
              </Row>
            </div>
            {contactItem?.isResourceLocked && (
              <div
                className="connectsListContainer__div__card__row1__col__card__hidediv"
                // onClick={() => {
                //   dispatch(
                //     unlockConnectsFields({
                //       body: {
                //         payload: [
                //           {
                //             name: contactItem?.name,
                //             resourceId: contactItem?._id,
                //             resourceType: 'commercial',
                //             resourceSubType: 'connect',
                //             unlockedFields: ['personalDetails'],
                //             crmPayload: {
                //               Email: contactItem?.personalDetails?.email,
                //               FirstName: contactItem?.personalDetails?.name,
                //               Mobile: contactItem?.personalDetails?.phone,
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
                <span className="connectsListContainer__div__card__row1__col__card__hidediv__span">
                  <img
                    src={require('../../../../../assets/images/phone.png')}
                    alt="phone"
                    className="connectsListContainer__div__card__row1__col__card__hidediv__span__img"
                  />
                  Click to unlock button unhide Details
                </span>
              </div>
            )}
          </Card>
        </Col>
        {/* <Col span={4} className="connectsListContainer__div__card__row1__col1">
          <Row className="connectsListContainer__div__card__row1__col1__row">
            <img
              src={require(`../../../../../assets/images/jnc.png`)}
              alt="Organization Image"
              className="connectsListContainer__div__card__row1__col1__row__img"
            />
          </Row>
        </Col> */}
      </Row>
      <Row className="connectsListContainer__div__card__row2">
        <Col span={24} className="connectsListContainer__div__card__row2__col">
          Years of experience: {contactItem?.professionalDetails?.experience}
        </Col>
      </Row>
      <Row className="connectsListContainer__div__card__row3">
        <Col span={24} className="connectsListContainer__div__card__row3__col">
          <div className="connectsListContainer__div__card__row3__col__div">Construction</div>
          <div className="connectsListContainer__div__card__row3__col__div">Software</div>
        </Col>
      </Row>
      <Row className="connectsListContainer__div__card__row4">Key Skills:</Row>
      <Row className="connectsListContainer__div__card__row5">
        <Col span={24} className="connectsListContainer__div__card__row5__col">
          {contactItem?.keySkills?.map((el) => {
            return el.split(',').map((e) => {
              return <div className="connectsListContainer__div__card__row5__col__div">{e || '--'}</div>;
            });
          })}
        </Col>
      </Row>
    </div>
  );
};

export default ConnectDetailV1;

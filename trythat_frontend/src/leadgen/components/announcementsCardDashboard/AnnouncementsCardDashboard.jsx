import { Button, Card } from 'antd';
import { Col, Row } from 'antd';
import React from 'react';
import dollorbagIcon from '../../../assets/CRM.png';
import { format, parseISO } from 'date-fns';
import dayjs from 'dayjs';
import './AnnouncementsCardDashboard.scss';
const AnnouncementsCardDashboard = ({ data }) => {
  return (
    <Card className="card-announcement">
      <div>
        <Row>
          <Col span={16}>
            <div className="card-announcement__items">
              <h4 className="card-announcement__items-heading">{data?.title}</h4>
              <p className="card-announcement__items-desc">{data?.description}</p>
              {data?.callToAction && (
                <Button className="card-announcement__items-btn" size="medium">
                  Action
                  {/* {data?.buttonText} */}
                </Button>
              )}
            </div>
          </Col>
          <Col span={8} className="card-announcement__date">
            <p>{dayjs(data?.createdAt).format('DD-MM-YYYY')}</p>

            <img src={dollorbagIcon} alt="" width={40} />
          </Col>
        </Row>
      </div>
    </Card>
  );
};

export default AnnouncementsCardDashboard;

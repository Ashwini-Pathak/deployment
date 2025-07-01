import { Card } from 'antd';
import { format, compareAsc } from 'date-fns';
import dayjs from 'dayjs';
import React from 'react';
import './NotificationCardDashboard.scss';

const NotificationCardDashboard = ({ data }) => {
  return (
    <Card className="card-notification">
      <div className='card-notification__items' >
        <div className='card-notification__items-box'>
          <span  className='items-box__date'>{dayjs(data?.createdAt).format('DD-MM-YYYY')}</span>
          <small  className='items-box__time'>{format(data?.createdAt, 'hh:mm')}</small>
        </div>
        <p  className='card-notification__items-desc'>{data?.description}</p>
      </div>
    </Card>
  );
};

export default NotificationCardDashboard;

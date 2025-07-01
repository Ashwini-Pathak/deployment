import React from 'react';
import CommonCard from './CommonCard';
import { Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import CommonButton from '../common/CommonButton';
import { nanoid } from '@reduxjs/toolkit';

const AllCards = () => {
  const cards = [
    {
      title: 'Groups',
      data: [
        {
          name: 'Real estate discussion group',
        },
        {
          name: 'Investment Opportunities group',
        },
      ],
    },
    {
      title: 'Community',
      data: [
        {
          name: 'Real estate networking',
        },
        {
          name: 'Stock Market traders',
        },
      ],
    },
    {
      title: 'Events',
      data: [
        {
          name: 'Pune Meet up June',
        },
        {
          name: 'Mumbai Meet up July',
        },
      ],
    },
  ];

  return (
    <div className="d-flex d-column g-20">
      {cards?.map((data) => (
        <CommonCard key={nanoid()} label={data?.title}>
          <div
            style={{ margin: '15px 0px', padding: '5px 10px', borderRadius: 15 }}
            className="font16 a-center fontDark d-flex jc-center d-column g-20 imgcontainerAllCards position-relative"
          >
            <div className="w-100 cardContainer">
              {data?.data?.map((dataVal) => (
                <div key={nanoid()} className="d-flex jc-between g-10 ">
                  <span className="d-flex g-15 a-center ">
                    <Avatar src={''} icon={<UserOutlined />} />
                    <div className="d-flex d-column">
                      <span className="font14 font700 fontdark ">{dataVal?.name}</span>
                      {/* <span className="font14 fontExtraLight ">Technical Lead</span> */}
                    </div>
                  </span>
                  <CommonButton ghost>Join Now</CommonButton>
                </div>
              ))}
            </div>
            <div className="comingSoonTag">
              <span>Coming Soon</span>
            </div>
          </div>
        </CommonCard>
      ))}
    </div>
  );
};

export default AllCards;

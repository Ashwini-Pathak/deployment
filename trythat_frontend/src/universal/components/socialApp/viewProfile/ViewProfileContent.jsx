import { EyeInvisibleOutlined, MoreOutlined, WarningOutlined } from '@ant-design/icons';
import { Dropdown } from 'antd';
import React from 'react';
import './viewProfile.scss';
const ViewProfileContent = ({
  profileContent = [
    {
      url: 'https://www.kasandbox.org/programming-images/avatars/spunky-sam-green.png',
      text: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum',
    },
    {
      url: 'https://www.kasandbox.org/programming-images/avatars/spunky-sam-green.png',
      text: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum',
    },
    {
      url: 'https://www.kasandbox.org/programming-images/avatars/spunky-sam-green.png',
      text: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum',
    },
    {
      url: 'https://www.kasandbox.org/programming-images/avatars/spunky-sam-green.png',
      text: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum',
    },
  ],
}) => {
  const extraMenu = [
    {
      key: 'accountDetails',
      label: (
        <span className="d-flex a-center g-5">
          <EyeInvisibleOutlined /> <span className="font14 fontLight ">Account Details</span>
        </span>
      ),
    },
    {
      key: 'report',
      label: (
        <span className="d-flex a-center g-5 ">
          <WarningOutlined className="font16 fontLight fontError" />{' '}
          <span className="font14 fontLight fontError">Report</span>
        </span>
      ),
    },
  ];
  return (
    <div className="profileContent">
      {profileContent?.map((data) => (
        <div className="profileContentCard">
          <img src={data?.url} />
          <div className="cardOverlay">
            <span className="menu">
              <Dropdown trigger={'click'} placement="bottomRight" menu={{ items: extraMenu }} className="moreDetails">
                <MoreOutlined />
              </Dropdown>
            </span>
            <span className="cardText">{data?.text}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ViewProfileContent;

import { ArrowLeftOutlined, LeftOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar, Divider } from 'antd';
import React from 'react';
import CommonButton from '../common/CommonButton';
import { useNavigate } from 'react-router';
const ViewProfileHeader = () => {
  // hooks
  const navigateTo = useNavigate();
  const userDetail = {
    userName: 'John DOe',
    designation: 'Architech',
  };

  // on back button click
  const onBackButtonClick = () => {
    navigateTo(-1);
  };
  return (
    <div className="d-flex jc-between ">
      <span className="d-flex g-15 a-center viewProfileHeader">
        <LeftOutlined onClick={onBackButtonClick} />
        <Avatar size={64} src={''} icon={<UserOutlined />} />
        <div className="d-flex d-column">
          <span className="font22 font700 fontDark ">{userDetail?.userName}</span>
          <span className="font18 fontExtraLight ">{userDetail?.designation}</span>
        </div>
      </span>
      <span className="d-flex g-15 a-center">
        <CommonButton style={{ height: 'unset', fontSize: 18, padding: '0px 20px' }} ghost>
          Follow
        </CommonButton>
      </span>
    </div>
  );
};

export default ViewProfileHeader;

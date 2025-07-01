import React from 'react';
import { Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import verifiedIcon from '../../../assets/images/verified.png';
import './ProspectImage.scss';
const ProspectImage = ({ imageUrl }) => {
  return (
    <div className="prospectimage-container">
      <Avatar size={130} src={imageUrl} icon={<UserOutlined />} className="prospectimage-container__circle" />
      <div className="prospectimage-container__imgbox">
        <img src={verifiedIcon} alt="verified" className="prospectimage-container__imgbox-img" />
      </div>
    </div>
  );
};

export default ProspectImage;

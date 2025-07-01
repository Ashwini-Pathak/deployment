import React from 'react';
import './common.scss';
import { Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';

const Profile = ({ avatarUrl, name, profession }) => {
  return (
    <div className="profile">
      {/* <img src={avatarUrl} alt="Avatar" className="profile-avatar" /> */}
      <Avatar icon={<UserOutlined />} />
      <div className="profile-details">
        <p>
          <strong>{name}</strong>
        </p>
        <p className="description">{profession}</p>
      </div>
    </div>
  );
};

export default Profile;

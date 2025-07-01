import { MoreOutlined, UserOutlined, WarningOutlined } from '@ant-design/icons';
import { Avatar, Dropdown } from 'antd';
import React, { useState } from 'react';
import CommonButton from '../../common/CommonButton';
import { useNavigate } from 'react-router';
const PostHeader = ({ postDetails, handleFollow, handleUnFollow }) => {
  // hooks
  const [loader, setLoader] = useState(false);

  const onFollowUser = () => {
    setLoader(true);
    handleFollow(postDetails?.ownerId)?.then((res) => {
      setLoader(false);
    });
  };

  const onUnFollowUser = () => {
    setLoader(true);
    handleUnFollow(postDetails?.ownerId)?.then((res) => {
      setLoader(false);
    });
  };

  const extraMenu = [
    {
      key: 'accountDetails',
      label: (
        <span className="d-flex a-center g-5">
          <UserOutlined /> <span className="font14 fontLight ">Account Details</span>
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
  const onAvatarClick = () => {
    // navigateTo('123');
  };

  return (
    <div className="d-flex jc-between ">
      <span className="d-flex g-10 a-center " style={{ marginLeft: '400px', marginTop: '20px' }}>
        <Avatar
          className="avatar"
          onClick={onAvatarClick}
          src={''}
          icon={<UserOutlined />}
          style={{ width: '40px', height: '40px' }}
        />
        <div className="d-flex d-column">
          <span className="font16 font700 fontdark ">{postDetails?.ownerDetails?.name}</span>
          <div className="d-flex g-5">
            <span className="font16 fontExtraLight ">
              {postDetails?.ownerDetails?.professionalDetails?.designation}
            </span>
            {postDetails?.ownerDetails?.professionalDetails?.companyName && (
              <span className="font14 fontExtraLight ">
                @{postDetails?.ownerDetails?.professionalDetails?.companyName}
              </span>
            )}
          </div>
        </div>
      </span>
      <span className="d-flex g-15 a-center" style={{ marginTop: '20px' }}>
        <CommonButton
          loader={loader}
          onClick={() => {
            postDetails.isFollowed ? onUnFollowUser() : onFollowUser();
          }}
          ghost
        >
          {postDetails.isFollowed ? 'Unfollow' : 'Follow'}
        </CommonButton>
      </span>
    </div>
  );
};

export default PostHeader;

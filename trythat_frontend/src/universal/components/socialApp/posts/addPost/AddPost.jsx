import { Avatar, Divider } from 'antd';
import React from 'react';
import CommonButton from '../../common/CommonButton';
import { UserOutlined } from '@ant-design/icons';
import Text from 'antd/es/typography/Text';

const AddPost = ({ setShowCreatePopup, imageUrl = '' }) => {
  return (
    <div className="socialAppContainer__postContainer--addPost">
      <div className="addPostHeader">Share your thoughts </div>
      <Divider className="addPostdivider" />
      <div className="addPostBody">
        <span className="addPostBodyLeftSection">
          <Avatar src={imageUrl} icon={<UserOutlined />} />
          <Text className="font16 font400"> What's on your mind?</Text>
        </span>
        <CommonButton onClick={() => setShowCreatePopup(true)} ghost type="primary">
          Create Post
        </CommonButton>
      </div>
    </div>
  );
};

export default AddPost;

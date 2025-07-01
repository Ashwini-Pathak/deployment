import { Tabs } from 'antd';
import React, { useState } from 'react';
import './postDetails.scss';
const PostDetails = () => {
  const [activeTab, setActiveTab] = useState('MY_POST');

  const onTabChange = (e) => {
    setActiveTab(e);
  };
  const postDetailsItems = [
    { key: 'MY_POST', label: 'My Posts', children: '' },
    { key: 'CREATE_POST', label: 'Create Post', children: '' },
    { key: 'SAVED_POSTS', label: 'Saved Posts', children: '' },
  ];

  return (
    <div className="postDetailsContainer">
      <Tabs activeKey={activeTab} className="postDetailsTabs" onChange={onTabChange} items={postDetailsItems} />
    </div>
  );
};

export default PostDetails;

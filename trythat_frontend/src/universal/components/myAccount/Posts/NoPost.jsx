import React from 'react';

import './MyPosts.scss';

const NoPost = ({ data }) => {
  return (
    <div className="profile-layout a-center" gutter={16}>
      <span className="text-center font20 w-100 fontExtraLight"> No Post Found</span>
    </div>
  );
};

export default NoPost;

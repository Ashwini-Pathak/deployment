import React from 'react';
import { LikeOutlined, SendOutlined } from '@ant-design/icons';
import './common.scss';

const IconButtons = () => {
  return (
    <div className="d-flex d-column">
      <div className="d-flex jc-between p-5">
        <span className="d-flex jc-between g-20 iconButton">
          <span className="d-flex g-5 font14 fontExtraLight">
            <LikeOutlined className="font16" /> <span>Likes</span>
          </span>
          <span className="d-flex g-5 font14 fontExtraLight">
            <SendOutlined className="font16" /> <span>Shares</span>
          </span>
        </span>
      </div>
    </div>
  );
};

export default IconButtons;

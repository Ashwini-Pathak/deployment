import {
  CommentOutlined,
  LikeOutlined,
  RetweetOutlined,
  SendOutlined,
  SmileOutlined,
  TabletOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Avatar, Divider, Input } from 'antd';
import React from 'react';
const ViewPostFooter = ({ data }) => {
  return (
    <div className="d-flex d-column">
      <div className="d-flex jc-between p-5">
        <span className="d-flex jc-between g-20">
          <span className="d-flex g-5 font14 fontExtraLight">
            <LikeOutlined className="font16" /> <span>Likes</span>
          </span>
          <span className="d-flex g-5 font14 fontExtraLight">
            <CommentOutlined className="font16" /> <span>Comments</span>
          </span>
          <span className="d-flex g-5 font14 fontExtraLight">
            <SendOutlined className="font16" /> <span>Shares</span>
          </span>
        </span>
        <span className="d-flex jc-between g-20">
          <span className="d-flex g-5 font14 fontExtraLight">
            <RetweetOutlined className="font16" /> <span>Repost</span>
          </span>
          <span className="d-flex g-5 font14 fontExtraLight">
            <TabletOutlined className="font16" /> <span>Saved</span>
          </span>
        </span>
      </div>
      <Divider className="footerDivider" />
      <div className="footerInput">
        <Avatar src={''} icon={<UserOutlined />} />
        <Input placeholder="Write Your Comment" suffix={<SmileOutlined className="fon14 fontExtraLight" />} />
      </div>
    </div>
  );
};

export default ViewPostFooter;

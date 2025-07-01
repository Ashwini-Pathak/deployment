import { UserOutlined } from '@ant-design/icons';
import { Avatar, Button, Modal } from 'antd';
import React, { useState } from 'react';

import { truncate } from 'lodash';
import { useSelector } from 'react-redux';
import './MyPosts.scss';
import ViewPostModal from './viewPostModal/ViewPostModal';
import CommonButton from '../../socialApp/common/CommonButton';
import CommentComponent from '../../socialApp/posts/postFooter/CommentComponent';

const MyPosts = ({ data, companyData, isCompany }) => {
  // states
  const [postData, setPostData] = useState(null);
  const [isVisiable, setIsVisiable] = useState(false);

  const user = useSelector((state) => state?.user?.user);

  const handleCancel = () => {
    setIsVisiable(false);
  };
  return (
    <div className="profile-layout" gutter={16}>
      <div className="imgcontainer position-relative">
        <img
          src={
            data?.imageUrls?.length > 0
              ? data?.imageUrls?.[0]
              : 'https://placehold.jp/18/1677ff/ffffff/200x200.png?text=TryThat.ai'
          }
          alt="Profile"
          className="profile-image"
        />
        <div className="cardOverlayPost">
          <Button
            onClick={() => {
              setPostData(data);
              setIsVisiable(true);
            }}
            size="small"
            className="btn"
            ghost
            type="primary"
          >
            View Post
          </Button>
        </div>
      </div>
      <div className="content-col">
        <div className="d-flex jc-between g-10 ">
          <span className="d-flex g-15 a-center ">
            <Avatar src={user?.personalDetails?.imageUrl} icon={<UserOutlined />} />
            {isCompany ? (
              <div className="d-flex d-column">
                {companyData?.name && (
                  <span className="font14 fontExtraLight ">{user?.professionalDetails?.companyName}</span>
                )}
                {companyData?.address && (
                  <span className="font14 fontExtraLight ">
                    {companyData?.address?.city},{companyData?.address?.state}
                  </span>
                )}
              </div>
            ) : (
              <div className="d-flex d-column">
                <span className="font14 font700 fontdark ">{user?.name}</span>
                <div className="d-flex">
                  {user?.professionalDetails?.designation && (
                    <span className="font14 fontExtraLight ">{user?.professionalDetails?.designation}</span>
                  )}
                  {user?.professionalDetails?.companyName && (
                    <span className="font14 fontExtraLight ">@{user?.professionalDetails?.companyName}</span>
                  )}
                </div>
              </div>
            )}
          </span>
        </div>
        <div className="w-100 d-flex d-column g-5 a-start">
          <span className="font16  fontDark font700 g-15">{truncate(data?.title, { length: 30 })}</span>
          <span className="font14 font500 fontExtraLight g-15">{truncate(data?.body, { length: 100 })}</span>
          <span className="d-flex font500 fontExtraLight g-5">
            {data?.tags?.map((elem) => (
              <span className=" font14 font500 fontExtraLight g-15">#{elem}</span>
            ))}
          </span>
          {data?.CTA?.link && (
            <Button size="small" ghost type="primary" href={data?.CTA?.link} title={data?.CTA?.link} target="_blank">
              {data?.CTA?.name}
            </Button>
          )}
        </div>
      </div>

      {/* ---------------view post modal------- */}
      {/* {postData && <ViewPostModal setPostData={setPostData} postData={postData} />} */}
      {postData && (
        <Modal title={null} open={isVisiable} onCancel={handleCancel} footer={null} width={820}>
          <CommentComponent postDetails={postData} postId={postData?._id} userId={user?._id} />
        </Modal>
      )}
    </div>
  );
};

export default MyPosts;

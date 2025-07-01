import {
  CommentOutlined,
  LikeOutlined,
  RetweetOutlined,
  SendOutlined,
  SmileOutlined,
  TabletOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { useState } from 'react';
import { Avatar, Divider, Input, Modal } from 'antd';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './postFooter.scss';
import { isModalShow, updateActivity, getComments } from '../../../../features/socialAppSlice';
import CommentComponent from './CommentComponent';
import unLike from '../../../../../assets/images/comment.svg'
import like from '../../../../../assets/images/blue-material-thumb-up.svg' 
import comment from '../../../../../assets/images/postcomment.svg'


const PostFooter = ({ postDetails, allPostsPage = false }) => {
  const userId = useSelector((state) => state.user?.user?.id);
  const [isVisiable, setIsVisiable] = useState(false);
  const dispatch = useDispatch();

  const handleLike = () => {
    dispatch(updateActivity({ userId: userId, postId: postDetails?._id, action: 'likes' }));
    dispatch(getComments({ userId: userId, postId: postDetails?._id }));
  };

  const handleUnLike = () => {
    dispatch(updateActivity({ userId: userId, postId: postDetails?._id, action: 'unlikes' }));
    dispatch(getComments({ userId: userId, postId: postDetails?._id }));
  };

  const handleCancel = () => {
    setIsVisiable(false);
  };

  const showModal = () => {
    setIsVisiable(!isVisiable);
    if (!isVisiable) {
      dispatch(getComments({ userId: userId, postId: postDetails?._id }));
    }
  };

  return (
    <div className="d-flex d-column" style={{ marginLeft: '410px', marginTop: '-95px' }}>
      <div className="d-flex jc-between p-5">
        <span className="d-flex jc-between g-20">
          <span onClick={postDetails?.isLiked ? handleUnLike : handleLike} style={{ cursor: 'pointer' }} >
            <img src={postDetails?.isLiked ? like : unLike} alt={postDetails?.isLiked ? "like" : "unLike"} />
          </span>
          <span
            onClick={() => {
              if (allPostsPage) showModal();
            }}
            style={allPostsPage ? { cursor: 'pointer' } : { cursor: 'auto' }}
          >
            <img src={comment} alt="comment" />
          </span>
          <Modal title={null} open={isVisiable} onCancel={handleCancel} footer={null} width={820}>
            <CommentComponent userId={userId} postId={postDetails?._id} postDetails={postDetails} />
          </Modal>
        </span>
      </div>
      <Divider className="footerDivider" />
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          gap: '20px',
          fontSize: '12px',
          color: '#cbcbcb',
          marginTop: '5px',
        }}
      >
        <span>{postDetails.likes} Likes </span>
        <span>
          <li>{postDetails.comments} Comments</li>
        </span>
      </div>
    </div>
  );
};

export default PostFooter;

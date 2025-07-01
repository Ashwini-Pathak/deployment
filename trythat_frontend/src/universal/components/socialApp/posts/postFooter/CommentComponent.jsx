import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { LikeOutlined, CommentOutlined, UserOutlined } from '@ant-design/icons';
import { Carousel, Divider, Avatar, Button } from 'antd';
import {
  updateActivity,
  getComments,
  socialAppUnFollowUser,
  socialAppFollowUser,
  getPostDetails,
} from '../../../../features/socialAppSlice';
import './CommentComponent.scss';
import { formatDistanceToNow } from 'date-fns';
import PostHeader from '../postHeader/PostHeader';
import GenericPost from '../allPosts/genericPost/GenericPost';
import PostFooter from './PostFooter';

const CommentComponent = ({ userId, postId, postDetails }) => {
  const dispatch = useDispatch();
  const comments = useSelector((state) => state.socialAppSlice.socialAppComments);
  const loading = useSelector((state) => state.socialApp?.socialApploader);
  const error = useSelector((state) => state.socialApp?.error);

  const [newComment, setNewComment] = useState('');

  useEffect(() => {
    dispatch(getComments({ userId, postId }));
  }, [dispatch, userId, postId]);

  const handleAddComment = async () => {
    if (newComment.trim() !== '') {
      dispatch(updateActivity({ userId, postId, action: 'comments', text: newComment }));
      setNewComment('');
      dispatch(getComments({ userId, postId }));
    }
  };

  const onAvatarClick = () => {
    // navigateTo('123');
  };

  const handleFollow = (userId) => {
    return dispatch(
      socialAppFollowUser({
        userToFollow: userId,
      }),
    );
  };
  const handleUnFollow = (userId) => {
    return dispatch(
      socialAppUnFollowUser({
        userToUnfollow: userId,
      }),
    );
  };

  const sortedComments = comments.slice().sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  return (
    <div className="comment-modal-content">
      <div className="modal-post">
        <div className="post-left">
          <PostHeader handleFollow={handleFollow} handleUnFollow={handleUnFollow} postDetails={postDetails} />
          <div>
            <GenericPost postDetails={postDetails} />
          </div>
          <div style={{ marginTop: '-30px' }}>
            <PostFooter postDetails={postDetails} />
            <div style={{ width: '440px', marginLeft: '394px', marginTop: '-10px' }}>
              <Divider style={{ borderColor: '#888' }} className="comment-divider" />
            </div>
          </div>
        </div>
        <div
          style={{ display: 'flex', alignItems: 'end', marginTop: '-25px', marginLeft: '20px' }}
          className="post-right"
        >
          <div style={{ display: 'flex', gap: '17px' }}>
            <Avatar
              className="avatar"
              onClick={onAvatarClick}
              src={''}
              icon={<UserOutlined />}
              style={{ alignContent: 'center', width: '40px', height: '40px' }}
            />
            <div className="comment-input-container">
              <input
                style={{ borderRadius: '8px', width: '267px', backgroundColor: '#f2f2f2', border: 'none' }}
                type="text"
                className="comment-input"
                placeholder="Write Your Comment"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
              />
              <Button
                style={{ borderRadius: '8px', color: '#4096ff', borderColor: '#4096ff', background: 'transparent' }}
                onClick={handleAddComment}
                ghost
              >
                Post
              </Button>
            </div>
          </div>
          <div className="comments-list">
            {loading && <p>Loading comments...</p>}
            {error && <p>{error}</p>}
            {sortedComments.length > 0 ? (
              sortedComments.map((comment) => (
                <div
                  style={{
                    backgroundColor: '#f2f2f2',
                    padding: '10px',
                    borderRadius: '10px',
                    width: '340px',
                    marginLeft: '40px',
                  }}
                  key={comment._id}
                  className="comment-item"
                >
                  <div className="comment-header">
                    <span className="font14 font700">{comment.userDetails.name}</span>
                    <span className="font12" style={{ color: '#888' }}>
                      {formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true })}
                    </span>
                  </div>
                  <div className="font12" style={{ color: '#888' }}>
                    {comment.userDetails.professionalDetails.companyName}
                  </div>
                  <div className="comment-text font14" style={{ marginTop: '10px' }}>
                    {comment.text}
                  </div>
                </div>
              ))
            ) : (
              <p style={{ marginLeft: '48px' }}>No comments yet</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommentComponent;

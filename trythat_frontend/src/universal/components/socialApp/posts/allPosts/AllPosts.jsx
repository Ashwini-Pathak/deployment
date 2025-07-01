import React from 'react';

import InfiniteScroll from 'react-infinite-scroll-component';
import { useDispatch, useSelector } from 'react-redux';
import { socialAppFollowUser, socialAppUnFollowUser } from '../../../../features/socialAppSlice';
import NoPost from '../../../myAccount/Posts/NoPost';
import PostHeader from '../postHeader/PostHeader';
import GenericPost from './genericPost/GenericPost';
import { Modal, Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import PostFooter from '../postFooter/PostFooter';
import './AllPosts.scss';

const AllPosts = ({ handleScroll, allPosts }) => {
  // hooks
  const dispatch = useDispatch();
  const postTypes = {
    generic_card: GenericPost,
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

  return (
    <div id="scrolldiv" className="postContainer">
      {allPosts?.posts?.length > 0 ? (
        <InfiniteScroll
          dataLength={200}
          next={handleScroll}
          hasMore={(allPosts?.posts?.length || 0) < (allPosts?.totalRecords || 0)}
          loader={
            <span>
              <Spin className="w-100 d-flex jc-center" indicator={<LoadingOutlined />} />
            </span>
          }
          scrollableTarget="postContainer"
        >
          {allPosts?.posts?.map((post) => {
            const CurrentPost = postTypes?.[post?.type];
            return (
              <div className="allPostContainer">
                <PostHeader handleFollow={handleFollow} handleUnFollow={handleUnFollow} postDetails={post} />
                {CurrentPost && <CurrentPost postDetails={post} />}
                {/* <PostFooter postDetails={post} /> */}
                <PostFooter handleFollow={handleFollow} postDetails={post} allPostsPage={true} />
              </div>
            );
          })}
        </InfiniteScroll>
      ) : (
        <NoPost />
      )}
    </div>
  );
};

export default AllPosts;

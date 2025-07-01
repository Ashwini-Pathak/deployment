import React, { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useDispatch, useSelector } from 'react-redux';
import { getUserAllPosts } from '../../../features/socialAppSlice';
import MyPosts from './MyPosts';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import NoPost from './NoPost';
const PostContainer = ({ activeAccountTab, activeTab }) => {
  // hooks
  const dispatch = useDispatch();
  // States
  const limit = 10;
  const [offset, setOffset] = useState(0);
  const [allPosts, setAllposts] = useState([]);

  useEffect(() => {
    setOffset(0);
    if (activeTab == 'MY_POST' && activeAccountTab == 'personal_details') {
      dispatch(
        getUserAllPosts({
          offset: offset,
          limit: limit,
        }),
      )?.then((res) => {
        if (res?.payload?.data?.response?.data) {
          setAllposts(res?.payload?.data?.response?.data?.posts);
        }
      });
    }
  }, [activeTab, activeAccountTab]);
  const handleScroll = () => {
    setOffset((prev) => prev + limit);
    dispatch(
      getUserAllPosts({
        offset: offset + limit,
        limit: limit,
      }),
    )?.then((res) => {
      if (res?.payload?.data?.response?.data) {
        setAllposts((prev) => {
          return {
            ...prev,
            posts: [...(prev?.posts || []), ...(res?.payload?.data?.response?.data?.posts?.posts || [])],
            totalRecords: res?.payload?.data?.response?.data?.posts?.totalRecords,
          };
        });
      }
    });
  };

  return (
    <div style={{ height: '100%', position: 'relative' }}>
      <InfiniteScroll
        style={{ padding: '0px 10px' }}
        dataLength={allPosts?.posts?.length || 0}
        next={handleScroll}
        hasMore={(allPosts?.posts?.length || 0) < (allPosts?.totalRecords || 0)}
        loader={
          <span>
            <Spin className="w-100 d-flex jc-center" indicator={<LoadingOutlined />} />
          </span>
        }
        scrollableTarget="scrollableDiv"
      >
        {allPosts?.posts?.length > 0 ? (
          allPosts?.posts?.map((elem, index) => <MyPosts key={index} data={elem} />)
        ) : (
          <NoPost />
        )}
      </InfiniteScroll>
    </div>
  );
};

export default PostContainer;

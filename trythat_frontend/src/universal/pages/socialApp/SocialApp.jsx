// Css Imports
import './socialApp.scss';
import { Card, Divider, Empty, Spin } from 'antd';
import Title from 'antd/es/typography/Title';
import genIcon from '../../../assets/LeadGen.png';
import dayjs from 'dayjs';
// React,React-Redux,Router Imports
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import AddPost from '../../components/socialApp/posts/addPost/AddPost';
import AddPostPopup from '../../components/socialApp/posts/addPost/AddPostPopup';
import AllPosts from '../../components/socialApp/posts/allPosts/AllPosts';
import { getSocialDashbordPosts, setIsUserFollowed, setSearchVisibleSocialApp } from '../../features/socialAppSlice';
import AnnouncementsCardDashboard from '../../../leadgen/components/announcementsCardDashboard/AnnouncementsCardDashboard';

// Slices and reducer imports

// Component Imports

const SocialApp = () => {
  const { recentActivities } = useSelector((store) => store.userDashboard);

  // Hooks
  const dispatch = useDispatch();

  // // States
  const limit = 10;
  const [offset, setOffset] = useState(0);
  const [allPosts, setAllposts] = useState([]);
  const [showCreatePostPopup, setShowCreatePopup] = useState(false);
  const { user } = useSelector((store) => store.user);
  const { isUserFollowed } = useSelector((store) => store.socialAppSlice);
  const { socialAppComments } = useSelector((store) => store.socialAppSlice);

  // fetching on mounting
  useEffect(() => {
    setOffset(0);
    dispatch(setSearchVisibleSocialApp(true));
    dispatch(
      getSocialDashbordPosts({
        offset: offset,
        limit: limit,
      }),
    )?.then((res) => {
      if (res?.payload?.data?.response?.data) {
        setAllposts(res?.payload?.data?.response?.data);
      }
    });
    return () => dispatch(setSearchVisibleSocialApp(false));
  }, []);

  useEffect(() => {
    setOffset(0);
    dispatch(setSearchVisibleSocialApp(true));
    dispatch(
      getSocialDashbordPosts({
        offset: offset,
        limit: limit,
      }),
    )?.then((res) => {
      if (res?.payload?.data?.response?.data) {
        setAllposts(res?.payload?.data?.response?.data);
      }
    });
    return () => dispatch(setSearchVisibleSocialApp(false));
  }, [socialAppComments]);

  // fetching on user start Following
  useEffect(() => {
    if (isUserFollowed) {
      setOffset(0);
      dispatch(
        getSocialDashbordPosts({
          offset: offset,
          limit: limit,
        }),
      )?.then((res) => {
        if (res?.payload?.data?.response?.data) {
          setAllposts(res?.payload?.data?.response?.data);
        }
        dispatch(setIsUserFollowed());
      });
    }
  }, [isUserFollowed]);

  // handleing infinite scroll
  const handleScroll = () => {
    setOffset((prev) => prev + limit);
    dispatch(
      getSocialDashbordPosts({
        offset: offset + limit,
        limit: limit,
      }),
    )?.then((res) => {
      if (res?.payload?.data?.response?.data) {
        setAllposts((prev) => {
          return {
            ...prev,
            posts: [...(prev?.posts || []), ...(res?.payload?.data?.response?.data?.posts || [])],
            totalRecords: res?.payload?.data?.response?.data?.totalRecords,
          };
        });
      }
    });
  };

  // on close popup
  const onCloseCreatePopup = () => {
    setShowCreatePopup(false);
  };
  return (
    <div className="socialAppContainer">
      <div className="socialAppContainer__postContainer">
        {/* -----Add post------ */}

        <AddPost imageUrl={user?.personalDetails?.imageUrl} setShowCreatePopup={setShowCreatePopup} />

        {/* -----Add post------ */}

        {/* -----ALl post------ */}
        <AllPosts handleScroll={handleScroll} allPosts={allPosts} />
        {/* -----ALl post------ */}

        <div className="socialAppContainer__postContainer--post"></div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <div className="socialAppContainer__rightContainer">
          <span style={{ fontSize: '17px', fontWeight: '600', paddingLeft: '18px' }}>Announcements</span>
          <div
            style={{ overflow: 'scroll', height: '100%' }}
            className="socialAppContainer__rightContainer--insideContainer"
          >
            {' '}
            <AnnouncementsCardDashboard
              data={{
                description: 'Coming Soon',
                title: 'Coming Soon',
                callToAction: true,
              }}
            />
            <AnnouncementsCardDashboard
              data={{
                description: 'Coming Soon',
                title: 'Coming Soon',
                callToAction: true,
              }}
            />
          </div>
        </div>
        <Card>
          <Title style={{ fontSize: '17px' }} level={4}>
            Recent Activity
          </Title>
          <div className="userdashboard-activity">
            {recentActivities?.map((el, index) => {
              return (
                <div key={index}>
                  <Divider />
                  <div className="userDashboard__activity-item">
                    <div className="activity-item__action">
                      <div className="userDashboard__activity-icon">
                        <img src={genIcon} alt="" width={30} />
                      </div>
                      <span className="userDashboard__activity-message">{el.message}</span>
                    </div>

                    <span className="userDashboard__activity-time">
                      {dayjs(el?.createdAt).format('DD-MM-YYYY hh:mm')}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>
      </div>
      {/* -----------Add post pop over----------- */}
      <AddPostPopup open={showCreatePostPopup} closePopup={onCloseCreatePopup} />
      {/* -----------Add post pop over----------- */}
    </div>
  );
};

export default SocialApp;

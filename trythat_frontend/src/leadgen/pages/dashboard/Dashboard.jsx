import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Card, Empty, Spin } from 'antd';

import { getUserProspectsStats } from '../../features/dashboardSlice';
import StatsCardDashboard from '../../components/statsCardDashboard/StatsCardDashboard';
import AnnouncementsCardDashboard from '../../components/announcementsCardDashboard/AnnouncementsCardDashboard';
import NotificationCardDashboard from '../../components/notificationCardDashboard/NotificationCardDashboard';
import RecommendedConnectsCard from '../../components/recommendedConnectsDashboard/RecommendedConnectsCard';
import ProfileCompletion from '../../components/profileCompletion/ProfileCompletionProgress';

import './dashboard.scss';
import { fetchUserProfileCompletion } from '../../../universal/features/myAccountSlice';
import { useNavigate } from 'react-router-dom/dist';
import { fetchAccouncementsData } from '../../../universal/features/userDashboardSlice';

import { getDashboardData } from '../../../utils/referenceData/dashboardStaticData';
import { isEmpty } from 'lodash';
import { setSelectedNav } from '../../../../src/leadgen/features/leadGenSideNavSlice';



const Dashboard = () => {
  const dispatch = useDispatch();
  const navigateTo = useNavigate();
  const { loading, stats } = useSelector((store) => store.dashboard);
  const { announcements } = useSelector((store) => store.userDashboard);
  const { profileCompletion, universalNotifications } = useSelector((store) => store.user);
  const { userPoints } = useSelector((store) => store.userOnboarding);
  
   useEffect(()=>{
    dispatch(setSelectedNav('Home'));

   },[]);
 
  const dashboardStatsCards = [
    {
      cardTitle: 'Points',
      value: userPoints,
    },
    {
      cardTitle: 'Connects Saved',
      value: stats?.connects || 0,
    },
    {
      cardTitle: 'Organizations Saved',
      value: stats?.organization || 0,
    },
    {
      cardTitle: 'Properties Saved',
      value: stats?.properties || 0,
    },
  ];
  const profileCompletionSteps = [
    {
      label: 'Registration',
      key: 'registration',
    },
    {
      label: 'Personal Details',
      key: 'personalDetails',
    },
    {
      label: 'Professional Details',
      key: 'professionalDetails',
    },
    {
      label: 'Geo Location',
      key: 'geoLocation',
    },
    {
      label: 'Offerings',
      key: 'offerings',
    },
    {
      label: 'Preferences',
      key: 'preferences',
    },
  ];
  useEffect(() => {
    getData();
  }, []);

  

  const getData = () => {
    dispatch(getUserProspectsStats());
    dispatch(fetchUserProfileCompletion());
    dispatch(fetchAccouncementsData());
  };

  return (
    <>
      {loading ? (
        <Spin spinning={loading} size="large" fullscreen />
      ) : (
        <section
          className="dashboard__container"

        >
          <div className='container-left__box'>
            <div className="card__total">
              {dashboardStatsCards?.map((el, idx) => {
                return <StatsCardDashboard data={el} key={idx} />;
              })}
            </div>
            <Card className="card__profile">
              <div>
                <div className='profile-items'>
                  <h2 className='item-yourprofile'> Your Profile</h2>
                  <h4 className='item-completion'>
                    Profile Completion Status: {profileCompletion?.overallCompletion}%
                  </h4>
                </div>
              </div>

              <div>
                <div className='card-action'>
                  {profileCompletionSteps?.map((el) => (
                    <ProfileCompletion key={el?.key} label={el?.label} completion={profileCompletion?.[el?.key]} />
                  ))}
                </div>

                {profileCompletion?.overallCompletion !== 100 ? (
                  <>
                    <p  className='profile-desc'>
                      Lets Complete your profile to get better lead recommendations
                    </p>
                    <Button type="primary" ghost onClick={() => navigateTo('/user/myaccount')}>
                      Complete Your Profile
                    </Button>
                  </>
                ) : (
                  <Button type="primary" ghost onClick={() => navigateTo('/user/myaccount')}>
                    Edit Your Profile
                  </Button>
                )}
              </div>
            </Card>
            <div className='card-bottom'>
              <div className="card__announcement">
                <h2  className='announcement-style'>Announcements</h2>
                <Card className="scroll__y">
                  {isEmpty(announcements) ? (
                    <Empty className='announcement-desc' description="No Announcements" />
                  ) : (
                    announcements?.map((el, i) => {
                      return <AnnouncementsCardDashboard data={el} key={i} />;
                    })
                  )}
                </Card>
              </div>

              <div className="card__notification">
                <h2 className='notification-style'>Notification</h2>
                <Card className="scroll__y">
                  {isEmpty(universalNotifications) ? (
                    <Empty className='notification-desc' description="No Notifications" />
                  ) : (
                    universalNotifications?.map((el, i) => {
                      return <NotificationCardDashboard data={el} key={i} />;
                    })
                  )}
                </Card>
              </div>
            </div>
          </div>
          <div
            className="card__recommended"
            
          >
            <h4>Recommended Connects for you</h4>
            <div className="scroll__y">
              {/* {getDashboardData()?.recommendedConnects?.map((el) => (
                <RecommendedConnectsCard data={el} />
              ))} */}
              <Empty
                  className='Recommended-desc'
                
                image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
                imageStyle={{
                  height: 160,
                }}
                description={<span>Recommended Connects not found!</span>}
              ></Empty>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default Dashboard;

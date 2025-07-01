import { Card, Divider, Empty, Spin } from 'antd';
import Title from 'antd/es/typography/Title';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SwitchOfferingCard from '../../components/switchOfferingCards/SwitchOfferingCard';
import AnnouncementsCardDashboard from '../../../leadgen/components/announcementsCardDashboard/AnnouncementsCardDashboard';
import {
  fetchAccouncementsData,
  fetchUserPlanOfferingData,
  fetchUserData,
  fetchRecentActivities,
} from '../../features/userDashboardSlice';
import genIcon from '../../../assets/LeadGen.png';
import dayjs from 'dayjs';
import { isEmpty } from 'lodash';
import './dashboard.scss';
import { UserOutlined } from '@ant-design/icons';
import orgIcon from '../../../assets/images/organization.png';

const UserDashboard = () => {
  const dispatch = useDispatch();
  const { planOfferings, announcements, recentActivities } = useSelector((store) => store.userDashboard);

  useEffect(() => {
    dispatch(fetchUserPlanOfferingData());
    dispatch(fetchAccouncementsData());
    dispatch(fetchUserData());
    dispatch(fetchRecentActivities());
  }, []);

  return (
    <section className="userDashboard__section">
      <div className="userDashboard__card-container">
        <Card>
          <Title level={3}>Switch to</Title>
          <div className="userDashboard__switch-container">
            <SwitchOfferingCard
              data={{
                label: 'Social App',
                color: 'black',
                url: '/user/socialApp',
                border: '1px solid grey',
              }}
            />
            {planOfferings?.map((el, idx) => {
              return <SwitchOfferingCard data={el} key={idx} />;
            })}
          </div>
        </Card>
        <Card>
          <Title level={3}>Recent Activity</Title>
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
      <div className="userDashboard__announcement-container">
        <Card>
          <h4>Announcements</h4>
          {isEmpty(announcements) ? (
            <Empty className="announcement-desc" description="No Announcements" />
          ) : (
            announcements?.map((el, i) => {
              return <AnnouncementsCardDashboard data={el} key={i} />;
            })
          )}
        </Card>
      </div>
    </section>
  );
};

export default UserDashboard;

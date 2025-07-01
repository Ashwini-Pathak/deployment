import React, { useEffect, useState } from 'react';
import { Header } from 'antd/es/layout/layout';
import { Avatar, Badge, Button, Input, Dropdown, List, Menu, Popover, Progress, Space, Typography } from 'antd';
import { BellOutlined, UserOutlined } from '@ant-design/icons';
import MyAccountIcon from '../../../home/images/MyAccount';
import LogoutIcon from '../../../home/images/LogoutIcon';
import { useNavigate, useLocation } from 'react-router';
import logo from '../../../../assets/logo.svg';
import storeImg from '../../../../assets/images/store.png';
import { setSelectedNav } from '../../../../leadgen/features/universalSidenavSlice';
import './topNav.scss';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserPoints } from '../../../../universal/features/userOnboardingSlice';
import { isEmpty } from 'lodash';
import {
  getAllNotifications,
  markAsreadNotification,
  setUniversalNotifications,
} from '../../../../universal/features/userSlice';
import { format } from 'date-fns';
import { EventSourcePolyfill } from 'event-source-polyfill';
import { fetchUserProfileCompletion } from '../../../../universal/features/myAccountSlice';
import { persistor } from '../../../../redux/store'; // Import persistor if it's not imported yet
// import { delay } from '../../../../utils'; // Import delay function if it's not imported yet

const TopNav = () => {
  const delay = (t) => new Promise((resolve) => setTimeout(resolve, t));

  // hooks
  const navigateTo = useNavigate();
  const dispatch = useDispatch();
  const { pathname } = useLocation();

  //states
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState(false);
  const [notificationContent, setNotificationContent] = useState();
  const [loading, setLoading] = useState(false);

  const { selectedNav } = useSelector((store) => store.universalSideNav);
  const { userPoints } = useSelector((store) => store.userOnboarding);
  const { user, accessToken, universalNotifications, profileCompletion } = useSelector((store) => store.user);
  const { Text } = Typography;

  const hideTopBarPaths = '/onboarding';

  useEffect(() => {
    dispatch(getAllNotifications());
    dispatch(fetchUserPoints());
    dispatch(fetchUserProfileCompletion());
  }, [dispatch]);

  useEffect(() => {
    if (isEmpty(user?.id)) return;
    const sse_url = `${process.env.REACT_APP__BACKEND_API_URL}/user/${user?.id}/notifications/sse`;
    const eventSource = new EventSourcePolyfill(sse_url, { headers: { Authorization: `Bearer ${accessToken}` } });

    eventSource.onmessage = (event) => {
      const sseData = JSON.parse(event.data);
      dispatch(setUniversalNotifications(sseData?.data));
    };

    eventSource.onerror = (err) => {
      console.error('EventSource error: ', err);
    };

    return () => {
      eventSource.close();
    };
  }, [user, accessToken, dispatch]);

  useEffect(() => {
    setNotificationContent(getContent());
  }, [universalNotifications]);

  const getContent = () => (
    <List
      className="topnav-items"
      dataSource={universalNotifications}
      renderItem={(item) => (
        <List.Item key={item?._id} style={{ background: item.status === false ? '#DEF0FF' : 'white', padding: '10px' }}>
          <List.Item.Meta title={item?.title} description={item?.description} />
          <div className="items-desc">
            <Text className="items-text">{format(item?.createdAt, 'dd/MM/yyyy HH:mm:ss')}</Text>
            <Text
              style={{
                fontSize: '10px',
                visibility: item?.status === false ? 'visible' : 'hidden',
                cursor: 'pointer',
                color: '#003FAB',
              }}
              onClick={() => {
                dispatch(markAsreadNotification(item?._id));
              }}
            >
              mark as read
            </Text>
          </div>
        </List.Item>
      )}
    />
  );

  const handleOpenChange = (newOpen) => {
    setOpen(newOpen);
  };

  const getUnreadNotificationCount = () => {
    if (isEmpty(universalNotifications)) return 0;

    return universalNotifications?.reduce((count, obj) => {
      if (obj.status === false) {
        return count + 1;
      } else {
        return count;
      }
    }, 0);
  };

  const logout = async () => {
    dispatch(setSelectedNav('Logout'));
    setLoading(true);
    await persistor.purge();
    await persistor.flush();

    localStorage.clear();
    await delay(1000);

    setLoading(false);

    window.location.replace('/');
  };

  const handleMenuClick = (e) => {
    if (e.key === 'myaccount') {
      navigateTo('/user/myaccount');
      dispatch(setSelectedNav('MyAccount'));
    } else if (e.key === 'logout') {
      logout();
      dispatch(setSelectedNav(false));
    }
  };

  const profileMenu = (
    <Menu
      onClick={handleMenuClick}
      style={{
        backgroundColor: '#003fab',
        padding: '17px',
        marginTop: '5px',
        display: 'flex',
        gap: '17px',
        flexDirection: 'column',
      }}
    >
      <Menu.Item
        key="myaccount"
        icon={<MyAccountIcon strokeColor={selectedNav === 'MyAccount' ? '#FFA300' : '#FFF'} />}
        disabled={profileCompletion?.overallCompletion <= 80}
      >
        <span style={{ color: selectedNav === 'MyAccount' ? '#FFA300' : '#FFF', marginLeft: '12px', fontSize: '16px' }}>
          My Account
        </span>
      </Menu.Item>
      <Menu.Item key="logout" icon={<LogoutIcon strokeColor={selectedNav === 'Logout' ? '#FFA300' : '#FFF'} />}>
        <span style={{ marginLeft: '12px', fontSize: '16px' }}>Logout</span>
      </Menu.Item>
    </Menu>
  );
  const navigationPath = profileCompletion?.overallCompletion <= 80 ? '/user/dashboard' : '/user/socialApp';

  // on Searchx
  const onSearch = () => {
    window.open(`/leadgen/search?searchQuery=${searchQuery}`, '_blank');
  };

  return (
    <Header className="header">
      <div className="header__items">
        <div className="header__logo">
          <img
            src={logo}
            alt="logo"
            width="150px"
            className="header__logo-img"
            onClick={() => {
              navigateTo(navigationPath);
            }}
          />
        </div>
        {!pathname?.includes(hideTopBarPaths) && (
          <div>
            <Space size={'large'}>
              <Input
                onChange={(e) => {
                  setSearchQuery(e?.target?.value);
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    onSearch();
                  }
                }}
                placeholder="Show me properties in Hinjewadi"
                className="topnav-placeholder"
              />
              <Button
                disabled={searchQuery?.length == 0 || !searchQuery}
                type="primary"
                className="topnav-search__button"
                onClick={() => onSearch()}
              >
                Search
              </Button>
            </Space>
          </div>
        )}
        <div className="header__actions">
          <Space size="large">
            <div
              className="actions-item"
              onClick={() => {
                navigateTo(`/user/myaccount?activeTab=transactional_details`);
              }}
            >
              Points <span className="point-item">{userPoints}</span>
            </div>

            <img
              src={storeImg}
              onClick={() => {
                navigateTo('/user/store');
              }}
              alt="store"
              className="topnav-img"
              height="25px"
              width="25px"
            />
            <Space size="middle">
              <Popover
                content={<div>{notificationContent}</div>}
                title={<Text>Notification</Text>}
                trigger="click"
                open={open}
                onOpenChange={handleOpenChange}
                placement="bottomRight"
                style={{ zIndex: 'auto !important' }}
              >
                <Badge className="topnav__notification" size="default" count={getUnreadNotificationCount()}>
                  <BellOutlined className="notification-item" />
                </Badge>
              </Popover>
            </Space>
            <Dropdown overlay={profileMenu} trigger={['hover']}>
              <div className="block-items">
                <Avatar size="large" src={user?.personalDetails?.imageUrl} icon={<UserOutlined />} />
                <div className="items-desc">
                  <Progress
                    size="small"
                    type="circle"
                    percent={profileCompletion?.overallCompletion}
                    showInfo={false}
                    strokeColor="#0081FC"
                  />
                </div>
              </div>
            </Dropdown>
          </Space>
        </div>
      </div>
    </Header>
  );
};

export default TopNav;

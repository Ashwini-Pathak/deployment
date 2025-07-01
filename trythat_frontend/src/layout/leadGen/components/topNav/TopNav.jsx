import { BellOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar, Badge, Button, Input, List, Popover, Progress, Space, Typography } from 'antd';
import { Header } from 'antd/es/layout/layout';
import { useNavigate } from 'react-router';
import logo from '../../../../assets/logo.svg';

// styles
import { format } from 'date-fns';
import { isEmpty } from 'lodash';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { getSearchResults, reset_data, setPagination } from '../../../../leadgen/features/searchSlice';
import { fetchUserProfileCompletion } from '../../../../universal/features/myAccountSlice';
import { fetchUserPoints } from '../../../../universal/features/userOnboardingSlice';
import {
  getAllNotifications,
  markAsreadNotification,
  setUniversalNotifications,
} from '../../../../universal/features/userSlice';
import './topNav.scss';
import { EventSourcePolyfill } from 'event-source-polyfill';

const TopNav = () => {
  const [open, setOpen] = useState(false);
  const [notificationContent, setNotificationContent] = useState();
  const [queryCtx, setQueryCtx] = useState('Individual');
  const [searchQuery, setSearchQuery] = useState('');
  const navigateTo = useNavigate();
  const dispatch = useDispatch();
  const { userPoints } = useSelector((store) => store.userOnboarding);
  const { searchVisible } = useSelector((store) => store.search);
  const { user, accessToken, universalNotifications, profileCompletion } = useSelector((store) => store.user);
  const { Text } = Typography;

  useEffect(() => {
    dispatch(getAllNotifications());
    dispatch(fetchUserPoints());
    dispatch(fetchUserProfileCompletion());
  }, []);

  useEffect(() => {
    if (isEmpty(user?.id)) return;
    const sse_url = `${process.env.REACT_APP__BACKEND_API_URL}/user/${user?.id}/notifications/sse`;
    const eventSource = new EventSourcePolyfill(sse_url, { headers: { Authorization: `Bearer ${accessToken}` } });

    // attaching a handler to receive message events
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
  }, [user]);

  useEffect(() => {
    setNotificationContent(getContent());
  }, [universalNotifications]);

  const getContent = () => {
    return (
      <List
        className="topnav-items"
        dataSource={universalNotifications}
        // loading="true"
        renderItem={(item) => (
          <List.Item
            key={item?._id}
            style={{ background: item.status === false ? '#DEF0FF' : 'white', padding: '10px' }}
          >
            <List.Item.Meta title={item?.title} description={item?.description} />
            <div className="items-desc">
              <Text className="items-text">{format(item?.createdAt, 'dd/mm/yyyy hh:mm:ss')}</Text>
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
  };

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

  const searchParam = (searchQuery) => {
    dispatch(
      getSearchResults({
        body: {
          query: `${searchQuery}`,
          offset: 0,
          limit: 10,
        },
      }),
    )?.then((res) => {
      if (res?.payload?.data) {
        removeSearchParam();
      }
    });

    dispatch(setPagination({ offset: 0, limit: 10 }));
    dispatch(reset_data());
  };
  // Search params
  const [params, setSearchParams] = useSearchParams();
  const searchQueries = params?.get('searchQuery');

  // remove search param
  const removeSearchParam = () => {
    if (params.has('searchQuery')) {
      params.delete('searchQuery');
      setSearchParams(params);
    }
    return;
  };
  useEffect(() => {
    if (searchQueries) {
      setSearchQuery(searchQueries);
      searchParam(searchQueries);
    }
  }, [searchQueries]);

  return (
    <Header className="header">
      <div className="header__items">
        <div className="header__logo">
          <img
            src={logo}
            alt="logo"
            width="150px"
            className="header__logo-img"
            onClick={() => navigateTo('/leadgen/dashboard')}
          />
        </div>
        {searchVisible && (
          <div>
            <Space size={'large'}>
              <Input
                onChange={(e) => {
                  setSearchQuery(e?.target?.value);
                }}
                value={searchQuery}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    searchParam(e?.target?.value);
                  }
                }}
                placeholder="Show me properties in Hinjewadi"
                className="topnav-placeholder"
              />
              <Button
                disabled={searchQuery?.length == 0 || !searchQuery}
                type="primary"
                className="topnav-search__button"
                onClick={() => searchParam(searchQuery)}
              >
                Search
              </Button>
            </Space>
          </div>
        )}
        <div className="header__actions">
          <Space size="large">
            <div className="actions-item"  onClick={() => {
            navigateTo(`/user/myaccount?activeTab=transactional_details`);
  }}  >
              Points <span className="point-item">{userPoints}</span>
            </div>

            {/* <img
              src={storeImg}
              // onClick={() => {
              //   navigateTo('/user/store');
              // }}
              alt="store"
              className="topnav-img"
              height="25px"
              width="25px"
            /> */}
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
            <div
              className="block-items"
              onClick={() => {
                if (profileCompletion?.overallCompletion > 80) {
                  navigateTo('/user/myaccount');
                }
              }}
            >
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
          </Space>
        </div>
      </div>
    </Header>
  );
};

export default TopNav;

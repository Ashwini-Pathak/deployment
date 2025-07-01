import { Button, Card, Checkbox, Col, Row, Space, Typography } from 'antd';
import { useGeolocation } from '@uidotdev/usehooks';
import { useNavigate } from 'react-router';
import locationIcon from '../../../assets/images/location.svg';

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './userOfferings.scss';
import { fetchCRMUrl, fetchLocationViaLongLat, saveUserLocationDB } from '../../features/userDashboardSlice';
import SimpleMap from './SimpleMap';
import Debouncer from './Debouncer';
import { isEmpty } from 'lodash';
import man from '../../../assets/man.png';
import logo from '../../../assets/logo.svg';
import okr from '../../../assets/images/okr.png';
import group from '../../../assets/images/Group.png';
import LeadGenLogo from '../../../assets/LeadGen.png';
import CRMLogo from '../../../assets/CRM.png';

const UserOfferings = () => {
  const navigateTo = useNavigate();

  const { Text, Title } = Typography;

  const { user, profileCompletion } = useSelector((store) => store.user);
  const locationState = useGeolocation();

  //   const { currentLocation } = useSelector((store) => store.userDashboard);

  const [locationName, setLocationName] = useState('');

  const dispatch = useDispatch();
  const [coordinates, setCoordinates] = useState();
  const [allowChangeLocation, setAllowChangeLocation] = useState(false);
  const [locationChecked, setLocationChecked] = useState(true);

  const offerings = [
    {
      id: 1,
      label: 'LEAD GEN',
      img: LeadGenLogo,
    },
    {
      id: 2,
      label: 'CRM',
      img: CRMLogo,
    },
    {
      id: 3,
      label: 'EasyOKR',
      img: okr,
    },
    {
      id: 4,
      label: 'FMS',
      img: group,
    },
  ];

  const displayLocation = () => {
    if (locationState.error) setLocationName('Enable permissions to access your location data');
    if (locationState.loading) setLocationName('Loading... (you may need to enable permissions)');
    if (locationState.latitude && locationState.longitude) {
      dispatch(
        fetchLocationViaLongLat({
          userId: user.id,
          body: {
            latitude: `${locationState.latitude}`,
            longitude: `${locationState.longitude}`,
          },
        }),
      ).then((data) => {
        const name =
          data?.payload?.data?.response?.data?.locationDetails?.name ||
          data?.payload?.data?.response?.data?.locationDetails?.additionalResults?.[0];
        setLocationName(name);
      });
    }
  };
  useEffect(() => {
    displayLocation();
  }, [locationState]);

  useEffect(() => {
    if (!profileCompletion?.overallCompletion) return;
    if (profileCompletion?.overallCompletion > 80) {
      navigateTo('/user/socialApp');
    }
  }, []);

  return (
    <div className="useroffering-container">
      <div className="userJourney">
        <div className="userJourney__title">
          <Text className="userjourney__welcome">
            Welcome, <span className="welcome-user"> {user?.name}</span>
          </Text>
        </div>
        <Space direction="vertical">
          <Text strong className="user-item">
            Trythat is happy to have you here!
          </Text>
          <p className="user-desc">
            To give you the best leads and recommendations we have created a short survey that we would like you to fill
            up. Also note that on filling the entire form you will earn points with which you can unlock leads and make
            the most of this platform.
          </p>

          <p className="user-journey">Let's start your journey</p>

          <Checkbox
            className="user-left__checkbox"
            value={locationChecked}
            onChange={() => {
              setLocationChecked(!locationChecked);
            }}
          >
            <div className="check-location">
              <img src={locationIcon} className="location-img" alt="locationIcon" />
              Use this as my current location
            </div>
          </Checkbox>
          <p className="location-name">{locationName}</p>
          <Text
            className="location-change"
            onClick={() => {
              setAllowChangeLocation(true);
            }}
          >
            Change Location
          </Text>
          <div>
            <Row>
              <Col span={16}>
                {allowChangeLocation && (
                  <Debouncer
                    coordinates={coordinates}
                    setCoordinates={setCoordinates}
                    setLocationName={setLocationName}
                  />
                )}
              </Col>
              <Col span={8}>
                <Button
                  onClick={() => {
                    dispatch(
                      saveUserLocationDB({
                        latitude: locationState.latitude || coordinates.lat,
                        longitude: locationState.longitude || coordinates.lng,
                        location: `${locationName}`,
                      }),
                    );
                    navigateTo('/user/onboarding');
                  }}
                  type="primary"
                  className="useroffering-btn"
                  disabled={
                    [
                      '',
                      'Enable permissions to access your location data',
                      'Loading... (you may need to enable permissions)',
                    ].includes(locationName) || locationChecked
                  }
                >
                  Let's Start
                </Button>
              </Col>
            </Row>

            {coordinates && <SimpleMap coordinates={coordinates} setCoordinates={setCoordinates} />}
          </div>
        </Space>
      </div>
      <div className="offerings">
        <div className="offerings__title">
          <Text className="title-size">
            Our <span className="title-offering">Offerings</span>
          </Text>
        </div>
        <div className="offering-desc">
          {offerings?.map((el) => {
            return (
              <Card
                key={el.id}
                style={{
                  width: 140,
                  height: 100,
                  borderColor: '#EAEAEA',
                }}
              >
                <img src={el?.img} />
                <a
                  style={{
                    textDecoration: 'none',
                    color: 'black',
                    cursor: 'default',
                  }}
                >
                  {el.label}
                </a>
              </Card>
            );
          })}
        </div>
        <Space className="useroffering-left">
          <Space direction="vertical">
            <Text className="left-text">
              Come join, <span className="text-bandwagon">the bandwagon!</span>
            </Text>
            <Text>
              Explore the app’s features and intuitive interface in this walkthrough before the video. Uncover hidden
              gems and gain valuable insights to maximize your user experience
            </Text>
          </Space>
          <div className="left-desc">
            <img src={logo} width={100} className="left-img" />
            <img src={man} height={140} width={200} />
          </div>
        </Space>
      </div>
    </div>
  );
};

export default UserOfferings;

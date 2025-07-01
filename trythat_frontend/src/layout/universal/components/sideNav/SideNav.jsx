import { Menu, Spin } from 'antd';
import Sider from 'antd/es/layout/Sider';
import { Link, useNavigate } from 'react-router-dom';

import LogoutIcon from '../../../home/images/LogoutIcon';
import MyAccountIcon from '../../../home/images/MyAccount';
import HomeIcon from '../../../home/images/HomeIcon';
import DashboardIcon from '../../../../assets/images/navbar/dashboard.png';
import okr from '../../../../assets/images/okr.png';
import group from '../../../../assets/images/Group.png';
import LeadGenIcon from '../../../../assets/images/navbar/leadGen 2.png';
import CRMIcon from '../../../../assets/images/navbar/CRM 2.png';
import FMSIcon from '../../../../assets/images/Group.png';
import OKRIcon from '../../../../assets/images/okr.png';
import { persistor } from '../../../../redux/store';

import './sideNav.scss';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedNav } from '../../../../leadgen/features/universalSidenavSlice';
import {
  registerFms,registerOkr,fetchUserOnboardingData
} from '../../../../universal/features/userOnboardingSlice';
import { getFmsPayload,getOkrPayload } from '../../../../universal/pages/userOnboarding/userboarding.utils';
function getMenuItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}

const SideNav = () => {
  const delay = (t) => new Promise((resolve) => setTimeout(resolve, t));
  const dispatch = useDispatch();

  const { crmData, okrData, fmsData } = useSelector((store) => store.userDashboard);
  const { selectedNav } = useSelector((store) => store.universalSideNav);
  const { profileCompletion } = useSelector((store) => store.user);
  const { userOnboardingData} = useSelector((store) => store.userOnboarding);
 
  const [loading, setLoading] = useState(false);
  const [navItems, setNavItems] = useState([]);

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

  const handleRedirect = (item) => {
    switch (item) {
      case 'CRM':
        window.open(crmData?.url, '_blank').focus();
        break;
      case 'EasyOKR':
        window.open(okrData?.url, '_blank').focus();
        break;
      case 'FMS':
        window.open(fmsData?.url, '_blank').focus();
        break;
      default:
        window.open(item?.route, '_blank').focus();
        break;
    }
  };

  const items = [
    getMenuItem(
      <Link to="/user/dashboard">Home</Link>,
      'Navigate',
      <img src={DashboardIcon} alt="" />,

      [
        getMenuItem(
          <Link
            to="#"
            onClick={() => {
              dispatch(setSelectedNav('Home'));
              window.open('/leadgen/dashboard', '_blank').focus();
            }}
          >
            Lead Gen
          </Link>,
          'Lead Gen',
          <img src={LeadGenIcon} alt="" className="leadgen-icon" />,
        ),
        getMenuItem(
          <Link
            to="#"
            onClick={() => {
              if (crmData?.url) handleRedirect('CRM');
            }}
          >
            CRM
          </Link>,
          'CRM',
          <img src={CRMIcon} alt="" className="crm-icon" />,
        ),
        getMenuItem(
          <Link to="#"  onClick={() => {
            if (okrData?.url){
              handleRedirect('EasyOKR');
            } 
            else{
              dispatch(registerOkr(getOkrPayload(userOnboardingData)));
            }
           }
          }
            >
            TryOKR
          </Link>,
          'OKR',
          <img src={OKRIcon} alt="" className="okr-icon" />,
        ),
        getMenuItem(
          <Link to="#" onClick={() => {
            if (fmsData?.url){
              handleRedirect('FMS');
            } 
            else{
              dispatch(registerFms(getFmsPayload(userOnboardingData)));
            }
           }
          }
          >
            FMS
          </Link>,
          'FMS',
          <img src={FMSIcon} alt="" className="fms-icon" />,
        ),
      ],
    ),
    getMenuItem(
      <Link
        to="/user/socialApp"
        onClick={() => {
          dispatch(setSelectedNav('Home'));
        }}
      >
        <span style={{ color: selectedNav === 'Home' ? '#FFA300' : '#FFF' }}>Home</span>
      </Link>,
      'Home',
      <HomeIcon strokeColor={selectedNav === 'Home' ? '#FFA300' : '#FFF'} />,
    ),

    getMenuItem(
      <Link
        to="/user/myaccount"
        onClick={() => {
          dispatch(setSelectedNav('MyAccount'));
        }}
      >
        <span style={{ color: selectedNav === 'MyAccount' ? '#FFA300' : '#FFF' }}>My Account</span>
      </Link>,
      'MyAccount',
      <MyAccountIcon strokeColor={selectedNav === 'MyAccount' ? '#FFA300' : '#FFF'} />,
    ),
    getMenuItem(
      <div className="sidenav-menu" onClick={logout}>
        <LogoutIcon strokeColor={selectedNav === 'Logout' ? '#FFA300' : '#FFF'} />
        Logout
      </div>,
    ),
  ];
  useEffect(() => {
    dispatch(fetchUserOnboardingData());
  }, []);
  useEffect(() => {
    if (profileCompletion?.overallCompletion < 80) {
      const filteredNavItems = items?.filter(
        (el) => el?.key != 'MyAccount' && el?.key != 'Navigate' && el?.key != 'Home',
      );
      setNavItems(filteredNavItems);
      return;
    }
    setNavItems(items);
  }, [profileCompletion?.overallCompletion]);
  return (
    <>
      <Spin spinning={loading} fullscreen />
      <Sider width={100} className="universalSidebar">
        <Menu
          theme="dark"
          // mode="inline"
          mode="vertical"
          selectedKeys={selectedNav}
          defaultSelectedKeys={[]}
          items={navItems}
          expandIcon={null}
        />
      </Sider>
    </>
  );
};

export default SideNav;

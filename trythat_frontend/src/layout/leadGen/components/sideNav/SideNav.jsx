import React, { useState } from 'react';
import { Layout, Menu } from 'antd';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

// IMPORT FROM A SINGLE EXPORT FILE
import HomeIcon from '../../../home/images/HomeIcon';
import SearchIcon from '../../../home/images/SearchIcon';
import ChatIcon from '../../../home/images/ChatIcon';
import SavedIcon from '../../../home/images/SavedIcon';
import ContactBookIcon from '../../../home/images/ContactBookIcon';
import LogoutIcon from '../../../home/images/LogoutIcon';
import CRMIcon from '../../../../assets/images/navbar/CRM 2.png';
import DashboardIcon from '../../../../assets/images/navbar/dashboard.png';
import FMSIcon from '../../../../assets/images/Group.png';
import OKRIcon from '../../../../assets/images/okr.png';
//  styles import
import './sideNav.scss';
import { persistor } from '../../../../redux/store';
import { setSelectedNav } from '../../../../leadgen/features/leadGenSideNavSlice';
import { showSearchBar } from '../../../../leadgen/features/searchSlice';

const { Sider } = Layout;

function getMenuItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}

export default function SideNav() {
  const { crmData, okrData, fmsData } = useSelector((store) => store.userDashboard);
  const delay = (t) => new Promise((resolve) => setTimeout(resolve, t));
  const dispatch = useDispatch();

  const { selectedNav } = useSelector((store) => store.leadGenSideNav);

  const logout = async () => {
    dispatch(setSelectedNav('Logout'));
    await persistor.purge();
    await persistor.flush();

    localStorage.clear();
    await delay(1000);

    window.location.replace('/');
  };

  const handleCRMredirection = (item) => {
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
    getMenuItem(<Link to="/leadgen/dashboard">Home</Link>, 'Navigate', <img src={DashboardIcon} alt="" />, [
      getMenuItem(
        <Link to="#" onClick={() => handleCRMredirection('CRM')}>
          CRM
        </Link>,
        'CRM',
        <img src={CRMIcon} alt="" className="crm-icon" />,
      ),
      getMenuItem(
        <Link to="#" onClick={() => handleCRMredirection('EasyOKR')}>
          TryOKR
        </Link>,
        'OKR',
        <img src={OKRIcon} alt="" className="okr-icon" />,
      ),
      getMenuItem(
        <Link to="#" onClick={() => handleCRMredirection('FMS')}>
          FMS
        </Link>,
        'FMS',
        <img src={FMSIcon} alt="" className="fms-icon" />,
      ),
    ]),
    { type: 'divider' },
    getMenuItem(
      <Link
        to="/leadgen/dashboard"
        onClick={() => {
          dispatch(setSelectedNav('Home'));
          dispatch(showSearchBar(false));
        }}
      >
        Home
      </Link>,
      'Home',
      <HomeIcon strokeColor={selectedNav === 'Home' ? '#FFA300' : '#FFF'} />,
    ),
    getMenuItem(
      <Link
        to="/leadgen/search"
        onClick={() => {
          dispatch(setSelectedNav('Search'));
          dispatch(showSearchBar(true));
        }}
      >
        Search
      </Link>,
      'Search',
      <SearchIcon strokeColor={selectedNav === 'Search' ? '#FFA300' : '#FFF'} />,
    ),
    getMenuItem(
      <Link
        to="/leadgen/contactbook"
        onClick={() => {
          dispatch(setSelectedNav('ContactBook'));
          dispatch(showSearchBar(false));
        }}
      >
        Contact Book
      </Link>,
      'ContactBook',
      <ContactBookIcon
        strokeColor={selectedNav === 'ContactBook' ? '#FFA300' : '#FFF'}
        // selectedNav={selectedNav === 'ContactBook' ? true : false}
      />,
    ),
    getMenuItem(
      <Link
        to="/chat"
        onClick={() => {
          dispatch(setSelectedNav('Chat'));
          dispatch(showSearchBar(false));
        }}
      >
        Chat
      </Link>,
      'Chat',
      <ChatIcon
        strokeColor={selectedNav === 'Chat' ? '#FFA300' : '#FFF'}
        // selectedNav={selectedNav === 'Chat' ? true : false}
      />,
    ),
    getMenuItem(
      <Link
        to="/leadgen/saved"
        onClick={() => {
          dispatch(setSelectedNav('Saved'));
          dispatch(showSearchBar(false));
        }}
      >
        Saved
      </Link>,
      'Saved',
      <SavedIcon
        strokeColor={selectedNav === 'Saved' ? '#FFA300' : '#FFF'}
        // fillColor={selectedNav === 'Saved' ? '#FFA300' : '#FFF'}
        // selectedNav={selectedNav === 'Saved' ? true : false}
      />,
    ),

    getMenuItem(
      <div className="leadgen-menu" onClick={logout}>
        <LogoutIcon strokeColor={selectedNav === 'Logout' ? '#FFA300' : '#FFF'} />
        Logout
      </div>,
    ),
  ];

  return (
    <Sider width={120} className="sidebar" style={{ position: 'sticky' }}>
      <Menu
        theme="dark"
        mode="vertical"
        selectedKeys={selectedNav}
        defaultSelectedKeys={[]}
        items={items}
        expandIcon={null}
      />
    </Sider>
  );
}

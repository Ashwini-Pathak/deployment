// Css Imports
import './viewUserProfile.scss';

// React,React-Redux,Router Imports
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

// Design Library Imports
import { Divider } from 'antd';
import ViewProfileContent from '../../../components/socialApp/viewProfile/ViewProfileContent';
import ViewProfileHeader from '../../../components/socialApp/viewProfile/ViewProfileHeader';

// Slices and reducer imports

// Component Imports

const ViewUserProfile = () => {
  // Hooks
  const dispatch = useDispatch();
  const navigateTo = useNavigate();

  // States

  // useEffect(() => {
  //   dispatch(getAllPosts({}));
  // }, []);

  // states
  const [showCreatePostPopup, setShowCreatePopup] = useState(false);
  const { user } = useSelector((store) => store.user);

  const onCloseCreatePopup = () => {
    setShowCreatePopup(false);
  };
  return (
    <div className="viewProfileContainer">
      <div className="viewProfileContainer__profileContainer">
        <ViewProfileHeader />
        <Divider style={{ margin: 0, background: '#949494' }} />
        <ViewProfileContent />
      </div>
      <div className="viewProfileContainer__middleContainer"></div>
    </div>
  );
};

export default ViewUserProfile;

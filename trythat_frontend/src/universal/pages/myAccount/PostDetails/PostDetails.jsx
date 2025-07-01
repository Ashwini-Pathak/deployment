import { Tabs } from 'antd';
import React, { useState } from 'react';
import MyPostContainer from '../../../components/myAccount/Posts/MyPostContainer';
import CreatePost from '../../../components/myAccount/Posts/CreatePosts';
import SavedPosts from '../../../components/myAccount/Posts/SavedPosts';
import './postDetails.scss';
import CompanyPostContainer from '../../../components/myAccount/Posts/CompanyPostContainer';
import { useSelector } from 'react-redux';
const PostDetails = ({ companyData, activeAccountTab, isPersonalPosts }) => {
  // states
  const [activeTab, setActiveTab] = useState(isPersonalPosts ? 'MY_POST' : 'COMPANY_POST');
  const userRole = useSelector((store) => store?.user?.userV2?.companyDetails?.type);

  // on tab change handler
  const onTabChange = (e) => {
    setActiveTab(e);
  };

  // Checking is user is admin or not
  const isUserAdmin = () => {
    return userRole?.toLowerCase() == 'admin';
  };
  const perosnalPostDetailsItems = [
    {
      key: 'MY_POST',
      label: 'My Posts',
      children: <MyPostContainer activeAccountTab={activeAccountTab} activeTab={activeTab} />,
    },
    {
      key: 'CREATE_POST',
      label: 'Create Post',
      children: <CreatePost setActiveTab={setActiveTab} postRel={'user_post'} />,
    },
    { key: 'SAVED_POSTS', disabled: true, label: 'Saved Posts', children: <SavedPosts /> },
  ];

  const companyPostDetailsItems = [
    {
      key: 'COMPANY_POST',
      label: 'Company Posts',
      children: (
        <CompanyPostContainer companyData={companyData} activeAccountTab={activeAccountTab} activeTab={activeTab} />
      ),
    },
    {
      key: 'CREATE_POST',
      label: 'Create Posts',
      children: <CreatePost setActiveTab={setActiveTab} isCompany postRel={'company_post'} />,
    },
  ]?.filter((items) => (!isUserAdmin() ? items?.key !== 'CREATE_POST' : items));

  return (
    <div className="postDetailsContainer">
      <Tabs
        activeKey={activeTab}
        className="postDetailsTabs"
        onChange={onTabChange}
        items={isPersonalPosts ? perosnalPostDetailsItems : companyPostDetailsItems}
      />
    </div>
  );
};

export default PostDetails;

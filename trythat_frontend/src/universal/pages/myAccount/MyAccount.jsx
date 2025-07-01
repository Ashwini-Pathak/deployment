import './myAccount.scss';

import { Tabs } from 'antd';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import CompanyDetailsTab from './companyDetails';
import FormDetails from './formDetails/FormDetails';
import Preference from './perferences/Preferences';
import PersonalDetailsTab from './personalDetails';
import TransactionalDetails from './transactionalDetails/TransactionalDetails';

const MyAccount = () => {
  // Search params
  const [params, setSearchParams] = useSearchParams();
  const activeTabParam= params?.get('activeTab') || 'personal_details';
  const { isFormEditable, loading } = useSelector((store) => store.myAccount);
  const { userPoints } = useSelector((store) => store.userOnboarding);
  const [activeAccountTab, setActiveAccountTab] = useState(activeTabParam);
  const { user, profileCompletion, userImgUrl } = useSelector((store) => store.user);

  // setting active account tab if activeTab is recieved
  useEffect(() => {
    setActiveAccountTab(activeTabParam);
  }, [activeTabParam]);

  const onAccountTabChange = (key) => {
    setActiveAccountTab(key);
    setSearchParams({ activeTab: key });
  };

  const items = [
    {
      label: 'Personal Details',
      key: 'personal_details',
      children: (
        <PersonalDetailsTab
          user={user}
          userPoints={userPoints}
          loading={loading}
          isFormEditable={isFormEditable}
          profileCompletion={profileCompletion}
          userImgUrl={userImgUrl}
          activeAccountTab={activeAccountTab}
        />
      ),
    },
    {
      label: 'Transactional Details',
      key: 'transactional_details',
      children: <TransactionalDetails />,
    },
    {
      label: 'Preferences',
      key: 'preferences',
      children: <Preference _userPreferenceData={user?.preferences} />,
    },
    {
      label: 'Form Details',
      key: 'form_details',
      children: <FormDetails user={user} />,
    },

    {
      label: 'Company Details',
      key: 'company_details',

      children: <CompanyDetailsTab activeAccountTab={activeAccountTab} />,
    },
  ];

  return (
    <>
      <Tabs
        type="card"
        activeKey={activeAccountTab}
        onChange={onAccountTabChange}
        items={items}
        className="myAccountTabs"
      />
    </>
  );
};

export default MyAccount;

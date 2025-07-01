import { ErrorBoundary } from 'react-error-boundary';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
//  LAYOUT
import DefaultLayout from './layout/default/DefaultLayout';
import LeadGenLayout from './layout/leadGen/LeadgenLayout';
import UniversalLayout from './layout/universal/UniversalLayout';

// LEADGEN
import ChatPage from './leadgen/pages/chatPage/ChatPage';
import ContactBook from './leadgen/pages/contactBook/ContactBook';
import Dashboard from './leadgen/pages/dashboard/Dashboard';
import Saved from './leadgen/pages/saved/Saved';
import SearchPage from './leadgen/pages/searchPage/SearchPage';

// UNIVERSAL
import UserDashboard from './universal/pages/dashboard/Dashboard';
import LoginPage from './universal/pages/login/Login';
import MyAccount from './universal/pages/myAccount/MyAccount';
import RegisterPage from './universal/pages/register/Register';
import Store from './universal/pages/store/Store';
import UserOfferings from './universal/pages/userOfferings/UserOfferings';
import UserOnboarding from './universal/pages/userOnboarding/UserOnboarding';

import { useSelector } from 'react-redux';

// styles
import { useEffect, useState } from 'react';
import './App.scss';
import ErrorFallback from './ErrorFallback';
import NotFound from './NotFound';
import { ProtectedRoute } from './ProtectedRoute';
import OccupantDetailsCard from './leadgen/pages/OccupantDetailsCard/OccupantDetailsCard';
import ConnectDetailsCard from './leadgen/pages/connectDetailsCard/ConnectDetailsCard';
import OrganizationDetailsCard from './leadgen/pages/organizationDetailsCard/OrganizationDetailsCard';
import PropertyDetailsCard from './leadgen/pages/propertyDetailsCard/PropertyDetailsCard';
import Toast from './universal/components/toast/Toast';
import setupInterceptor from './utils/apiClient/interceptor';
import SocialApp from './universal/pages/socialApp/SocialApp';
import ViewUserProfile from './universal/pages/socialApp/viewUserProfile/ViewUserProfile';

// Analytics
import TagManager from 'react-gtm-module';
// analytics
const tagManagerArgs = {
  gtmId: 'GTM-WPKTWSPW',
};
TagManager.initialize(tagManagerArgs);

function App() {
  window.dataLayer.push({
    event: 'pageview',
  });

  const { accessToken } = useSelector((store) => store.user);
  setupInterceptor(accessToken);

  const { _toast } = useSelector((store) => store.toast);

  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setLoading(false);
      navigate(`${location.pathname}${location.search}`);
    }, 1000); // Loader duration: 3 seconds

    return () => clearTimeout(timeoutId);
  }, [location.pathname, navigate]);

  useEffect(() => {
    setLoading(true);
  }, [location.pathname]);

  return (
    <ErrorBoundary
      key={location.pathname}
      FallbackComponent={ErrorFallback}
      onReset={() => {
        navigate('/');
      }}
    >
      {_toast.show ? <Toast _toast={_toast} /> : <></>}
      <Routes>
        <Route path="/" element={<DefaultLayout loading={loading} />}>
          <Route path="/" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
        </Route>
        <Route element={<ProtectedRoute />}>
          <Route path="/user" element={<UniversalLayout loading={loading} />}>
            <Route path="onboarding" element={<UserOnboarding />} />
            <Route path="offerings" element={<UserOfferings />} />
            <Route path="myaccount" element={<MyAccount />} />
            <Route path="store" element={<Store />} />
            <Route path="socialApp" element={<SocialApp />} />
            <Route path="socialApp/:userId" element={<ViewUserProfile />} />
            <Route path="dashboard" element={<UserDashboard />} />
          </Route>
          <Route path="/leadGen" element={<LeadGenLayout loading={loading} />}>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="search" element={<SearchPage />} />
            <Route path="propertyDetails/:id" element={<PropertyDetailsCard />} />
            <Route path="organizationDetails/:id" element={<OrganizationDetailsCard />} />
            <Route path="occupantDetails/:id" element={<OccupantDetailsCard />} />
            <Route path="connectDetails/:id" element={<ConnectDetailsCard />} />
            <Route path="contactbook" element={<ContactBook />} />
            <Route path="saved" element={<Saved />} />
          </Route>
          <Route path="chat" element={<ChatPage />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </ErrorBoundary>
  );
}

export default App;

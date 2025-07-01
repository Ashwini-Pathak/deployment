import { isEmpty } from 'lodash';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

export const ProtectedRoute = () => {
  const { accessToken } = useSelector((store) => store.user);
  return !isEmpty(accessToken) ? <Outlet /> : <Navigate to="/" />;
};

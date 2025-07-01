import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { isEmpty, get } from 'lodash';
import base64 from 'base-64';
import OauthPopup from 'react-oauth-popup';

import { initLogin, setCurrentStep, verifyLoginOtp } from '../../features/loginSlice';
import { setAccessToken, setUserData } from '../../features/userSlice';
import LoginForm from './LoginForm';
import Otp from '../otp/Otp';
import { parseJson, isEmail, isMobileNumber } from '../../../utils/helpers';
import { configKeys } from '../../../utils/config';
import { setCRMData, setFMSData, setOKRData } from '../../features/userDashboardSlice';

const Login = () => {
  const [tempUser, setTempUser] = useState({});
  const { currentStep, loading, otpMedium, userId } = useSelector((store) => store.login);
  const { accessToken } = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigateTo = useNavigate();

  const onCode = (code) => {
    const parsedCode = parseJson(base64.decode(code));
    if (parsedCode) {
      dispatch(setAccessToken(get(parsedCode, 'data.accessToken', '')));
      dispatch(setUserData(get(parsedCode, 'data.user', {})));
      dispatch(setCRMData(get(parsedCode, 'data.user.crmDetails', {})));
      dispatch(setOKRData(get(parsedCode, 'data.user.okrDetails', {})));
      dispatch(setFMSData(get(parsedCode, 'data.user.fmsDetails', {})));
      return;
    }

    return;
  };

  const onClose = () => console.log('closed!');

  useEffect(() => {
    if (!isEmpty(accessToken)) {
      navigateTo('/user/offerings');
    }
  }, [accessToken, navigateTo]);

  useEffect(() => {
    dispatch(setCurrentStep('LOGIN_FORM'));
  }, []);

  const handleSubmit = (value) => {
    if (isEmail(value) || isMobileNumber(value)) setTempUser({ [isEmail(value) ? 'email' : 'phone']: value });
    dispatch(
      initLogin({
        body: {
          type: isEmail(value) ? 'email' : 'phone',
          data: value,
        },
      }),
    );
  };

  const handleVerifyOtp = (otp) => {
    const payload = otp.join('');
    dispatch(
      verifyLoginOtp({
        otp: payload,
      }),
    );
  };

  const handleCloseEmailVerification = () => {}; // This function is a empty function just to

  const STEPS_MAP = Object.freeze({
    LOGIN_FORM: (
      <LoginForm
        handleSubmit={handleSubmit}
        loading={loading}
        onClose={onClose}
        onCode={onCode}
        OauthPopup={OauthPopup}
        url={`${configKeys.API_URL}/auth/linkedin`}
      />
    ),
    OTP_FORM: (
      <Otp
        handleCloseEmailVerification={handleCloseEmailVerification}
        handleVerifyOtp={handleVerifyOtp}
        loading={loading}
        mediumType={otpMedium}
        user={tempUser}
        backDispatch={() => setCurrentStep('LOGIN_FORM')}
        hashedUserId={userId}
      />
    ),
  });

  return <div>{STEPS_MAP[currentStep]}</div>;
};

export default Login;

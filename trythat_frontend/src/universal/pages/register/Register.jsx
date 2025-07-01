import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { isEmpty, get } from 'lodash';
import OauthPopup from 'react-oauth-popup';
import base64 from 'base-64';

// custom imports
import RegisterForm from './RegisterForm';
import { initSignUp, setCurrentStep, userRegister, verifyOtp } from '../../features/registerSlice';
import Otp from '../otp/Otp';
import { setAccessToken, setUserData } from '../../features/userSlice';
import { parseJson } from '../../../utils/helpers';
import { configKeys } from '../../../utils/config';
import { setCRMData, setFMSData, setOKRData } from '../../features/userDashboardSlice';

const Register = () => {
  const [tempUser, setTempUser] = useState({});

  const { currentStep, loading, otpMedium, userId } = useSelector((store) => store.register);
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
    dispatch(setCurrentStep('REGISTER_FORM'));
  }, []);
  const handleCloseEmailVerification = () => {
    dispatch(
      userRegister({
        body: {
          userId,
        },
      }),
    ).then(() => {
      navigateTo('/user/offerings');
    });
  };

  const handleVerifyOtp = (otp) => {
    const payload = otp.join('');
    dispatch(
      verifyOtp({
        otp: payload,
      }),
    );
  };
  const handleSubmit = (e) => {
    const user = {
      name: e.name,
      email: e.email,
      phone: e.phone,
      acceptedTerms: true,
      industryType: e?.industryType,
    };
    setTempUser(user);
    dispatch(initSignUp(user));
  };

  const STEPS_MAP = Object.freeze({
    REGISTER_FORM: (
      <RegisterForm
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
        hashedUserId={userId}
        backDispatch={() => setCurrentStep('REGISTER_FORM')}
      />
    ),
  });

  return <div>{STEPS_MAP[currentStep]}</div>;
};

export default Register;

import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { CloseCircleOutlined, LeftCircleOutlined } from '@ant-design/icons';
import { InputOTP } from 'antd-input-otp';
import { Button, Space, Typography } from 'antd';

import logo from '../../../assets/logo.svg';
//css imports
import './otp.scss';
import { sendLoginOtp } from '../../features/loginSlice';

const Otp = ({
  handleVerifyOtp,
  loading,
  mediumType,
  user,
  handleCloseEmailVerification,
  backDispatch,
  hashedUserId,
}) => {
  const dispatch = useDispatch();
  const { Text } = Typography;

  const [otpValue, setOtpValue] = useState([]);
  const [resendOTPbtnDisabled, setResendOTPbtnDisabled] = useState(true);
  const [countdown, setCountDown] = useState(30);
  const [showCountDown, setShowCountDown] = useState(true);
  // const [initialRender, setInitialRender] = useState(true);
  useEffect(() => {
    setOtpValue([]);
    setCountDown(30);
    setResendOTPbtnDisabled(true);
    setShowCountDown(true);
  }, [mediumType]);

  useEffect(() => {
    if (!showCountDown) return;
    // if(initialRender){
    //   setCountDown(30);

    // }
    let intervalID = setInterval(() => {
      setCountDown((prev) => {
        if (prev < 1) {
          clearInterval(intervalID);
          setResendOTPbtnDisabled(false);
          setShowCountDown(false);
          setCountDown(prev - 1);
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(intervalID);
  }, [showCountDown]);

  const resendOTP = () => {
    setResendOTPbtnDisabled(true);
    setCountDown(30);
    dispatch(
      sendLoginOtp({
        body: {
          userId: hashedUserId,
          type: mediumType,
          data: mediumType === 'email' ? user?.email : user?.phone,
        },
      }),
    ).then((e) => {
      setShowCountDown(true);
    });
  };

  useEffect(() => {
    setResendOTPbtnDisabled(true);
    setShowCountDown(true);
  }, []);

  return (
    <div className="otp">
      <div className="otp-header">
        <LeftCircleOutlined onClick={() => dispatch(backDispatch())} />
        <img src={logo} alt="logo" width="150px" />
        <CloseCircleOutlined
          style={{
            visibility: mediumType === 'email' && window.location.pathname === '/register' ? 'visible' : 'hidden',
          }}
          onClick={() => {
            handleCloseEmailVerification();
          }}
        />
        {mediumType === 'email' && window.location.pathname !== '/register' && <div></div>}
      </div>
      <Text className="otp-text">
        Please enter the 6 digit OTP shared on your registered
        {mediumType === 'phone' && <Text>{` Mobile ${user?.phone?.substring(0, 6)}xxxx`}</Text>}
        {mediumType === 'email' && <Text>{` Work Email xxxxxxxxxx@${user?.email?.split('@')?.[1]}`}</Text>}
      </Text>
      <InputOTP
        autoSubmit={handleVerifyOtp}
        value={otpValue}
        onChange={setOtpValue}
        name="termsAgree"
        namelength={6}
        inputType="numeric"
        className="otp-input"
      />
      <Button
        className="otp-form__button"
        onClick={() => {
          handleVerifyOtp(otpValue);
        }}
        loading={loading.verifyOtpLoading}
        block
      >
        Submit
      </Button>
      <div className="otp-form__message">
        <div>
          Didn't get OTP? &nbsp;
          <Text
            disabled={resendOTPbtnDisabled}
            style={{
              textDecoration: 'underline',
              cursor: resendOTPbtnDisabled ? '' : 'pointer',
            }}
            onClick={() => {
              if (resendOTPbtnDisabled) return;
              resendOTP();
            }}
          >
            Resend
          </Text>
        </div>
        {showCountDown && <Text>Resend OTP in ({countdown}s)</Text>}
      </div>
    </div>
  );
};

export default Otp;

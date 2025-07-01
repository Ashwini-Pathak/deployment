import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { InputOTP } from 'antd-input-otp';
import { Button, Space, Typography } from 'antd';

import logo from '../../../../assets/logo.png';

//css imports
// import './otp.scss';
import { sendOtp } from '../../../features/myAccountSlice';

const VerifyOtp = ({ handleVerifyOtp, loading, mediumType, user, otpBody }) => {
  const dispatch = useDispatch();
  const { Text } = Typography;

  const [otpValue, setOtpValue] = useState([]);
  const [resendOTPbtnDisabled, setResendOTPbtnDisabled] = useState(true);
  const [countdown, setCountDown] = useState(30);
  const [showCountDown, setShowCountDown] = useState(true);

  useEffect(() => {
    setOtpValue([]);
  }, [mediumType]);

  useEffect(() => {
    if (!showCountDown) return;
    let otpIntervalID = setInterval(() => {
      setCountDown((prev) => {
        if (prev < 1) {
          // setCountDown(30);
          clearInterval(otpIntervalID);
          setResendOTPbtnDisabled(false);
          setCountDown(prev - 1);
          setShowCountDown(false);
          //
        }

        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(otpIntervalID);
  }, [showCountDown]);

  const resendOTP = () => {
    setResendOTPbtnDisabled(true);
    setCountDown(30);
    dispatch(
      sendOtp({
        ...otpBody,
      }),
    ).then((e) => {
      setShowCountDown(true);
    });
  };

  return (
    <div className="otp">
      <div
        className="otp-header"
        style={{ display: 'flex', alignItems: 'center', marginBottom: '50px', justifyContent: 'center' }}
      >
        <img style={{ alignItems: 'center' }} src={logo} alt="logo" width="150px" />
      </div>
      <Text style={{ marginTop: '50px' }}>
        Please enter the 6 digit OTP shared on your registered
        {mediumType === 'phone' && <Text>{` Mobile ${user?.phone?.substring(0, 6)}xxxx`}</Text>}
        {mediumType === 'email' && <Text>{` Email xxxxxxxxxx@${user?.email?.split('@')?.[1]}`}</Text>}
      </Text>
      <InputOTP
        autoSubmit={handleVerifyOtp}
        value={otpValue}
        onChange={setOtpValue}
        name="termsAgree"
        namelength={6}
        inputType="numeric"
        style={{ marginTop: '50px', fontSize: '12px !important', padding: '0.6rem 0.5rem !important' }}
      />
      <Button
        className="form__button"
        style={{
          color: 'white',
          background: '#023FAC',
          fontSize: '12px',
          margin: '50px 0px 30px 0px',
        }}
        onClick={() => {
          handleVerifyOtp(otpValue);
        }}
        loading={loading.verifyOtpLoading}
        block
      >
        Submit
      </Button>
      <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <div>
          Didn't get OTP? &nbsp;
          <Text
            disabled={resendOTPbtnDisabled}
            style={{
              textDecoration: 'underline',
            }}
            onClick={() => {
              if (!resendOTPbtnDisabled) {
                resendOTP();
              }
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

export default VerifyOtp;

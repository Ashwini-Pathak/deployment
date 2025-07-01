import React, { useState } from 'react';
import './login.scss';
import { Button, Divider, Input, Typography } from 'antd';
import { Link } from 'react-router-dom';
import logo from '../../../assets/logo.svg';
import LinkedinIcon from '../../../assets/images/linkedin.svg';
import { isEmpty } from 'lodash';

const LoginForm = ({ loading, handleSubmit, onCode, onClose, OauthPopup, url }) => {
  const { Text } = Typography;
  const [value, setValue] = useState('');

  return (
    <div className="login-box">
      <div className="login-box__img">
        <img src={logo} alt="logo" width="150px" />
      </div>
      <div className="login-box__button">
        <OauthPopup url={url} onCode={onCode} onClose={onClose}>
          <Button type="primary" className="button-items">
            <img src={LinkedinIcon} alt="linkedIn" className="button-img" />
            Login via Linkedin
          </Button>
        </OauthPopup>
      </div>
      <div>
        <Divider className="login-box__divider" plain>
          OR
        </Divider>
        <Text>
          <span className="mandatory-star">*</span>Work E-mail/&nbsp;Mobile No.
        </Text>
        <Input
          placeholder="Enter E-mail/Mobile No."
          className="login-box__placeholder"
          onChange={(e) => setValue(e?.target?.value)}
          value={value}
        />
        <Button
          type="primary"
          block
          ghost
          disabled={isEmpty(value)}
          onClick={() => {
            handleSubmit(value);
          }}
          loading={loading.loginLoading}
          className="login-verify__button"
        >
          Verify via OTP
        </Button>
        <Text className="login-msg">
          Don't have an account?
          <Link to="/register" className="login-to__register">
            &nbsp;&nbsp;Register
          </Link>
        </Text>
      </div>
    </div>
  );
};

export default LoginForm;

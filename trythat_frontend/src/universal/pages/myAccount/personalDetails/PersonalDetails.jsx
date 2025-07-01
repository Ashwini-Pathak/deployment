import './personalDetails.scss';
import { useState } from 'react';
import { Button, Form, Input, Space } from 'antd';
import UserImage from '../../../components/userImage/UserImage';
import Title from 'antd/es/typography/Title';
import Text from 'antd/es/typography/Text';
import verifiedIcon from '../../../../assets/images/verified.png';

const PersonalDetails = ({
  isFormEditable,
  loading,
  user,
  profileCompletion,
  handleOpenVerifyOtpModal,
  userImgUrl,
}) => {
  const [personalEmail, setPersonalEmail] = useState(user?.personalDetails?.personalEmail ?? '');
  const [isValidEmail, setIsValidEmail] = useState(false);
  const handleChange = (e) => {
    setPersonalEmail(e?.target?.value);
    setIsValidEmail(/^[a-z0-9._]+@[a-z0-9.]+\.[a-z]{2,4}$/.test(personalEmail));
  };

  return (
    <>
      <div className="personalDtlsSection__personalDetails">
        <Title className="personalDetails-title">Personal Details</Title>
        <Form.Item className="editDetails-div">
          <Button className="editSaveBtn" htmlType="submit" ghost type="primary" loading={loading}>
            {isFormEditable ? 'Save' : 'Edit Profile'}
          </Button>
        </Form.Item>
      </div>
      <Space direction="vertical" className="personalDetails-space">
        <Text className="personalDetails-message">Complete your entire profile details and gain 50 points</Text>
        <div className="item-center">
          <UserImage
            userImage={userImgUrl}
            isFormEditable={isFormEditable}
            isVerified={true}
            completionPercentage={profileCompletion?.overallCompletion}
            user={user}
          />
        </div>
      </Space>

      <Form.Item
        label="Name"
        name="name"
        className="formItemLabel"
        rules={[{ required: true, message: 'Please input your name!' }]}
      >
        {isFormEditable ? (
          <Input
            suffix={<img src={verifiedIcon} alt="verified" width="17px" height="17px" className="form-suffix" />}
            disabled={true}
            className="input-box"
          />
        ) : (
          <Form.Item shouldUpdate className="userPersonalDtls__formValues">
            {({ getFieldValue }) => (
              <Text strong className="userPersonalDtls__formValues">
                {getFieldValue('name') || '-'}
                <img src={verifiedIcon} alt="verified" width="17px" height="17px" className="form-suffix" />
              </Text>
            )}
          </Form.Item>
        )}
      </Form.Item>
      <Form.Item
        label="Mobile no"
        name="phone"
        className="formItemLabel"
        rules={[{ required: true, message: 'Please input your mobile!' }]}
      >
        {isFormEditable ? (
          <Input
            suffix={
              user?.verificationStatus?.phone ? (
                <img src={verifiedIcon} alt="verified" width="17px" height="17px" className="form-suffix" />
              ) : (
                <a href="#" onClick={() => handleOpenVerifyOtpModal(user?.phone, 'phone')}>
                  Verify
                </a>
              )
            }
            disabled={true}
            className="input-box"
          />
        ) : (
          <Form.Item shouldUpdate className="userPersonalDtls__formValues">
            {({ getFieldValue }) => (
              <Text strong className="userPersonalDtls__formValues">
                {getFieldValue('phone') || '-'}
                {user?.verificationStatus?.phone && (
                  <img src={verifiedIcon} alt="verified" width="17px" height="17px" className="form-suffix" />
                )}
              </Text>
            )}
          </Form.Item>
        )}
      </Form.Item>
      <Form.Item
        label="Personal Email"
        name="personalEmail"
        shouldUpdate
        initialValue={personalEmail}
        className="formItemLabel companyDetails-label"
        rules={[
          {
            required: false,
            message: 'Please input valid Email.',
            pattern: /^[a-z0-9._]+@[a-z0-9.]+\.[a-z]{2,4}$/,
          },
        ]}
      >
        {isFormEditable ? (
          <Input
            onChange={handleChange}
            name="personalEmail"
            disabled={user?.personalDetails?.personalEmail}
            suffix={
              user?.verificationStatus?.personalEmail && user?.personalDetails?.personalEmail ? (
                <img src={verifiedIcon} alt="verified" width="17px" height="17px" className="form-suffix" />
              ) : (
                <a
                  href="#"
                  disabled={user?.personalDetails?.personalEmail ? false : true}
                  onClick={() =>
                    user?.personalDetails?.personalEmail
                      ? handleOpenVerifyOtpModal(user?.personalDetails?.personalEmail, 'personalEmail')
                      : null
                  }
                >
                  Verify
                </a>
              )
            }
            placeholder="Please enter Personal Email Id"
            className="company-placeholder input-box"
          />
        ) : (
          <Form.Item shouldUpdate className="userPersonalDtls__formValues">
            {({ getFieldValue }) => (
              <div className="userPersonalDtls__formValues" style={{ display: 'flex', alignItems: 'center' }}>
                <Text strong>
                  {getFieldValue('personalEmail') || '-'}
                  {user?.verificationStatus?.personalEmail ? (
                    <img
                      src={verifiedIcon}
                      alt="verified"
                      width="17px"
                      height="17px"
                      style={{ position: 'absolute', right: '11px' }}
                    />
                  ) : null}
                </Text>
              </div>
            )}
          </Form.Item>
        )}
      </Form.Item>

      <Form.Item
        label="Aadhar No"
        name="aadharNumber"
        className="formItemLabel"
        rules={[
          {
            message: 'Please input valid Aadhar no.',
            pattern: /^[0-9]{12}$/,
          },
        ]}
      >
        {isFormEditable ? (
          <Input
            initialValue={user?.personalDetails?.aadharNumber}
            placeholder="Please enter Aadhar Number"
            type="number"
            className="input-details aadhar-input"
          />
        ) : (
          <Form.Item shouldUpdate className="userPersonalDtls__formValues">
            {({ getFieldValue }) => (
              <Text strong className="userPersonalDtls__formValues">
                {getFieldValue('aadharNumber') || '-'}
              </Text>
            )}
          </Form.Item>
        )}
      </Form.Item>

      <Form.Item
        label="PAN"
        name="panNumber"
        className="formItemLabel"
        rules={[
          {
            required: false,
            message: 'Please input valid PAN no.',
            pattern: /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/,
          },
        ]}
      >
        {isFormEditable ? (
          <Input
            placeholder="Please enter Pan Number"
            className="input-details"
            initialValue={user?.personalDetails?.aadharNumber}
            onInput={(e) => (e.target.value = e?.target?.value?.toUpperCase())}
          />
        ) : (
          <Form.Item shouldUpdate className="userPersonalDtls__formValues">
            {({ getFieldValue }) => (
              <Text strong className="userPersonalDtls__formValues">
                {getFieldValue('panNumber') || '-'}
              </Text>
            )}
          </Form.Item>
        )}
      </Form.Item>
    </>
  );
};

export default PersonalDetails;

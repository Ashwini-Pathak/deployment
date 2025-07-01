import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card, Form, Modal } from 'antd';
import { isEmpty } from 'lodash';
import PersonalDetails from './PersonalDetails';
import CompanyDetails from './CompanyDetails';
import PointsDetails from './PointsDetails';
import './index.scss';

import {
  fetchUserProfileData,
  fetchUserProfileDataV2,
  sendOtp,
  setIsFormEditable,
  setVerifyOtpModalState,
  updateUserProfileData,
  verifyOtp,
} from '../../../features/myAccountSlice';
import VerifyOtp from '../../../components/myAccount/verifyOtp/VerifyOtp';
import PostDetails from '../PostDetails/PostDetails';

const PersonalDetailsTab = ({ activeAccountTab, user, userPoints, loading, isFormEditable, profileCompletion }) => {
  const dispatch = useDispatch();
  const [personalDetails] = Form.useForm();
  const { verifyOtpModalState } = useSelector((store) => store.myAccount);

  const [otpBody, setOtpBody] = useState({});

  useEffect(() => {
    dispatch(fetchUserProfileData());
    dispatch(fetchUserProfileDataV2());
    dispatch(setIsFormEditable(false));
    dispatch(setVerifyOtpModalState(false));
  }, []);

  useEffect(() => {
    if (isEmpty(user)) return;
    personalDetails.setFieldsValue({
      name: user?.name,
      phone: user?.phone,
      personalEmail: user?.personalDetails?.personalEmail,
      aadharNumber: user?.personalDetails?.aadharNumber,
      panNumber: user?.personalDetails?.panNumber,
      companyName: user?.professionalDetails?.companyName,
      industry: user?.professionalDetails?.industry,
      companyEmailId: user?.email,
      designation: user?.professionalDetails?.designation,
      yearsOfExperience: user?.professionalDetails?.experience,
      keySkills: user?.professionalDetails?.keySkills,
      lastCompanyIndustry: user?.professionalDetails?.lastCompanyIndustry,
      lastCompanyName: user?.professionalDetails?.lastCompanyName,
      lastCompanyDesignation: user?.professionalDetails?.lastCompanyDesignation,
      companyLabelText: user?.professionalDetails?.companyName,
    });
  }, [user]);

  const getPayloadTemplate = (e) => {
    return [
      {
        pageName: 'personalDetails',
        body: {
          name: e?.name || user?.name,
          phone: e?.phone || user?.phone,
          personalEmail: e?.personalEmail,
          aadharNumber: e?.aadharNumber,
          panNumber: e?.panNumber,
          imageUrl: user?.personalDetails?.imageUrl,
        },
      },
      {
        pageName: 'professionalDetails',
        body: {
          companyName: e?.companyName,
          industry: e?.industry,
          companyEmailId: e?.companyEmailId || user?.email,
          designation: e?.designation,
          experience: e?.yearsOfExperience,
          keySkills: e?.keySkills,
          lastCompanyIndustry: e?.lastCompanyIndustry,
          lastCompanyDesignation: e?.lastCompanyDesignation,
          lastCompanyName: e?.lastCompanyName,
        },
      },
    ];
  };

  const onFinish = (e) => {
    if (isFormEditable) {
      dispatch(updateUserProfileData(getPayloadTemplate(e)));
      return;
    }
    dispatch(setIsFormEditable(true));
  };

  const handleOpenVerifyOtpModal = (value, type) => {
    const body = {
      type: type,
      data: value,
    };
    setOtpBody(body);
    dispatch(sendOtp(body));
  };

  const handleVerifyOtp = (otp) => {
    const body = {
      ...otpBody,
      otp: otp.join(''),
    };
    dispatch(verifyOtp(body));
  };
  const handleCloseEmailVerification = () => {};
  return (
    <>
      <section className="personalDtlsSection">
        <Form
          className="personalDtlsSection-form"
          name="personalDetails"
          initialValues={{ remember: true }}
          layout="vertical"
          onFinish={onFinish}
          form={personalDetails}
        >
          <Card className="personalDtlsSection-form__card">
            <PersonalDetails
              isFormEditable={isFormEditable}
              loading={loading}
              user={user}
              profileCompletion={profileCompletion}
              handleOpenVerifyOtpModal={handleOpenVerifyOtpModal}
            />
          </Card>

          <Card className="personalDtlsSection-form__card">
            <CompanyDetails
              isFormEditable={isFormEditable}
              user={user}
              handleOpenVerifyOtpModal={handleOpenVerifyOtpModal}
            />
          </Card>
        </Form>
        <Card id="scrollableDiv" className="personalDtlsSection-form__cardtwo">
          <PostDetails activeAccountTab={activeAccountTab} isPersonalPosts={true} />
        </Card>
        <Modal
          className="verifyEmailBody"
          open={verifyOtpModalState}
          footer=""
          onCancel={() => dispatch(setVerifyOtpModalState(false))}
        >
          <VerifyOtp
            handleCloseEmailVerification={handleCloseEmailVerification}
            handleVerifyOtp={handleVerifyOtp}
            loading={loading}
            mediumType={otpBody?.type}
            user={user}
            otpBody={otpBody}
          />
        </Modal>
      </section>
    </>
  );
};

export default PersonalDetailsTab;

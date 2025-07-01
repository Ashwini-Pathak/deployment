import { Form, Input, Space, Select, Tag } from 'antd';
import Title from 'antd/es/typography/Title';
import Text from 'antd/es/typography/Text';
import './personalDetails.scss';
import { keySkills } from '../../../../utils/referenceData/personalDetailsOfferings';
import { current_industry_options } from '../../../../utils/current_industry_options';

import verifiedIcon from '../../../../assets/images/verified.png';

const CompanyDetails = ({ isFormEditable, user, handleOpenVerifyOtpModal }) => {
  const options = keySkills.map((el) => {
    return {
      label: el,
      value: el,
    };
  });
  return (
    <>
      <Space direction="vertical" className="personalDtlsSection__companyDetails">
        <Title level={4} className="companyDetails-heading">
          Professional Details
        </Title>
        <Form.Item label="Current Company" className="companyDetails-label">
          {isFormEditable ? (
            <Form.Item disabled name="companyName">
              <Input placeholder="Enter Current Company" className="form-placeholder" />
            </Form.Item>
          ) : (
            <Form.Item shouldUpdate className="userPersonalDtls__formValues">
              {({ getFieldValue }) => (
                <Text strong className="userPersonalDtls__formValues">
                  {getFieldValue('companyName') || '-'}
                </Text>
              )}
            </Form.Item>
          )}
        </Form.Item>

        <Form.Item
          label="Current work mail Id "
          name="companyEmailId"
          className="companyDetails-label"
          rules={[{ required: true, message: 'Please input your work Email!' }]}
        >
          {isFormEditable ? (
            <Input
              name="companyEmailId"
              suffix={
                user?.verificationStatus?.email ? (
                  <img src={verifiedIcon} alt="verified" width="17px" height="17px" className="verify-icon" />
                ) : (
                  <a href="#" onClick={() => handleOpenVerifyOtpModal(user?.email, 'email')}>
                    Verify
                  </a>
                )
              }
              placeholder="Enter Work Email Id"
              disabled={true}
              className="company-placeholder"
            />
          ) : (
            <Form.Item shouldUpdate className="userPersonalDtls__formValues">
              {({ getFieldValue }) => (
                <div className="userPersonalDtls__formValues" style={{ display: 'flex', alignItems: 'center' }}>
                  <Text strong>
                    {getFieldValue('companyEmailId')}
                    {user?.verificationStatus?.email ? (
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

        <Form.Item label="Current Designation" name="designation" className="companyDetails-label">
          {isFormEditable ? (
            <Input placeholder="Enter Designation" className="form-placeholder" />
          ) : (
            <Form.Item shouldUpdate className="userPersonalDtls__formValues">
              {({ getFieldValue }) => (
                <Text strong className="userPersonalDtls__formValues">
                  {getFieldValue('designation') || '-'}
                </Text>
              )}
            </Form.Item>
          )}
        </Form.Item>
        <Form.Item label="Years of Experience" name="yearsOfExperience" className="companyDetails-label">
          {isFormEditable ? (
            <Input type="number" min={0} placeholder="Enter years of Experience" className="form-placeholder" />
          ) : (
            <Form.Item shouldUpdate className="userPersonalDtls__formValues">
              {({ getFieldValue }) => (
                <Text strong className="userPersonalDtls__formValues">
                  {getFieldValue('yearsOfExperience') || '-'}
                </Text>
              )}
            </Form.Item>
          )}
        </Form.Item>

        <Form.Item
          label="Current Company Industry"
          name="industry"
          className="companyDetails-label"
          rules={[
            {
              required: false,
              message: 'Please input valid Industry.',
              pattern: /^[a-zA-Z\s]*$/,
            },
          ]}
        >
          {isFormEditable ? (
            <Form.Item
              className="companydetails-container__row-formitem"
              name="industry"
              rules={[
                {
                  required: true,
                  message: 'Please select an appropraite Industry!',
                },
              ]}
            >
              <Select className="row-formitem__select" options={current_industry_options} />
            </Form.Item>
          ) : (
            <Form.Item shouldUpdate className="userPersonalDtls__formValues">
              {({ getFieldValue }) => (
                <Text strong className="userPersonalDtls__formValues">
                  {getFieldValue('industry') || '-'}
                </Text>
              )}
            </Form.Item>
          )}
        </Form.Item>

        <Form.Item label="Last Company Name" name="lastCompanyName" className="companyDetails-label">
          {isFormEditable ? (
            <Input placeholder="Enter Last Company Name" className="form-placeholder" />
          ) : (
            <Form.Item shouldUpdate className="userPersonalDtls__formValues">
              {({ getFieldValue }) => (
                <Text strong className="userPersonalDtls__formValues">
                  {getFieldValue('lastCompanyName') || '-'}
                </Text>
              )}
            </Form.Item>
          )}
        </Form.Item>

        <Form.Item label="Last Company Designation" name="lastCompanyDesignation" className="companyDetails-label">
          {isFormEditable ? (
            <Input placeholder="Enter Last Company Designation" className="form-placeholder" />
          ) : (
            <Form.Item shouldUpdate className="userPersonalDtls__formValues">
              {({ getFieldValue }) => (
                <Text strong className="userPersonalDtls__formValues">
                  {getFieldValue('lastCompanyDesignation') || '-'}
                </Text>
              )}
            </Form.Item>
          )}
        </Form.Item>

        <Form.Item
          label="Last Company Industry"
          name="lastCompanyIndustry"
          className="companyDetails-label"
          rules={[
            {
              required: false,
              message: 'Please input valid Industry.',
              pattern: /^[a-zA-Z\s]*$/,
            },
          ]}
        >
          {isFormEditable ? (
            <Input placeholder="Enter Last Company Industry" className="form-placeholder" />
          ) : (
            <Form.Item shouldUpdate className="userPersonalDtls__formValues">
              {({ getFieldValue }) => (
                <Text strong className="userPersonalDtls__formValues">
                  {getFieldValue('lastCompanyIndustry') || '-'}
                </Text>
              )}
            </Form.Item>
          )}
        </Form.Item>

        <Form.Item label="Key Skills" className="companyDetails-label">
          {isFormEditable ? (
            // <Input placeholder="Eg: Innovator, Design Thinking, Strategic Thinker" className='form-placeholder' />
            <>
              <Form.Item name="keySkills">
                <Select
                  className="keySkills"
                  mode="multiple"
                  style={{
                    width: '100%',
                    height: '40px',
                    marginTop: '8px',
                  }}
                  placeholder="Select Skills"
                  options={options}
                />
              </Form.Item>
              <Form.Item shouldUpdate className="userPersonalDtls__formValues">
                {({ getFieldValue }) => (
                  <Text strong className="userPersonalDtls__formValues" style={{ maxWidth: '400px' }}>
                    <div style={{ maxHeight: '80px', overflow: 'scroll' }}>
                      {getFieldValue('keySkills')?.length > 0
                        ? getFieldValue('keySkills')?.map((el, index) => (
                            <Tag
                              key={index}
                              style={{
                                backgroundColor: '#3F52A3',
                                fontWeight: '100px',
                                border: 'none',
                                color: '#fff',
                                borderRadius: '100px',
                                paddingLeft: '20px',
                                paddingRight: '20px',
                              }}
                            >
                              {el}
                            </Tag>
                          ))
                        : '-'}
                    </div>
                  </Text>
                )}
              </Form.Item>
            </>
          ) : (
            <Form.Item shouldUpdate className="userPersonalDtls__formValues">
              {({ getFieldValue }) => (
                <Text strong className="userPersonalDtls__formValues" style={{ maxWidth: '400px' }}>
                  <div style={{ maxHeight: '80px', overflow: 'scroll' }}>
                    {getFieldValue('keySkills')?.map((el, index) => (
                      <Tag
                        key={index}
                        color="#3F52A3"
                        style={{
                          backgroundColor: '#3F52A3',
                          fontWeight: '100px',
                          border: 'none',
                          color: '#fff',
                          borderRadius: '100px',
                          paddingLeft: '20px',
                          paddingRight: '20px',
                        }}
                      >
                        {el}
                      </Tag>
                    ))}
                  </div>
                </Text>
              )}
            </Form.Item>
          )}
        </Form.Item>
      </Space>
    </>
  );
};

export default CompanyDetails;

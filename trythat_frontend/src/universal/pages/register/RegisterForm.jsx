import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';

import { Button, Checkbox, Divider, Form, Input, Select } from 'antd';
import { LeftCircleOutlined } from '@ant-design/icons';

import LinkedinIcon from '../../../assets/images/linkedin.svg';
import { industry_type_options } from '../../../utils/current_industry_options';

//  styles
import './register.scss';

const RegisterForm = ({ handleSubmit, loading, onCode, onClose, OauthPopup, url }) => {
  const [checkedStatus, setCheckedStatus] = useState(false);
  const navigateTo = useNavigate();

  return (
    <div className="registrationcard-box">
      <div className="registrationcard-header">
        <LeftCircleOutlined onClick={() => navigateTo('/')} />
        <h2 className="header-text">Registration</h2>
      </div>
      <div>
        <Form
          className="registrationcard-box__form"
          name="basic"
          layout="vertical"
          initialValues={{
            remember: true,
          }}
          onFinish={handleSubmit}
          autoComplete="off"
        >
          <Form.Item
            name="name"
            label="Name"
            rules={[
              {
                required: true,
                message: 'Please input valid name.',
                pattern: /^[a-zA-Z\s]+$/,
              },
            ]}
          >
            <Input placeholder="Enter Name" />
          </Form.Item>

          <Form.Item
            name="email"
            label="Work E-mail"
            rules={[
              {
                message: 'Please input valid email Id',
                type: 'email',
              },
              {
                required: true,
                message: 'Please input your email Id',
              },
            ]}
          >
            <Input placeholder="Enter Company's E-mail" />
          </Form.Item>

          <Form.Item
            name="phone"
            label="Mobile No."
            rules={[
              {
                message: 'Please input valid mobile no.',
                pattern: /^[0-9]{10}$/,
              },
              {
                required: true,
                message: 'Please input your mobile no.',
              },
            ]}
          >
            <Input type="number" placeholder="Enter Mobile No." />
          </Form.Item>
          <Form.Item
            name="industryType"
            label="Industry Type"
            placeholder="Select Industry Type"
            rules={[
              {
                required: true,
                message: 'Please select an appropraite Industry!',
              },
            ]}
          >
            <Select className="row-formitem__select" options={industry_type_options} />
          </Form.Item>
          <Form.Item
            name="termsAgree"
            valuePropName="checked"
            rules={[
              {
                validator: (_, value) =>
                  value ? Promise.resolve() : Promise.reject(new Error('Please accept Terms & Conditions')),
              },
            ]}
          >
            <Checkbox onChange={() => setCheckedStatus(!checkedStatus)}>I agree to Terms & Conditions</Checkbox>
          </Form.Item>
          <Form.Item>
            <Button
              loading={loading.registerLoading}
              disabled={!checkedStatus}
              type="primary"
              style={{
                background: checkedStatus ? '#023FAC' : '',
                fontSize: '12px',
              }}
              block
              htmlType="submit"
            >
              Submit
            </Button>
          </Form.Item>

          <Divider className="form-divider">or sign in with</Divider>

          <div className="form-item">
            <OauthPopup url={url} onCode={onCode} onClose={onClose}>
              <Button className="form-button" type="primary">
                <img className="form-img" src={LinkedinIcon} alt="linkedIn" />
                Login via Linkedin
              </Button>
            </OauthPopup>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default RegisterForm;

import { nanoid } from '@reduxjs/toolkit';
import { Col, Form, Input, Row, Select, Space, Tag, Typography } from 'antd';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { keySkills } from '../../../../utils/referenceData/personalDetailsOfferings';
import './PersonalDetails.scss';

const PersonalDetails = ({ keySkillsL }) => {
  const { loading } = useSelector((store) => store.userOnboarding);
  const { user } = useSelector((store) => store.user);
  const [keySkillsList, setKeySkillsList] = useState([]);
  const { Text } = Typography;
  const options = keySkills.map((el) => {
    return {
      label: el,
      value: el,
    };
  });

  const selectProps = {
    value: keySkillsList,
  };

  useEffect(() => {
    setKeySkillsList(keySkillsL);
  }, [keySkillsL]);

  return (
    <div style={{ width: '100%', display: 'flex', flexDirection: 'column', marginTop: '20px', gap: '20px' }}>
      <Row gutter={24}>
        <Col span={12}>
          <Row>
            <Form.Item
              style={{ width: '100%' }}
              name="companyRepresentativeName"
              label="Company Representative Name"
              rules={[
                {
                  required: true,
                  message: 'Enter Company Representative Name',
                },
              ]}
            >
              <Input
                name="companyRepresentativeName"
                disabled={true}
                style={{ height: '40px', marginTop: '8px', color: '#132056' }}
                placeholder="Enter Company Representative Name"
              />
            </Form.Item>
          </Row>
        </Col>
        <Col span={12}>
          <Row>
            <Form.Item
              style={{ width: '100%' }}
              name="companyRepresentativeMobile"
              label="Company Representative Mobile No."
              rules={[
                {
                  required: true,
                  message: 'Enter Company Representative Mobile No.',
                },
              ]}
            >
              <Input
                name="companyRepresentativeMobile"
                disabled={!!user?.phone}
                style={{ height: '40px', marginTop: '8px', color: '#132056' }}
                placeholder="Company Representative Mobile No."
              />
            </Form.Item>
          </Row>
        </Col>
      </Row>
      <Row gutter={24}>
        <Col span={12}>
          <Row>
            <Form.Item
              style={{ width: '100%' }}
              name="companyRepresentativeEmail"
              label="Company Representative E-mail Id"
              rules={[
                {
                  required: true,
                  message: 'Enter Company Representative E-mail Id',
                },
              ]}
            >
              <Input
                name="companyRepresentativeEmail"
                disabled={!!user?.email}
                style={{ height: '40px', marginTop: '8px', color: '#132056', fontWeight: '500' }}
                placeholder="Enter Company Representative E-mail Id"
              />
            </Form.Item>
          </Row>
        </Col>
        <Col span={12}>
          <Row>
            <Form.Item style={{ width: '100%' }} name="designation" label="Designation">
              <Input style={{ height: '40px', marginTop: '8px' }} placeholder="Enter Designation" />
            </Form.Item>
          </Row>
        </Col>
      </Row>
      <Row gutter={24}>
        <Col span={12}>
          <Row>
            <Form.Item
              style={{ width: '100%' }}
              name="yearsOfExperience"
              label="Years of Experience"
              rules={[
                {
                  pattern: /^(0|[1-9]\d*)$/,
                  message: 'Years of experience must be a non-negative number',
                },
              ]}
            >
              <Input
                type="number"
                style={{ height: '40px', marginTop: '8px', width: '100%' }}
                placeholder="Enter Years of Experience "
              />
            </Form.Item>
          </Row>
        </Col>
        <Col span={12}>
          <Row>
            <Space
              className="keySkillsSpace"
              style={{
                width: '100%',
              }}
            >
              <Form.Item name="keySkills" label="Key Skills">
                <Select
                  className="keySkills"
                  mode="multiple"
                  // maxCount={3}
                  style={{
                    width: '100%',
                    height: '40px',
                    marginTop: '8px',
                  }}
                  {...selectProps}
                  placeholder="Select Skills"
                  options={options}
                  onChange={setKeySkillsList}
                />
              </Form.Item>
            </Space>
            <div style={{ maxHeight: '100px', overflow: 'scroll' }}>
              {keySkillsList?.map((el) => {
                return (
                  <Tag
                    key={nanoid()}
                    color="#3F52A3"
                    style={{
                      borderRadius: '100px',
                      marginBottom: '15px',
                      paddingLeft: '20px',
                      paddingRight: '20px',
                    }}
                  >
                    <Text style={{ color: 'white', fontSize: '12px' }}>{el}</Text>
                  </Tag>
                );
              })}
            </div>
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default PersonalDetails;

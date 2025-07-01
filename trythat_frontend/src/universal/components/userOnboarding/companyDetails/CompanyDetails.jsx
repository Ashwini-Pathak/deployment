import { PlusCircleFilled } from '@ant-design/icons';
import { Col, Form, Input, Row, Select, Spin } from 'antd';
import React from 'react';
import { useSelector } from 'react-redux';
import { numberRegex } from '../../../../utils/Constants';
import './companyDetails.scss';

const CompanyDetails = ({ createCompany, allIndustriesList, allCompanyList, setCreateCompany }) => {
  // states
  const { loading } = useSelector((store) => store.userOnboarding);

  return (
    <>
      {false ? (
        <div className="companydetails">
          <Spin size="large" />
        </div>
      ) : (
        <div className="companydetails-container">
          {/*  If company is not already present */}
          {createCompany ? (
            <div>
              <Row gutter={24} className="companydetails-container__row">
                <Col span={12}>
                  <Row>
                    <Form.Item
                      className="companydetails-container__row-formitem"
                      name="addCompanyName"
                      label="Company Name"
                      rules={[
                        {
                          required: true,
                          message: "Please enter your Company's Name!",
                        },
                      ]}
                    >
                      <Input className="row-formitem__input" name="addCompanyName" placeholder="Enter Company Name" />
                    </Form.Item>
                  </Row>
                </Col>
                <Col span={12}>
                  <Row>
                    <Form.Item
                      className="companydetails-container__row-formitem"
                      name="addIndustryName"
                      label="Select Industry"
                      rules={[
                        {
                          required: true,
                          message: 'Please enter an appropraite Industry!',
                        },
                      ]}
                    >
                      {/* <Input className="row-formitem__input" name="industryName" placeholder="Enter Industry" /> */}
                      <Select
                        name="addIndustryName"
                        className="row-formitem__select"
                        placeholder="Select Industry"
                        options={allIndustriesList || []}
                      />
                    </Form.Item>
                  </Row>
                </Col>
              </Row>
              <Row gutter={24} className="companydetails-container__row">
                <Col span={12}>
                  <Row>
                    <Form.Item
                      className="companydetails-container__row-formitem"
                      name="CIN"
                      label="CIN/LLPIN/Shopact"
                      rules={[
                        {
                          required: true,
                          message: 'Please enter CIN/LLPIN/Shopact!',
                        },
                      ]}
                    >
                      <Input className="row-formitem__input" name="cin" placeholder="Type here" />
                    </Form.Item>
                  </Row>
                </Col>
                <Col span={12}>
                  <Row>
                    <Form.Item
                      className="companydetails-container__row-formitem"
                      name="websiteLink"
                      label="Website Link"
                      rules={
                        [
                          // {
                          //   pattern:
                          //     /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/,
                          //   message: 'Please enter valid website link',
                          // },
                        ]
                      }
                    >
                      <Input className="row-formitem__input" name="websiteLink" placeholder="Type here" />
                    </Form.Item>
                  </Row>
                </Col>
              </Row>
              <Row gutter={24} className="companydetails-container__row">
                <Col span={12}>
                  <Row>
                    <Form.Item
                      className="companydetails-container__row-formitem"
                      name="address"
                      label="Add Address"
                      rules={[
                        {
                          required: true,
                          message: "Please enter your Company's Address!",
                        },
                      ]}
                    >
                      <Input className="row-formitem__input" name="address" placeholder="Address" />
                    </Form.Item>
                  </Row>
                </Col>
                <Col span={12}>
                  <Row>
                    <Form.Item
                      className="companydetails-container__row-formitem"
                      name="locality"
                      label="Locality"
                      rules={[
                        {
                          required: true,
                          message: 'Please enter an locality!',
                        },
                      ]}
                    >
                      <Input className="row-formitem__input" name="locality" placeholder="Type here" />
                    </Form.Item>
                  </Row>
                </Col>
              </Row>
              <Row gutter={24} className="companydetails-container__row">
                <Col span={12}>
                  <Row>
                    <Form.Item
                      className="companydetails-container__row-formitem"
                      name="city"
                      label="City"
                      rules={[
                        {
                          required: true,
                          message: 'Please enter city!',
                        },
                      ]}
                    >
                      <Input className="row-formitem__input" name="city" placeholder="Type here" />
                    </Form.Item>
                  </Row>
                </Col>
                <Col span={12}>
                  <Row>
                    <Form.Item
                      className="companydetails-container__row-formitem"
                      name="state"
                      label="State"
                      rules={[
                        {
                          required: true,
                          message: 'Please enter an state!',
                        },
                      ]}
                    >
                      <Input className="row-formitem__input" name="state" placeholder="Type here" />
                    </Form.Item>
                  </Row>
                </Col>
              </Row>
              <Col span={12}>
                <Form.Item
                  className="companydetails-container__row-formitem"
                  name="pinCode"
                  label="Pincode"
                  rules={[
                    {
                      required: true,
                      message: 'Please enter pincode!',
                    },
                    {
                      pattern: numberRegex,
                      message: 'Enter valid pincode',
                    },
                  ]}
                >
                  <Input className="row-formitem__input" name="pinCode" placeholder="Type here" />
                </Form.Item>
              </Col>
            </div>
          ) : (
            // If company is already present
            <Row gutter={24} className="companydetails-container__row">
              <Col span={12}>
                <Row>
                  <Form.Item
                    className="companydetails-container__row-formitem"
                    name="companyName"
                    label="Company Name"
                    rules={[
                      {
                        required: true,
                        message: 'Please Select your Company !',
                      },
                    ]}
                  >
                    <Select
                      className="row-formitem__select"
                      options={allCompanyList || []}
                      placeholder="Select Company "
                      showSearch
                      dropdownRender={(menu) => (
                        <div>
                          {menu}
                          <div
                            className="createCompanyButton"
                            onMouseDown={(e) => e.preventDefault()}
                            onClick={() => setCreateCompany(true)}
                          >
                            <PlusCircleFilled type="plus" /> Create Company
                          </div>
                        </div>
                      )}
                    />
                  </Form.Item>
                </Row>
              </Col>
              <Col span={12}>
                <Row>
                  <Form.Item
                    className="companydetails-container__row-formitem"
                    name="industry"
                    label="Select Industry"
                    rules={[
                      {
                        required: true,
                        message: 'Please select an appropraite Industry!',
                      },
                    ]}
                  >
                    <Select
                      className="row-formitem__select"
                      placeholder="Select Industry"
                      options={allIndustriesList || []}
                    />
                  </Form.Item>
                </Row>
              </Col>
            </Row>
          )}
        </div>
      )}
    </>
  );
};

export default CompanyDetails;

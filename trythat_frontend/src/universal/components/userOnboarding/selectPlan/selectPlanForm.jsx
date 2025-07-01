import { Flex, Form, Input, Row, Typography,Col,message } from 'antd';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import CommonButton from '../../../components/socialApp/common/CommonButton';
import { selectPlanPost } from '../../../features/userOnboardingSlice';
import './selectPlanForm.scss';



const SelectPlanForm = ({ closePopup = () => { } }) => {
    // hooks
    const { Text } = Typography;
    const { TextArea } = Input;
    const dispatch = useDispatch();
    // form derails
    const [formDetails] = Form.useForm();

    // states
    const [loader, setLoader] = useState(false);

    // handle submit
    const handleFormSubmit = (e) => {
        const createPostPayload = {
            firstName: e?.firstName,
            lastName: e?.lastName,
            email: e?.email,
            message: e?.message           
          };
          setLoader(true);
          dispatch(selectPlanPost(createPostPayload))?.then((res) => {
            setLoader(false);
            if (res?.payload?.data) {
              closePopup();
              message.success('Post created successfuly...');
            } else {
              message.error('Some error occured...');
            }
          });
    };

    // JSX
    return (
        <Form layout="vertical" form={formDetails} onFinish={handleFormSubmit}>
            <Text className="font22 fontDark">Select Plan</Text>
            <div style={{ marginTop: 10 }}>
                <Row className="d-flex">
                    <Col span={12}>
                        <Form.Item required label="First Name" className="dropdown-form-item">
                            <Flex gap="middle" horizontal>
                                <Form.Item
                                    name="firstName"
                                    className="buyerrow-form__space--text"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Add First Name!',
                                        },
                                    ]}
                                >
                                    <Input placeholder="Add First Name" min={0} />
                                </Form.Item>
                            </Flex>
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item required label="Last Name" className="dropdown-form-item">
                            <Flex gap="middle" horizontal>
                                <Form.Item
                                    name="lastName"
                                    className="buyerrow-form__space--text"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Add Last Name!',
                                        },
                                    ]}
                                >
                                    <Input placeholder="Add Last Name" min={0} />
                                </Form.Item>
                            </Flex>
                        </Form.Item>
                    </Col>


                </Row>
               
                <Form.Item required label="Email" className="dropdown-form-item">
                    <Flex gap="middle" horizontal>
                        <Form.Item
                            name="email"
                            className="buyerrow-form__space--text"
                            rules={[
                                {
                                    required: true,
                                    message: 'Add Email!',
                                },
                            ]}
                        >
                            <Input placeholder="Add Email" min={0} style={{ width: '16rem' }} />
                        </Form.Item>
                    </Flex>
                </Form.Item>
                <Form.Item required label="Message" className="dropdown-form-item">
                    <Flex gap="middle" horizontal>
                        <Form.Item
                            name="message"
                            className="buyerrow-form__space--text"
                            rules={[
                                {
                                    required: true,
                                    message: 'Add Message!',
                                },
                            ]}
                        >
                            <TextArea placeholder="Write Message here" style={{ width: '32rem', height: 80 }} min={0} />
                        </Form.Item>
                    </Flex>
                </Form.Item>
                <Row className="d-flex jc-end formButtons">
                    <div className="d-flex jc-end g-20 ">
                        <CommonButton loader={loader} type="primary" htmlType="submit">
                            Submit
                        </CommonButton>
                    </div>
                </Row>
            </div>
        </Form>
    );
};

export default SelectPlanForm;

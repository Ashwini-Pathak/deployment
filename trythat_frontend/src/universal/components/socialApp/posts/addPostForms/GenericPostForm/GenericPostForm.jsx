import { FileOutlined, LoadingOutlined, UploadOutlined, LeftOutlined } from '@ant-design/icons';
import { Form, Input, Row, Spin, Typography, Upload, message, Col } from 'antd';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CommonButton from '../../../common/CommonButton';
import './genericPostForm.scss';
import { socialAppCreatePost, uploadPostImage } from '../../../../../features/socialAppSlice';
import { useNavigate } from 'react-router';
import PostTags from './common/PostTags';

const GenericPostForm = ({ setShowForm, closePopup = () => {} }) => {
  // hooks
  const navigateTo = useNavigate();
  const dispatch = useDispatch();
  const { Text } = Typography;
  const { TextArea } = Input;

  // form derails
  const [formDetails] = Form.useForm();

  // states
  const [loader, setLoader] = useState(false);
  const [imgLoader, setImageloader] = useState(false);
  const [allTags, setAllTags] = useState([]);
  const [imgUrls, setImgUrls] = useState([]);
  const [imgNames, setImgNames] = useState([]);
  const userId = useSelector((state) => state.user?.user?.id);

  // handle image upload
  const handleUpload = async (file) => {
    const formData = new FormData();
    formData.append('files', file);
    setImageloader(true);
    dispatch(uploadPostImage(formData))?.then((res) => {
      setImageloader(false);
      message.success(`${file?.name} uploaded successfully...`);
      if (res?.payload?.data?.response?.data) {
        setImgNames((prev) => [...(prev || []), file?.name]);
        setImgUrls((prev) => [...(prev || []), ...(res?.payload?.data?.response?.data || [])]);
      }
    });
  };

  // route to my acount screen
  const routeToTransactionScreen = () => {
    navigateTo('/user/myaccount?activeTab=personal_details', { replace: true });
  };

  // handle submit
  const handleFormSubmit = (values) => {
    const createPostPayload = {
      type: 'generic_card',
      title: values?.post_title || '',
      body: values?.post_caption || '',
      tags: allTags?.length > 0 ? allTags : undefined,
      CTA: { name: values?.cta, link: values?.link },
      imageUrls: imgUrls,
      ownerType: 'user_post',
      ownerId: userId,
    };
    setLoader(true);
    dispatch(socialAppCreatePost(createPostPayload))?.then((res) => {
      setLoader(false);
      if (res?.payload?.data?.response) {
        closePopup();
        message.success('Post created successfully...');
        routeToTransactionScreen();
        setShowForm(false);
      } else {
        message.error('Some error occurred...');
      }
    });
  };
  //JSX
  return (
    <div className="genericpostform" style={{ padding: 20, background: '#fff', borderRadius: 8 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <LeftOutlined
            style={{ fontSize: 20, marginRight: 10, cursor: 'pointer', color: '#0081FC' }}
            onClick={() => setShowForm(false)}
          />
          <Text className="font18 fontDark">Generic Card</Text>
        </div>
        <div>
          <CommonButton ghost size="large" onClick={() => setShowForm(false)} style={{ marginRight: 10 }}>
            Reset
          </CommonButton>
          <CommonButton loader={loader} type="primary" htmlType="submit" onClick={() => formDetails.submit()}>
            Create Post
          </CommonButton>
        </div>
      </div>
      <Form layout="vertical" form={formDetails} onFinish={handleFormSubmit}>
        <div style={{ marginTop: 10 }}>
          <Row gutter={16}>
            <Col span={8}>
              <Form.Item name="imageURL" className="dropdown-form-item">
                <div className="d-flex g-20" style={{ marginBottom: '20px' }}>
                  <Upload
                    listType="picture-card"
                    className="uploadImage"
                    multiple
                    accept=".png,.jpeg,.jpg"
                    customRequest={({ file }) => handleUpload(file)}
                    showUploadList={false}
                  >
                    {imgLoader ? (
                      <Spin indicator={<LoadingOutlined />} />
                    ) : (
                      <>
                        <UploadOutlined style={{ fontSize: 28, paddingBottom: '1rem' }} /> <Text>Upload Image</Text>
                      </>
                    )}
                  </Upload>
                </div>
                <div style={{ maxHeight: '150px', overflow: 'scroll' }}>
                  {imgNames?.map((elem, index) => (
                    <div className="fontBlue" key={index}>
                      <FileOutlined /> {elem}
                    </div>
                  ))}
                </div>
              </Form.Item>
            </Col>
            <Col span={16}>
              <Form.Item
                name="post_title"
                required
                label="Add Post Title"
                className="dropdown-form-item"
                rules={[
                  {
                    required: true,
                    message: 'Add Post Title!',
                  },
                ]}
              >
                <Input placeholder="Add Post Title" min={0} />
              </Form.Item>
              <Form.Item
                name="post_caption"
                required
                label="Description"
                className="dropdown-form-item"
                rules={[
                  {
                    required: true,
                    message: 'Add Caption!',
                  },
                ]}
              >
                <TextArea placeholder="Write Description here" style={{ width: '470px', height: 80 }} min={0} />
              </Form.Item>

              <PostTags allTags={allTags} setAllTags={setAllTags} />
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item
                    name="cta"
                    required
                    label="CTA"
                    rules={[
                      ({ getFieldValue }) => ({
                        validator(_, value) {
                          const link = getFieldValue('link');
                          if (link && !value) {
                            return Promise.reject('Enter CTA');
                          }
                          return Promise.resolve();
                        },
                      }),
                    ]}
                    className="buyerrow-form__space--text"
                    style={{ marginLeft: '17px' }}
                  >
                    <Input placeholder="Ex. Book Now" style={{ width: '90%' }} min={0} />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name="link"
                    label="Link"
                    rules={[
                      ({ getFieldValue }) => ({
                        validator(_, value) {
                          const buttonCTA = getFieldValue('cta');
                          if (buttonCTA && !value) {
                            return Promise.reject('Enter Website Link');
                          }
                          return Promise.resolve();
                        },
                      }),
                      {
                        message: 'Please enter valid url.',
                        pattern:
                          '^((http|https)://)[-a-zA-Z0-9@:%._\\+~#?&//=]{2,256}\\.[a-z]{2,6}\\b([-a-zA-Z0-9@:%._\\+~#?&//=]*)$',
                      },
                    ]}
                    className="buyerrow-form__space--text"
                  >
                    <Input placeholder="http://" style={{ width: ' 95%' }} min={0} />
                  </Form.Item>
                </Col>
              </Row>
            </Col>
          </Row>
        </div>
      </Form>
    </div>
  );
};

export default GenericPostForm;

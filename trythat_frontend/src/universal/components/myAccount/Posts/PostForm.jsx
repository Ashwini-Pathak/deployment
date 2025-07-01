import { FileOutlined, LoadingOutlined, UploadOutlined } from '@ant-design/icons';
import { Button, Col, Flex, Form, Input, Row, Spin, Typography, Upload, message } from 'antd';
import React, { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { socialAppCreatePost, uploadPostImage } from '../../../features/socialAppSlice';
import PostTags from '../../socialApp/posts/addPostForms/GenericPostForm/common/PostTags';
import './PostForm.scss';

const PostForm = ({ setShowForm, setActiveTab, isCompany, postRel = '' }) => {
  // hooks
  const dispatch = useDispatch();
  const { Text } = Typography;
  const { TextArea } = Input;

  // states
  const companyId = useSelector((state) => state.user?.userV2?.companyDetails?.companyId);
  const userId = useSelector((state) => state.user?.user?.id);

  // form derails
  const [formDetails] = Form.useForm();

  // states
  const [loader, setLoader] = useState(false);
  const [imgLoader, setImageloader] = useState(false);
  const [allTags, setAllTags] = useState([]);
  const [imgUrls, setImgUrls] = useState([]);
  const [imgNames, setImgNames] = useState([]);

  // handle image upload
  const handleUpload = async (file) => {
    const formData = new FormData();
    formData.append('files', file);
    setImageloader(true);
    dispatch(uploadPostImage(formData))?.then((res) => {
      setImageloader(false);
      message.success(`${file?.name} uploaded successfuly...`);
      if (res?.payload?.data?.response?.data) {
        setImgNames((prev) => [...(prev || []), file?.name]);
        setImgUrls((prev) => [...(prev || []), ...(res?.payload?.data?.response?.data || [])]);
      }
    });
  };

  // handle submit
  const handleFormSubmit = (e) => {
    const createPostPayload = {
      type: 'generic_card',
      title: e?.post_title || '',
      body: e?.post_caption,
      tags: allTags?.length > 0 ? allTags : undefined,
      CTA: { name: e?.cta, link: e?.link },
      imageUrls: imgUrls,
      ownerType: postRel,
      ownerId: postRel === 'company_post' ? companyId : userId,
    };
    setLoader(true);
    dispatch(socialAppCreatePost(createPostPayload))?.then((res) => {
      setLoader(false);
      if (res?.payload?.data?.response) {
        message.success('Post created successfuly...');
        setActiveTab(isCompany ? 'COMPANY_POST' : 'MY_POST');
        setShowForm(false);
      } else {
        message.error('Some error occured...');
      }
    });
  };

  return (
    <Form style={{ paddingTop: 20 }} layout="vertical" form={formDetails} onFinish={handleFormSubmit}>
      <div style={{ marginTop: 10 }}>
        <Form.Item required label="Add Post Title" className="dropdown-form-item">
          <Flex gap="middle" horizontal>
            <Form.Item
              name="post_title"
              className="buyerrow-form__space--text"
              rules={[
                {
                  required: true,
                  message: 'Add Post Title!',
                },
              ]}
            >
              <Input placeholder="Add Post Title" min={0} />
            </Form.Item>
          </Flex>
        </Form.Item>
        <Form.Item required label="Add Caption" className="dropdown-form-item">
          <Flex gap="middle" horizontal>
            <Form.Item
              name="post_caption"
              className="buyerrow-form__space--text"
              rules={[
                {
                  required: true,
                  message: 'Add Caption!',
                },
              ]}
            >
              <TextArea placeholder="Write Caption here" style={{ height: 80 }} min={0} />
            </Form.Item>
          </Flex>
        </Form.Item>
        <Row>
          <PostTags allTags={allTags} setAllTags={setAllTags} />
        </Row>
        <Row gutter={24}>
          <Col span={12}>
            <Form.Item className="dropdown-form-item" label="CTA">
              <Flex gap="middle" horizontal>
                <Form.Item
                  dependencies={['link']}
                  name="cta"
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
                >
                  <Input placeholder="CTA" min={0} />
                </Form.Item>
              </Flex>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Link" className="dropdown-form-item">
              <Flex gap="middle" horizontal>
                <Form.Item
                  name="link"
                  dependencies={['cta']}
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
                  <Input placeholder="https://" min={0} />
                </Form.Item>
              </Flex>
            </Form.Item>
          </Col>
        </Row>
        <Form.Item label="Upload Image" name="imageURL" className="dropdown-form-item">
          <div className="d-flex g-20" style={{ paddingLeft: '20px', marginBottom: '20px' }}>
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
                  {' '}
                  <UploadOutlined style={{ fontSize: 28, paddingBottom: '1rem' }} /> <Text>Upload Image</Text>
                </>
              )}
            </Upload>
            <div className="d-flex d-column g-5" style={{ marginTop: '20px', maxHeight: '200px', overflow: 'scroll' }}>
              {imgNames?.map((elem, index) => (
                <span className="fontBlue" key={index}>
                  <FileOutlined /> {elem}
                </span>
              ))}
            </div>
          </div>
        </Form.Item>
        <Row className="d-flex jc-end ">
          <div className="d-flex jc-end g-20 ">
            <Button type="primary" ghost onClick={() => setShowForm(false)}>
              Reset
            </Button>
            <Button htmlType="submit" loader={loader} type="primary">
              Create Post
            </Button>
          </div>
        </Row>
      </div>
    </Form>
  );
};

export default PostForm;

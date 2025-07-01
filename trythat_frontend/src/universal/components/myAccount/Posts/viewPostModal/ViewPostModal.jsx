import React from 'react';
import GenericPost from '../../../socialApp/posts/allPosts/genericPost/GenericPost';
import ViewPostHeader from './ViewPostHeader';
import ViewPostFooter from './ViewPostFooter';
import { Modal } from 'antd';
import './viewPostModal.scss';
import { CloseCircleFilled } from '@ant-design/icons';
const ViewPostModal = ({ postData, isCompany, setPostData }) => {
  const postTypes = {
    generic_card: GenericPost,
  };
  const Post = postTypes?.[postData?.type];
  return (
    <div className="viewPostModal">
      <Modal
        centered
        style={{ maxWidth: 900 }}
        footer={null}
        width={700}
        closeIcon={<CloseCircleFilled className="closeIcon" />}
        open={postData}
        onCancel={() => setPostData(null)}
        maskClosable
      >
        <div className="viewPost  d-flex d-column g-20">
          <ViewPostHeader isCompany />
          <Post postDetails={postData} />
          {/* <ViewPostFooter /> */}
        </div>
      </Modal>
    </div>
  );
};

export default ViewPostModal;

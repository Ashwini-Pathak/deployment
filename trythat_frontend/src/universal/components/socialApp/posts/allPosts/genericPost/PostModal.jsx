// PostModal.jsx
import { Modal } from 'antd';
import React from 'react';
import AllPosts from '../AllPosts';
// import GenericPost from '../allPosts/genericPost/GenericPost';

const PostModal = ({  postDetails }) => {
  return (
    <Modal
      title="Post Details"
    //   visible={isModalVisible}
    //   onCancel={handleCancel}
      footer={null}
      width={600} // Adjust width as needed
    >
      <AllPosts postDetails={postDetails} />
    </Modal>
  );
};

export default PostModal;

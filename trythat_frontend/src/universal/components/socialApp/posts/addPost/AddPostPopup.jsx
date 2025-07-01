import { CloseOutlined } from '@ant-design/icons';
import { Modal } from 'antd';
import React, { useState } from 'react';
import GenericPostForm from '../addPostForms/GenericPostForm/GenericPostForm';
import { createPostTypes } from './posts.utils';
import './socialAppPost.scss';
const AddPostPopup = ({ open, closePopup }) => {
  // states

  const [selectedPopup, setSelectedPopup] = useState(null);
  const [showForm, setShowForm] = useState(null);

  const handleCardClick = (key) => {
    setSelectedPopup(key);
    setShowForm(true);
  };
  return (
    <Modal
      onCancel={() => {
        closePopup();
        setShowForm(false);
        setSelectedPopup(null);
      }}
      width={850}
      closeIcon={<CloseOutlined className="closeIcon" />}
      footer={null}
      open={open}
      centered
      className="selectPostModal"
    >
      <div className="addPostPopup">
        {!showForm ? (
          <>
            <div className="addPostPopupHeader">
              <span className="headerText">Select Post Type:</span>
              <span className="subheaderText">Please Select the respective post tile to create a post.</span>
            </div>
            <div className="addPostPopupBody">
              {createPostTypes?.map((card, index) => {
                const Icon = card?.icon;
                return (
                  <div className={` ${card?.disabled ? 'disabled' : ''}`}>
                    <div
                      onClick={() => handleCardClick(card?.key)}
                      key={index}
                      className={`postTypeCard  ${selectedPopup == card?.key ? 'selected' : ''}`}
                    >
                      {Icon && <img src={Icon} alt={card?.label} height="80px" width="80px" />}
                    </div>
                    <span className="postLabel">{card?.label}</span>
                  </div>
                );
              })}
            </div>
          </>
        ) : (
          <>
            <div className="addPostPopupBody">
              <GenericPostForm description={'Select post type'} closePopup={closePopup} setShowForm={setShowForm} />
            </div>
          </>
        )}
      </div>
    </Modal>
  );
};

export default AddPostPopup;

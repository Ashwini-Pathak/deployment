import React from 'react';
import { Avatar, Progress, Upload } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import verifiedIcon from '../../../assets/images/verified.png';
import editImgIcon from '../../../assets/images/editImg.png';
import { useDispatch, useSelector } from 'react-redux';
import { uploadUserImage } from '../../features/myAccountSlice';

const UserImage = ({ userImage, isVerified, completionPercentage, isFormEditable, user }) => {
  const dispatch = useDispatch();
  const { userImgUrl } = useSelector((state) => state.user);

  const handleUpload = async (file) => {
    const formData = new FormData();
    formData.append('file', file);

    dispatch(uploadUserImage(formData));
  };

  return (
    <div style={{ display: 'inline-block', position: 'relative', marginBottom: '20px', textAlign: 'center' }}>
      <Avatar
        size={95}
        src={userImgUrl || user?.personalDetails?.imageUrl}
        icon={<UserOutlined />}
        style={{ borderRadius: '50%', top: '10px' }}
      />
      {isVerified && !isFormEditable ? (
        <div
          style={{
            position: 'absolute',
            bottom: '-28px',
            left: '5px',
            borderRadius: '50%',
            zIndex: 1,
          }}
        >
          <img src={verifiedIcon} alt="verified" style={{ width: '25px' }} />
        </div>
      ) : (
        <div
          style={{
            position: 'absolute',
            bottom: '-17px',
            borderRadius: '50%',
            zIndex: 1,
            right: '7px',
            boxShadow: '0px 3px 6px #00000029',
            background: '#FFFFFF 0% 0% no-repeat padding-box',
            border: '1px solid white',
            padding: '3px',
          }}
        >
          <Upload maxCount={1} customRequest={({ file }) => handleUpload(file)} showUploadList={false}>
            <img src={editImgIcon} alt="verified" style={{ width: '16px', verticalAlign: 'middle' }} />
          </Upload>
        </div>
      )}
      {!isFormEditable && (
        <div
          style={{
            position: 'absolute',
            top: '10px',
            left: '0',
            width: '100%',
            height: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Progress type="circle" percent={completionPercentage} showInfo={false} strokeColor="#0081FC" />
          <div
            style={{
              position: 'absolute',
              top: '0%',
              right: '-30%',
              transform: 'translate(-50%, -50%)',
              fontSize: '10px',
              color: '#0081FC',
            }}
            className="progress-text"
          >
            {completionPercentage}%
          </div>
        </div>
      )}
    </div>
  );
};

export default UserImage;

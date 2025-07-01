import { UserOutlined, WarningOutlined } from '@ant-design/icons';
import { Avatar } from 'antd';
import React from 'react';
import { useSelector } from 'react-redux';
const ViewPostHeader = ({ postDetails, isCompany }) => {
  const user = useSelector((state) => state?.user?.user);

  return (
    <div className="d-flex jc-between ">
      <span className="d-flex g-10 a-center ">
        <Avatar src={!isCompany && user?.personalDetails?.imageUrl} icon={<UserOutlined />} />
        <div className="d-flex d-column">
          <span className="font14 font700 fontdark ">{postDetails?.ownerDetails?.name}</span>
          <span className="font14 fontExtraLight ">{postDetails?.ownerDetails?.professionalDetails?.designation}</span>

          {isCompany ? (
            <div className="d-flex d-column">
              <span className="font14 font700 fontdark ">{user?.professionalDetails?.companyName}</span>
              {user?.professionalDetails?.desingation && (
                <span className="font14 fontExtraLight ">{user?.professionalDetails?.desingation}</span>
              )}
            </div>
          ) : (
            <div className="d-flex d-column">
              <span className="font14 font700 fontdark ">{user?.name}</span>
              {user?.professionalDetails?.designation && (
                <span className="font14 fontExtraLight ">{user?.professionalDetails?.designation}</span>
              )}
            </div>
          )}
        </div>
      </span>
    </div>
  );
};

export default ViewPostHeader;

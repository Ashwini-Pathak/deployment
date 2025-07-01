import { Progress, Space } from 'antd';
import React from 'react';
import './profileCompletionProgress.scss';

const ProfileCompletion = ({ label, completion, points }) => {
  return (
    <Space direction="vertical" className='profilecompletionprogress'>
      <Progress className='profilecompletionprogress-progress'
        
        // size="small"
        percent={completion}
        showInfo={false}
        strokeColor="#0081FC"
      />
      <small  className='profilecompletionprogress-color'>
        {label} : {completion === 100 ? 50 : 0} points
      </small>
    </Space>
  );
};

export default ProfileCompletion;

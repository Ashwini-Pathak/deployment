import React, { useEffect } from 'react';
import { message } from 'antd';
import { useDispatch } from 'react-redux';
import { disable_toast } from '../../features/toastSlice';

const Toast = ({ _toast }) => {
  const [messageApi, contextHolder] = message.useMessage();
  const dispatch = useDispatch();
  const display = () => {
    messageApi.open({
      type: _toast.type,
      content: _toast.content,
    });
  };

  useEffect(() => {
    if (!_toast.show) return;
    display();
    setTimeout(() => {
      dispatch(disable_toast());
    }, 3000);
  }, [_toast.show]);
  return <>{contextHolder}</>;
};

export default Toast;

import React from 'react';
import './common.scss';
import { Button } from 'antd';
const CommonButton = ({
  children,
  ghost = false,
  className = '',
  style = {},
  onClick = () => {},
  type = 'primary',
  disabled,
  htmlType,
  loader,
  ...props
}) => {
  return (
    <Button
      htmlType={htmlType}
      disabled={disabled || loader}
      ghost={ghost}
      loading={loader}
      onClick={onClick}
      style={style}
      className={` buttomStyle ${className}`}
      type={type}
      {...props}
    >
      {children}
    </Button>
  );
};

export default CommonButton;

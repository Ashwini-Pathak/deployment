import React, { useState } from 'react';
import { Form, Input } from 'antd';

const CustomFormItem = ({ name, initialValue, onBlur, ...rest }) => {
  const [value, setValue] = useState(initialValue);

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const handleBlur = () => {
    onBlur({ [name]: value }); // Trigger onValuesChange with the updated value
  };

  return (
    <Form.Item name={name}>
      <Input {...rest} value={value} onChange={handleChange} onBlur={handleBlur} />
    </Form.Item>
  );
};

export default CustomFormItem;

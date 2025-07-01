import { PlusCircleFilled } from '@ant-design/icons';
import { Button, Flex, Form, Input, Row, Space } from 'antd';
import React, { useState } from 'react';
import MultiplePostTags from './MultiplePostTags';
// import './common.scss';

const PostTags = ({ allTags, setAllTags }) => {
  const [value, setValue] = useState([]);

  const onAddTag = () => {
    setValue('');
    setAllTags((prev) => [...prev, value]);
  };
  return (
    <Form.Item label="Tags" className="dropdown-form-item">
      <Flex gap="middle" horizontal>
        <Form.Item>
          <Input
            value={value}
            prefix="#"
            placeholder="Add Tags"
            suffix={value?.length > 0 ? <PlusCircleFilled onClick={onAddTag} /> : ''}
            onChange={(newValue) => {
              setValue(newValue?.target?.value);
            }}
          />
        </Form.Item>
      </Flex>

      <div>
        <MultiplePostTags allTags={allTags} setAllTags={setAllTags} value={allTags} />
      </div>
    </Form.Item>
  );
};

export default PostTags;

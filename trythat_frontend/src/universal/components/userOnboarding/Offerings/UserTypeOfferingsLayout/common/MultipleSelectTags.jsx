import { Form, Space, Tag, Typography } from 'antd';
import { isEmpty } from 'lodash';

import React, { useEffect, useState } from 'react';
const { CheckableTag } = Tag;

const MultipleSelectTags = ({ onChange, value = '', tagsData = [], otherRequirementName = '' }) => {
  const [selectedTags, setSelectedTags] = useState(value);
  const [alltags, setAllTags] = useState();
  const handleChange = (tag, checked) => {
    const nextSelectedTags = checked ? [...(selectedTags || []), tag] : selectedTags.filter((t) => t !== tag);
    setSelectedTags(nextSelectedTags);
    if (typeof onChange === 'function') {
      // <-- BE VERY CAREFULL WITH THIS OPERATION
      onChange(nextSelectedTags);
    }
  };

  // ----setting tag data----
  useEffect(() => {
    setAllTags(tagsData);
  }, [tagsData]);

  useEffect(() => {
    if (isEmpty(value)) return;
    setSelectedTags(value);
  }, [value]);

  return (
    <>
      <Space wrap>
        {alltags?.map((tag) => (
          <CheckableTag
            style={{
              background: selectedTags?.includes(tag) ? '#003fab' : '#DEF0FF',
              borderRadius: '100px',
              color: '#548AD3',
              paddingLeft: '30px',
              paddingRight: '30px',
              cursor: 'pointer',
              color: selectedTags?.includes(tag) ? 'white' : '#548AD3',
            }}
            key={tag}
            checked={selectedTags?.includes(tag)}
            onChange={(checked) => handleChange(tag, checked)}
          >
            {tag}
          </CheckableTag>
        ))}
      </Space>
      {selectedTags?.includes('Any Other') && (
        <Form.Item
          style={{ marginTop: 10 }}
          label="Any other"
          name={otherRequirementName}
          rules={[
            {
              required: true,
              message: 'Enter value',
            },
          ]}
        >
          <input name={otherRequirementName} />
        </Form.Item>
      )}
    </>
  );
};

export default MultipleSelectTags;

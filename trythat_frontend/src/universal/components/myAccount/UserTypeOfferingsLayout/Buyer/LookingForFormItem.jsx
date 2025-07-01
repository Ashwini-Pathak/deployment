import React, { useEffect, useState } from 'react';
import { Space, Tag } from 'antd';
import { isEmpty } from 'lodash';
const { CheckableTag } = Tag;
const tagsData = ['Resendential', 'Commercial'];

const LookingForFormItem = ({ value = [], onChange }) => {
  const [selectedTags, setSelectedTags] = useState(value);
  const handleChange = (tag, checked) => {
    const nextSelectedTags = checked ? [...selectedTags, tag] : selectedTags.filter((t) => t !== tag);
    setSelectedTags(nextSelectedTags);
    // BE VERY CAREFULL WITH THIS OPERATION
    if (typeof onChange === 'function') {
      onChange(nextSelectedTags);
    }
  };
  useEffect(() => {
    if (isEmpty(value)) return;
    setSelectedTags(value);
  }, [value]);
  return (
    <>
      <Space wrap>
        {tagsData.map((tag) => (
          <CheckableTag
            style={{
              background: selectedTags.includes(tag) ? '#003fab' : '#DEF0FF',
              borderRadius: '100px',
              paddingLeft: '30px',
              paddingRight: '30px',
              cursor: 'pointer',
              color: selectedTags.includes(tag) ? 'white' : '#548AD3',
            }}
            key={tag}
            checked={selectedTags.includes(tag)}
            onChange={(checked) => handleChange(tag, checked)}
          >
            {tag}
          </CheckableTag>
        ))}
      </Space>
    </>
  );
};

export default LookingForFormItem;

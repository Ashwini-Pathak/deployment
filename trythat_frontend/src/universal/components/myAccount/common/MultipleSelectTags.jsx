import { Form, Space, Tag } from 'antd';

import React, { useEffect, useState } from 'react';
const { CheckableTag } = Tag;

const MultipleSelectTags = ({ onChange, value = [], tagsData = [] }) => {
  const [selectedTags, setSelectedTags] = useState([]);
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
    setSelectedTags(value);
  }, [value]);

  return (
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
  );
};

export default MultipleSelectTags;

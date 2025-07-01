import { Space, Tag } from 'antd';
import { isEmpty } from 'lodash';
import React, { useEffect, useState } from 'react';
const { CheckableTag } = Tag;
const tagsData = ['Yes', 'No'];

const OpenToBrokerForm = ({ value = [], onChange }) => {
  const [selectedTags, setSelectedTags] = useState(value);
  const handleChange = (tag, checked) => {
    const nextSelectedTags = [tag];
    setSelectedTags(nextSelectedTags);
    if (typeof onChange === 'function') {
      // <-- BE VERY CAREFULL WITH THIS OPERATION
      onChange(nextSelectedTags);
    }
  };

  // setting pre filled value
  useEffect(() => {
    setSelectedTags(value);
  }, [value]);
  return (
    <>
      <Space wrap>
        {tagsData.map((tag) => (
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
    </>
  );
};

export default OpenToBrokerForm;

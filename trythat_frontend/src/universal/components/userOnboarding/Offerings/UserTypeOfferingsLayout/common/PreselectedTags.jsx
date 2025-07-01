import { CloseCircleFilled } from '@ant-design/icons';
import { Form, Space, Tag, Typography } from 'antd';
import { isEmpty } from 'lodash';

import React, { useEffect, useState } from 'react';
const { CheckableTag } = Tag;

const PreselectedTags = ({ onChange, value = [], tagsData = [], setTagData = [] }) => {
  const [selectedTags, setSelectedTags] = useState(value);
  const [alltags, setAllTags] = useState(tagsData);
  const handleChange = (tag, checked) => {
    const nextSelectedTags = alltags.filter((t) => t !== tag);
    setTagData(nextSelectedTags);
    setAllTags(nextSelectedTags);
    if (typeof onChange === 'function') {
      // <-- BE VERY CAREFULL WITH THIS OPERATION
      onChange(nextSelectedTags);
    }
  };

  // ----setting tag data----
  useEffect(() => {
    setAllTags(tagsData);
  }, [tagsData]);

  // useEffect(() => {
  //   setAllTags(value);
  // }, [value]);

  return (
    <Space wrap>
      {alltags?.map((tag) => (
        <CheckableTag
          style={{
            background: '#003fab',
            borderRadius: '100px',
            color: '#548AD3',
            paddingLeft: '30px',
            paddingRight: '30px',
            cursor: 'pointer',
            color: 'white',
          }}
          key={tag}
          checked
          onChange={(checked) => handleChange(tag, checked)}
        >
          {tag} <CloseCircleFilled style={{ marginLeft: 10 }} />
        </CheckableTag>
      ))}
    </Space>
  );
};

export default PreselectedTags;

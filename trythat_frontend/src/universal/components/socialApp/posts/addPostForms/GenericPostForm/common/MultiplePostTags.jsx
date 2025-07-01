import { CloseCircleFilled } from '@ant-design/icons';
import { Space, Tag } from 'antd';

import React from 'react';
const { CheckableTag } = Tag;

const MultiplePostTags = ({ allTags, setAllTags }) => {
  const handleChange = (tag, checked) => {
    const nextSelectedTags = checked ? [...allTags, tag] : allTags.filter((t) => t !== tag);
    setAllTags(nextSelectedTags);
  };

  return (
    <Space wrap>
      {allTags?.map((tag) => (
        <CheckableTag style={{
          background: allTags?.find((elem) => elem?.type == tag?.type) ? '#003fab' : '#DEF0FF',
          color: allTags?.find((elem) => elem?.type == tag?.type) ? 'white' : '#548AD3',
        }}
          className="languageTag" key={tag} checked onChange={(checked) => handleChange(tag, checked)}>
          #{tag}
          <CloseCircleFilled className="ml-15" />
        </CheckableTag>
      ))}
    </Space>
  );
};

export default MultiplePostTags;

import { CloseCircleFilled } from '@ant-design/icons';
import { Space, Tag } from 'antd';
import { isEmpty } from 'lodash';

import React, { useEffect, useState } from 'react';
const { CheckableTag } = Tag;

const LocationTags = ({ onChange, value = [], tagsData = [] }) => {
  const [alltags, setAllTags] = useState();
  const handleChange = (tag, checked) => {
    const nextSelectedTags = checked ? [...alltags, tag] : alltags.filter((t) => t?.label !== tag);
    setAllTags(nextSelectedTags);
    if (typeof onChange === 'function') {
      // <-- BE VERY CAREFULL WITH THIS OPERATION
      onChange(nextSelectedTags);
    }
  };
  useEffect(() => {
    setAllTags([]);
  }, []);

  useEffect(() => {
    setAllTags(value);
  }, [value]);

  return (
    <Space wrap>
      {alltags?.map((tag) => (
        <CheckableTag
          className="languageTag"
          key={tag?.label}
           style={{
              background: alltags?.find((elem) => elem?.type == tag?.type) ? '#003fab' : '#DEF0FF',
              color: alltags?.find((elem) => elem?.type == tag?.type) ? 'white' : '#548AD3',
            }}
          checked
          onChange={(checked) => handleChange(tag?.label, checked)}
        >
          {tag?.label}
          <CloseCircleFilled className="ml-15" />
        </CheckableTag>
      ))}
    </Space>
  );
};

export default LocationTags;

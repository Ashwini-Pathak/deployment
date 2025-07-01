import { CloseCircleFilled } from '@ant-design/icons';
import { Space, Tag } from 'antd';
import { isEmpty } from 'lodash';

import React, { useEffect, useState } from 'react';
const { CheckableTag } = Tag;

const LocationTags = ({ onChange, value = [], tagsData = [] }) => {
  const [alltags, setAllTags] = useState();

 const handleClose = (removedTag) => {
    const newTags = alltags.filter((tag) => tag?.label !== removedTag?.label);
   setAllTags(newTags);
    if (typeof onChange === 'function') {
      // <-- BE VERY CAREFULL WITH THIS OPERATION
      onChange(newTags);
    }
  };

  useEffect(() => {
    setAllTags([]);
  }, []);

  useEffect(() => {
    if (isEmpty(value)) {
    } else {
      setAllTags(value);
    }
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
        >
          {tag?.label}
          <CloseCircleFilled onClick={()=>handleClose(tag)} className="ml-15" />
        </CheckableTag>
      ))}
    </Space>
  );
};

export default LocationTags;

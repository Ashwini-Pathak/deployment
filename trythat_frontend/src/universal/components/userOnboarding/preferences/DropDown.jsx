import { PlusOutlined } from '@ant-design/icons';
import { Button, Dropdown } from 'antd';
import { isEmpty } from 'lodash';
import React, { useEffect } from 'react';

const DropDown = ({ options = [], name, value = [], allTags = [], onChange, setterFunc, onOpenChange }) => {
  const onTagsMenuClick = (tags, dataSetter) => {
    const tag = tags?.key;
    let returnval;
    const data = allTags?.includes(tag) ? allTags?.filter((elem) => elem !== tag) : [...allTags, tag];
    dataSetter((prev) => {
      if (prev?.includes(tag)) returnval = prev?.filter((elem) => elem !== tag);
      else returnval = [...prev, tag];
      return returnval;
    });
    if (typeof onChange === 'function') {
      // <-- BE VERY CAREFULL WITH THIS OPERATION
      onChange(data);
    }
  };

  useEffect(() => {
    if (isEmpty(value)) return;
    setterFunc(value);
  }, [value]);

  return (
    <Dropdown
      onOpenChange={onOpenChange}
      name={name}
      trigger="click"
      className="preferences-container__space--addTag"
      menu={{ items: options, value: allTags, onClick: (e) => onTagsMenuClick(e, setterFunc) }}
      placement="bottomLeft"
    >
      <Button>
        <PlusOutlined /> Add Tag
      </Button>
    </Dropdown>
  );
};

export default DropDown;

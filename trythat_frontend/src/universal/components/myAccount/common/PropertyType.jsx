import { Form, Input, Space, Tag } from 'antd';
import React, { useEffect, useState } from 'react';
const { CheckableTag } = Tag;

const PropertyType = ({ value = [], onChange, otherRequirementName }) => {
  // Tags data
  const tagsData = [
    { type: 'Office space', text: 'Office space' },
    { type: 'Resendential', text: 'Resendential' },
    { type: 'Any Other', text: null },
  ];
  // States
  const [selectedTags, setSelectedTags] = useState(value);

  // handleChange
  const handleChange = (tag, checked) => {
    const nextSelectedTags = checked ? [...selectedTags, tag] : selectedTags.filter((t) => t?.type !== tag?.type);
    setSelectedTags(nextSelectedTags);
    if (typeof onChange === 'function') {
      onChange(nextSelectedTags);
    }
  };
  // onChangeOtherLocation
  const onChangeOtherLocation = (e) => {
    const updatedLocation = selectedTags?.map((elem) => {
      if (elem?.type == 'Any Other') {
        elem = { ...elem, text: e.target.value };
      }
      return elem;
    });
    setSelectedTags(updatedLocation);
    if (typeof onChange === 'function') {
      onChange(updatedLocation);
    }
  };

  {
    /* ------pre filled value----- */
  }
  useEffect(() => {
    setSelectedTags(value);
  }, [value]);

  return (
    <>
      <Space wrap>
        {tagsData.map((tag) => (
          <CheckableTag
            style={{
              background: selectedTags?.find((elem) => elem?.type == tag?.type) ? '#003fab' : '#DEF0FF',
              borderRadius: '100px',
              paddingLeft: '30px',
              paddingRight: '30px',
              cursor: 'pointer',
              color: selectedTags?.find((elem) => elem?.type == tag?.type) ? 'white' : '#548AD3',
            }}
            key={tag?.type}
            checked={selectedTags?.find((elem) => elem?.type == tag?.type)}
            onChange={(checked) => handleChange(tag, checked)}
          >
            {tag?.type}
          </CheckableTag>
        ))}
      </Space>
      {selectedTags?.find((elem) => elem?.type == 'Any Other') && (
        <Form.Item
          style={{ marginTop: 10 }}
          label="Any other"
          name={otherRequirementName}
          rules={[
            {
              required: true,
              message: 'Enter Other property type',
            },
          ]}
        >
          <Input style={{ padding: 5 }} className="form-placeholder" onChange={onChangeOtherLocation} />
        </Form.Item>
      )}
    </>
  );
};

export default PropertyType;

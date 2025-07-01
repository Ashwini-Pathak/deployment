import { CloseCircleFilled } from '@ant-design/icons';
import { Form, Row, Space, Tag, Typography } from 'antd';
import React, { useMemo, useRef, useState } from 'react';
import { Select, Spin } from 'antd';
import debounce from 'lodash/debounce';
import { nanoid } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';
import client from '../../../../../utils/apiClient';
import './broker.scss';

function DebounceSelect({ fetchOptions, debounceTimeout = 800, ...props }) {
  const [fetching, setFetching] = useState(false);
  const [options, setOptions] = useState([]);
  const fetchRef = useRef(0);
  const debounceFetcher = useMemo(() => {
    const loadOptions = (value) => {
      fetchRef.current += 1;
      const fetchId = fetchRef.current;
      setOptions([]);
      setFetching(true);
      fetchOptions(value).then((newOptions) => {
        if (fetchId !== fetchRef.current) {
          // for fetch callback order
          return;
        }
        setOptions(newOptions);
        setFetching(false);
      });
    };
    return debounce(loadOptions, debounceTimeout);
  }, [fetchOptions, debounceTimeout]);
  return (
    <Select
      labelInValue
      filterOption={false}
      onSearch={debounceFetcher}
      notFoundContent={fetching ? <Spin size="small" /> : null}
      {...props}
      options={options}
    />
  );
}

// Usage of DebounceSelect
async function fetchUserList(query, userId) {
  try {
    const response = await client.get(
      `${process.env.REACT_APP__BACKEND_API_URL}/user/${userId}/geo-location?query=${query}`,
    );
    return await response.data.response.data.locationDetails.map((el) => {
      return { label: el, value: el };
    });
  } catch (err) {
    console.error(err);
  }
}

const Location = ({
  label = 'My property is located in',
  title = 'Location',
  placeholder = 'Search preferred city',
}) => {
  const { Text } = Typography;
  const [value, setValue] = useState([]);
  const { user } = useSelector((store) => store.user);

  return (
    <Row>
      <div className='brokerrow'
        
      >
        <Form.Item label={title}  className='brokerrow-form'>
          <Space className='brokerrow-form__space'>
            <Text className='brokerrow-form__space--label' >{label}</Text>
            <Form.Item
              name="broker_location"
              rules={[
                {
                  required: true,
                  message: 'Select a Location',
                },
              ]}
            >
              <DebounceSelect
                 className='brokerrow-form__space--select'
                mode="multiple"
                value={value}
                style={{ width: '400px' }}
                placeholder={placeholder}
                fetchOptions={(e) => {
                  return fetchUserList(e, user.id);
                }}
                onChange={(newValue) => {
                  setValue(newValue);
                }}
              />
            </Form.Item>
          </Space>
          <div className='brokerrow-form__location' >
            {value.map((el) => {
              return (
                <Tag
                  key={nanoid()}
                  // closeIcon={
                  //   <CloseCircleFilled
                  //     onClick={() => {
                  //       setValue(
                  //         value.filter((e) => {
                  //           if (e.label !== el.label) return el;
                  //         }),
                  //       );
                  //     }}
                  //     style={{ color: 'white', marginLeft: '8px' }}
                  //   />
                  // }
                  color="#0081FC"
                  className='brokerrow-form__location--items'
              
                >
                  <Text className='item-text'>{el?.label}</Text>
                </Tag>
              );
            })}
          </div>
        </Form.Item>
      </div>
    </Row>
  );
};

export default Location;

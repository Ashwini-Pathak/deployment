import { Form, Row, Select, Space, Spin, Typography } from 'antd';
import debounce from 'lodash/debounce';
import React, { useMemo, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { client } from '../../../../../../utils/apiClient';
import LocationTags from './LocationTags';
import './common.scss';

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
  name,
  value,
}) => {
  const { Text } = Typography;
  const [userOfferings] = Form.useForm();
  const [values, setValues] = useState([]);
  const { user } = useSelector((store) => store.user);
  console.log(userOfferings.getFieldValue(name));

  return (
    <Row>
      <div className="commonrow">
        <Form.Item required label={title} className="commonrow-form">
          <Space className="commonrow-form__space">
            <Text className="commonrow-form__space--locationtext">{label}</Text>
            <Form.Item
              name={name}
              rules={[
                {
                  required: true,
                  message: 'Select a Location',
                },
              ]}
            >
              <DebounceSelect
                mode="multiple"
                tagRender={() => {}}
                value={values}
                style={{ width: '400px' }}
                placeholder={placeholder}
                fetchOptions={(e) => {
                  return fetchUserList(e, user.id);
                }}
                onChange={(newValue) => {
                  setValues(newValue);
                  userOfferings.setFieldValue(name, newValue);
                }}
              />
            </Form.Item>
          </Space>
          <div className="commonrow-form__location">
            <Form.Item name={name}>
              <LocationTags />
            </Form.Item>
          </div>
        </Form.Item>
      </div>
    </Row>
  );
};

export default Location;

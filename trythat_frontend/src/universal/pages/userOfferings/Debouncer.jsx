import React, { useMemo, useRef, useState } from 'react';
import { Select, Spin } from 'antd';
import debounce from 'lodash/debounce';
import { client } from '../../../utils/apiClient';
import { useSelector } from 'react-redux';
import axios from 'axios';

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

const Debouncer = ({ coordinates, setCoordinates, setLocationName = { setLocationName } }) => {
  const [value, setValue] = useState([]);
  const { user } = useSelector((store) => store.user);

  const getLatLng = (newValue) => {
    const response = axios.get(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${newValue.key}&key=AIzaSyA3Tk_EfiNzav4m-qtRxYgfCa18EwsVJGI`,
    );
    response.then((data) => {
      setCoordinates(data?.data?.results?.[0]?.geometry?.location);
    });
  };

  return (
    <DebounceSelect
      showSearch
      value={value}
      style={{ maxWidth: '554px', width: '100%', marginBottom: '20px', marginTop: '20px' }}
      placeholder={'Search for a location'}
      fetchOptions={(e) => {
        return fetchUserList(e, user.id);
      }}
      onChange={(newValue) => {
        setLocationName(newValue?.key);
        getLatLng(newValue);
        setValue(newValue);
      }}
    />
  );
};

export default Debouncer;

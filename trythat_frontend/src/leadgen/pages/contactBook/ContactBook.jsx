import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Switch, Modal, Rate, Input, Tabs, Form } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import {
  getContactBookData,
  getContactBookDataThroughSearch,
  getContactBookStats,
  postContactFeedback,
  setFeedbackModalVisible,
  setSearchInputValue,
} from '../../features/contactBookSlice.js';
import useDebounce from '../../../utils/useDebounce.js';

import './contactBook.scss';
import TabsPane from './tabsPane/TabsPane.jsx';
const { TabPane } = Tabs;
const { Search } = Input;

const ContactBook = () => {
  const { TextArea } = Input;
  const [form] = Form.useForm();
  const [switchLoader, setSwitchLoader] = useState(false);
  const [propertyType, setPropertyType] = useState(true);
  const [currentTabItem, setCurrentTabItem] = useState('recentlyAdded');
  const [currentTabPans, setCurrentTabPans] = useState([]);
  const [currentTabHeaders, setCurrentTableHeaders] = useState([]);
  const [selectedRow, setSelectedRow] = useState();
  const [pagination, setPagination] = useState({ current: 1, pageSize: 10 });

  const dispatch = useDispatch();
  const { contactBookData, contactBookStats, feedbackModalVisible, searchInputValue } = useSelector(
    (store) => store.contactBook,
  );

  const TAB_CONSTANTS = {
    commercial: Object.freeze({
      0: 'recentlyAdded',
      1: 'all',
      2: 'organization',
      3: 'connects',
      4: 'properties',
    }),
    residential: Object.freeze({
      0: 'recentlyAdded',
      1: 'properties',
    }),
  };

  const commercialTableHeaders = [
    { title: 'Name', key: 'name', dataIndex: 'name' },
    { title: 'Mobile No', key: 'mobileNumber', dataIndex: 'phone' },
    {
      title: 'E-Mail',
      key: 'email',
      dataIndex: 'email',
    },
    { title: 'Industry', key: 'industry', dataIndex: 'industry' },
    { title: 'Type', key: 'typeOfContact', dataIndex: 'type' },
    { title: 'Actions', key: 'action' },
  ];

  const residentialTableHeaders = [
    { title: 'Name', key: 'name', dataIndex: 'name' },
    { title: 'Mobile No', key: 'mobileNumber', dataIndex: 'phone' },
    { title: 'E-Mail', key: 'email', dataIndex: 'email' },
    { title: 'Industry', key: 'industry', dataIndex: 'industry' },
    { title: 'Registered Date', key: 'registeredDate', dataIndex: 'registeredDate' },
    { title: 'Actions', key: 'action' },
  ];

  const residentialTabPans = [
    {
      key: 'recentlyAdded',
      label: 'Recently Added',
    },
    {
      key: 'properties',
      label: `Properties (${contactBookStats?.residential?.properties || 0})`,
    },
  ];

  const commercialTabPans = [
    {
      key: 'all',
      label: 'Recently Added',
    },
    {
      key: 'all',
      label: `All (${contactBookStats?.commercial?.all || 0})`,
    },

    {
      key: 'organization',
      label: `Organizations (${contactBookStats?.commercial?.organization || 0})`,
    },
    {
      key: 'connects',
      label: `Connects (${contactBookStats?.commercial?.connects || 0})`,
    },
    {
      key: 'properties',
      label: `Properties (${contactBookStats?.commercial?.properties || 0})`,
    },
  ];

  useEffect(() => {
    const body = {
      propertyType: propertyType ? 'commercial' : 'residential',
      contactType: currentTabItem,
      limit: 10,
      offset: (pagination.current - 1) * pagination.pageSize,
    };
    setCurrentTableHeaders(commercialTableHeaders);
    setCurrentTabPans(commercialTabPans);
    dispatch(getContactBookData(body));
    dispatch(getContactBookStats());
  }, []);

  const handlePropertyChange = (checked) => {
    setPagination({ current: 1, pageSize: 10 });
    setPropertyType(checked);
    setCurrentTabItem('recentlyAdded');
    dispatch(setSearchInputValue(''));
    const body = {
      propertyType: checked ? 'commercial' : 'residential',
      contactType: 'recentlyAdded',
      limit: 10,
      offset: 0,
    };
    if (checked) {
      setCurrentTabPans(commercialTabPans);
      setCurrentTableHeaders(commercialTableHeaders);
      dispatch(getContactBookData(body));
      return;
    }
    setCurrentTabPans(residentialTabPans);
    setCurrentTableHeaders(residentialTableHeaders);
    dispatch(getContactBookData(body));
  };

  const handleTabChange = (key) => {
    setPagination({ current: 1, pageSize: 10 });
    setCurrentTabItem(TAB_CONSTANTS[propertyType ? 'commercial' : 'residential'][key]);
    const body = {
      propertyType: propertyType ? 'commercial' : 'residential',
      contactType: TAB_CONSTANTS[propertyType ? 'commercial' : 'residential'][key],
      limit: 10,
      offset: 0,
    };
    dispatch(getContactBookData(body));
    dispatch(setSearchInputValue(''));
  };

  const handlePaginationChange = (page, pageSize) => {
    setPagination({ current: page, pageSize }); // Update pagination state
  };

  useEffect(() => {
    const offset = (pagination.current - 1) * pagination.pageSize;
    const body = {
      propertyType: propertyType ? 'commercial' : 'residential',
      contactType: currentTabItem,
      limit: 10,
      offset: offset,
    };
    dispatch(getContactBookData(body)); // Fetch data initially
  }, [pagination]); // Fetch data when pagination changes

  const handleModalOpen = (key, value, row) => {
    setSelectedRow(row);
    dispatch(setFeedbackModalVisible(true));
    form.resetFields();
    // setModal2Open(value);
  };

  const handleSubmitFeedback = async () => {
    const values = await form.validateFields();

    const body = {
      comment: values?.feedback,
      resourceType: selectedRow?.resourceSubType,
      resourceId: selectedRow?.resourceId,
      rating: values?.rating,
    };

    dispatch(postContactFeedback(body));
  };

  const onSearchInputChange = (event) => {
    dispatch(setSearchInputValue(event.target.value));
  };

  useDebounce(
    () => {
      if (searchInputValue !== '') {
        const body = {
          searchQuery: searchInputValue,
          resourceType: propertyType ? 'commercial' : 'residential',
          resourceSubType: currentTabItem,
        };
        dispatch(getContactBookDataThroughSearch(body));
      } else {
        const offset = (pagination.current - 1) * pagination.pageSize;
        const body = {
          propertyType: propertyType ? 'commercial' : 'residential',
          contactType: currentTabItem,
          limit: 10,
          offset: offset,
        };
        dispatch(getContactBookData(body));
      }
    },
    [searchInputValue],
    800,
  );

  return (
    <div className="contact__book">
      <div className="contact__book__div">
        <div className="search__group">
          <Search
            placeholder="Search Personal, Units, Properties"
            allowClear
            size="large"
            value={searchInputValue}
            className='search__group--item'
            prefix={<SearchOutlined  />}
            onChange={onSearchInputChange}
          />
        </div>
        <Switch
          
          className="contact__book__div__property__type"
          unCheckedChildren="Residential"
          checkedChildren="Commercial"
          defaultChecked
          loading={switchLoader}
          value={propertyType}
          onChange={(checked) => handlePropertyChange(checked)}
        />
      </div>
      <Tabs defaultActiveKey={0} onChange={handleTabChange}>
        {currentTabPans?.map((el, i) => (
          <TabPane tab={el?.label} key={i}>
            <TabsPane
              tableHeaders={currentTabHeaders}
              tableRows={contactBookData}
              pagination={pagination}
              handlePaginationChange={handlePaginationChange}
              updateModalOpen={handleModalOpen}
              totalCount={contactBookStats?.[propertyType ? 'commercial' : 'residential']?.[el?.key]}
            />
          </TabPane>
        ))}
      </Tabs>
      <Modal
        centered
        open={feedbackModalVisible}
        onOk={() => handleSubmitFeedback()}
        onCancel={() => dispatch(setFeedbackModalVisible(false))}
        okText="Submit"
        cancelButtonProps={{ style: { display: 'none' } }}
        className="custom-confirm-styles"
      >
        <Form form={form}>
          <h2 className='text-share'>Share Feedback</h2>
          <p  className='text-desc'>
            Please provide your valuable rating and feedback of this connect
          </p>
          <Form.Item label="" name="rating" rules={[{ required: true, message: 'Field 1 is required' }]}>
            <Rate allowHalf defaultValue={0}  className='rating-style'  />
          </Form.Item>
          <Form.Item label="" name="feedback" rules={[{ required: true, message: 'Field 2 is required' }]}>
            <TextArea
            style={{marginTop: '-20px'}}
              rows={8}
              placeholder="Type Here..."
              className='modal-textarea'
              
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ContactBook;

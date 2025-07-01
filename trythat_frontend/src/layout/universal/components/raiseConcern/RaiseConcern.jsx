// React imports
import React, { useEffect, useState } from 'react';

// icons imports
import logo from '../../../../assets/logo.png';
import ChatIcon from '../../../home/images/ChatIcon';
import { CheckCircleFilled, CloseOutlined, LoadingOutlined, RightCircleFilled, SendOutlined } from '@ant-design/icons';

// css imports
import './raiseConcern.scss';
import { useDispatch } from 'react-redux';
import { raiseConcern } from '../../../../universal/features/userSlice';
import { useLocation, useRoutes } from 'react-router';
import { Spin, Select } from 'antd';
import categoryOptions from '../../../../assets/default-data/concernCategoryOptions.json';

const { Option } = Select;
const defaultOption = 'Select Category';

const RaiseConcern = () => {
  //   hooks
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  // states
  const [showConcernPopOver, setShowConcernPopover] = useState(false);
  const [concernText, setConcernText] = useState('');
  const [loader, setLoader] = useState(false);
  const [success, setSuccess] = useState(false);
  const [option, setOption] = useState([]);
  const [selectedOption, setSelectedOption] = useState(defaultOption);

  useEffect(() => {
    setOption(categoryOptions);
  }, []);

  // open/close raise concern popover
  const toggleShowConcernPopover = () => {
    setShowConcernPopover((prev) => !prev);
    setConcernText('');
    setSuccess(false);
    setLoader(false);
    setSelectedOption(defaultOption);
  };

  //   on concern text change
  const onConcernTextChange = (e) => {
    setConcernText(e.target.value);
    setSuccess(false);
  };

  const onOptionChange = (value) => {
    setSelectedOption(value);
  };
  //   on raise concern click
  const raiseConcernClick = () => {
    if (loader || concernText?.length == 0 || selectedOption === defaultOption) return;
    setLoader(true);
    dispatch(raiseConcern({ category: selectedOption, description: concernText, path: pathname })).then((res) => {
      setLoader(false);
      if (res?.payload?.data?.response?.code == '201') {
        setConcernText('');
        setSuccess(true);
      }
    });
  };

  return (
    <div className={`raise_concern_container  ${showConcernPopOver && 'show_popover'}`}>
      {showConcernPopOver && (
        <div className={`pop_over`}>
          <div className="pop_over_header">
            <img src={logo} />
            <CloseOutlined onClick={toggleShowConcernPopover} />
          </div>
          <div className="pop_over_content">
            {success ? (
              <span className="pop_over_text">
                <div className="success_box">
                  <CheckCircleFilled className="success_icon" />
                  <span>Concern raised successfully </span>
                </div>
              </span>
            ) :
              (
                <>
                  <Select
                    placeholder={defaultOption}
                    value={selectedOption}
                    onChange={onOptionChange}
                    style={{ width: '100%', marginBottom: '10px' }}
                  >
                    {option.map((item) => (
                      <Option key={item.value} value={item.value}>
                        {item.label}
                      </Option>
                    ))}
                  </Select>
                  <span className="pop_over_text">
                    Please articulate any concern you may have, as we're here to offer assistance and support.
                  </span>
                  {selectedOption !== defaultOption && (
                    <div className="input_container">
                      <input placeholder="Add your concern" value={concernText} onChange={onConcernTextChange} />
                      <div onClick={raiseConcernClick} className="share_icon_container">
                        {loader ? <Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} /> : <SendOutlined />}
                      </div>
                    </div>
                  )}
                </>
              )}
          </div>
        </div>
      )}
      <span onClick={toggleShowConcernPopover} className="message_icon_outer_circle">
        <ChatIcon />
      </span>
    </div>
  );
};

export default RaiseConcern;

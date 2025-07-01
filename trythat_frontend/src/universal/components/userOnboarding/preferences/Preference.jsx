import { Form, Space } from 'antd';
import { isEmpty } from 'lodash';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { userOnboardingGetPreferencesList } from '../../../features/userOnboardingSlice';
import PreselectedTags from '../Offerings/UserTypeOfferingsLayout/common/PreselectedTags';
import DropDown from './DropDown';
import './Preference.scss';

const Preference = ({ _userPreferenceData }) => {
  // hooks
  const dispatch = useDispatch();
  // states
  const { user } = useSelector((store) => store.user);
  const [userSellsTags, setUserSellsTags] = useState([]);
  const [userSellOptions, setUserSellOptions] = useState([]);
  const [userBuyOptions, setUserBuyOptions] = useState([]);
  const [userAudienceOptions, setUserAudienceOptions] = useState([]);
  const [userTargetAudienceTags, setUserTargetAudienceTags] = useState([]);
  const [userWouldBuyTag, setUserWouldBuyTag] = useState([]);

  // -----Pre setting value------

  const optionMap = [
    {
      type: 'userSells',
      setter: setUserSellOptions,
    },
    {
      type: 'userSells',
      setter: setUserSellOptions,
    },
  ];

  useEffect(() => {
    if (isEmpty(_userPreferenceData)) return;
    setUserSellsTags(_userPreferenceData.userSells);
    setUserTargetAudienceTags(_userPreferenceData.userTargetAudience);
    setUserWouldBuyTag(_userPreferenceData.userWouldBuy);
  }, []);

  const onOptionOpen = (open, query, setterFunc) => {
    open &&
      dispatch(userOnboardingGetPreferencesList(query))?.then((res) => {
        const options = res?.payload?.data?.response?.data;
        options && setterFunc(options?.map((elem) => ({ label: elem?.name, key: elem?.name, value: elem?.name })));
      });
  };

  return (
    <section className="preferences">
      <>
        {/* ------------User sells----------- */}

        <div className="preferences-container">
          <Space direction="vertical" className="preferences-container__space">
            <Form.Item
              label={`Services that ${user.name} sells`}
              name="preference_userSells"
              className="preferences-container__space--item"
            >
              <Form.Item
                name="preference_userSells"
                style={{ margin: 0 }}
                rules={[
                  {
                    required: true,
                    message: 'Please select what you would like to sell',
                  },
                ]}
              >
                <DropDown
                  onOpenChange={(e) => onOptionOpen(e, 'userSells', setUserSellOptions)}
                  name={'preference_userSells'}
                  options={userSellOptions}
                  allTags={userSellsTags}
                  setterFunc={setUserSellsTags}
                />
              </Form.Item>
              <span>To select your preference click on your preferred tag</span>
            </Form.Item>
            <Form.Item
              name="preference_userSells"
              style={{ margin: 0 }}
              className={` ${
                userSellsTags?.length > 0
                  ? 'preferences-container__space--item'
                  : 'preferences-container__space--noData'
              } `}
            >
              {userSellsTags?.length > 0 && <PreselectedTags setTagData={setUserSellsTags} tagsData={userSellsTags} />}
            </Form.Item>
            <div className="preferences-container__space--note">Note: min 1 is compulsory</div>
          </Space>
        </div>
        {/* ------------User sells----------- */}

        {/* ------------User Target Audience----------- */}

        <div className="preferences-container">
          <Space direction="vertical" className="preferences-container__space">
            <Form.Item label={`${user.name}/BI target Audience`} className="preferences-container__space--item">
              <Form.Item
                name="preference_userTargetAudience"
                style={{ margin: 0 }}
                rules={[
                  {
                    required: true,
                    message: 'Please select audience what you would like to target',
                  },
                ]}
              >
                <DropDown
                  onOpenChange={(e) => onOptionOpen(e, 'userTargetAudience', setUserAudienceOptions)}
                  name={'preference_userTargetAudience'}
                  options={userAudienceOptions}
                  allTags={userTargetAudienceTags}
                  setterFunc={setUserTargetAudienceTags}
                />
              </Form.Item>
              <span>To select your preference click on your preferred tag</span>
            </Form.Item>
            <Form.Item
              name="preference_userTargetAudience"
              style={{ margin: 0 }}
              className={` ${
                userTargetAudienceTags?.length > 0
                  ? 'preferences-container__space--item'
                  : 'preferences-container__space--noData'
              } `}
            >
              {userTargetAudienceTags?.length > 0 && (
                <PreselectedTags n setTagData={setUserTargetAudienceTags} tagsData={userTargetAudienceTags} />
              )}
            </Form.Item>
            <div className="preferences-container__space--note">Note: min 1 is compulsory</div>
          </Space>
        </div>

        {/* ------------User Target Audience----------- */}

        {/* ------------User would like to buy----------- */}
        {/* preference_userWouldBuy */}
        <div className="preferences-container">
          <Space direction="vertical" className="preferences-container__space">
            <Form.Item
              label={`Services that ${user.name}/BI would like to buy`}
              className="preferences-container__space--item"
              name="preference_userWouldBuy"
            >
              <Form.Item
                name="preference_userWouldBuy"
                style={{ margin: 0 }}
                rules={[
                  {
                    required: true,
                    message: 'Please select what you would  to buy',
                  },
                ]}
              >
                <DropDown
                  onOpenChange={(e) => onOptionOpen(e, 'userWouldBuy', setUserBuyOptions)}
                  name={'preference_userWouldBuy'}
                  options={userBuyOptions}
                  allTags={userWouldBuyTag}
                  setterFunc={setUserWouldBuyTag}
                />
              </Form.Item>
              <span>To select your preference click on your preferred tag</span>
            </Form.Item>
            <Form.Item
              name="preference_userWouldBuy"
              style={{ margin: 0 }}
              className={` ${
                userWouldBuyTag?.length > 0
                  ? 'preferences-container__space--item'
                  : 'preferences-container__space--noData'
              } `}
            >
              {userWouldBuyTag?.length > 0 && (
                <PreselectedTags setTagData={setUserWouldBuyTag} tagsData={userWouldBuyTag} />
              )}
            </Form.Item>
            <div className="preferences-container__space--note">Note: min 1 is compulsory</div>
          </Space>
        </div>
        {/* ------------User would like to buy----------- */}
      </>
    </section>
  );
};

export default Preference;

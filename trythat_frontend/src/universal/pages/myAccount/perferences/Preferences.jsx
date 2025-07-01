// imports
import { Form, Space } from 'antd';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PreselectedTags from '../../../components/userOnboarding/Offerings/UserTypeOfferingsLayout/common/PreselectedTags';
import DropDown from '../../../components/userOnboarding/preferences/DropDown';
import {
  userOnboardingAddPreferences,
  userOnboardingGetPreferences,
  userOnboardingGetPreferencesList,
} from '../../../features/userOnboardingSlice';
import './preferences.scss';

const Preference = ({}) => {
  // hooks
  const dispatch = useDispatch();
  const [formDetails] = Form.useForm();
  // states
  const { user } = useSelector((store) => store.user);

  // States
  const [userSellsTags, setUserSellsTags] = useState([]);
  const [userSellOptions, setUserSellOptions] = useState([]);
  const [userBuyOptions, setUserBuyOptions] = useState([]);
  const [userAudienceOptions, setUserAudienceOptions] = useState([]);
  const [userDreamClientsOptions, setUserDreamClientsOptions] = useState([]);
  const [userDreamClientsTags, setUserDreamClientsTags] = useState([]);
  const [userInterestsOptions, setUserInterestsOptions] = useState([]);
  const [userInterestsTags, setUserInterestsTags] = useState([]);
  const [userTargetAudienceTags, setUserTargetAudienceTags] = useState([]);
  const [userWouldBuyTag, setUserWouldBuyTag] = useState([]);

  // Fetching prefernces and setting
  useEffect(() => {
    dispatch(userOnboardingGetPreferences())?.then((res) => {
      const userPreferenceData = res?.payload?.data?.response?.data?.[0];
      if (userPreferenceData) {
        setUserSellsTags(userPreferenceData.userSells || []);
        setUserTargetAudienceTags(userPreferenceData.userTargetAudience || []);
        setUserWouldBuyTag(userPreferenceData.userWouldBuy || []);
        setUserDreamClientsTags(userPreferenceData.dreamClients || []);
        setUserInterestsTags(userPreferenceData.interests || []);

        // ------Setting fetched data to states-------
        formDetails.setFieldsValue({
          preference_dreamClients: userPreferenceData.dreamClients || [],
          preference_interests: userPreferenceData.interest || [],
          preference_userWouldBuy: userPreferenceData.userWouldBuy || [],
          preference_userTargetAudience: userPreferenceData.userTargetAudience || [],
          preference_userSells: userPreferenceData.userSells || [],
        });
      }
    });
  }, []);

  // Fetch opption listing on opening dropdown
  const onOptionOpen = (open, query, setterFunc) => {
    open &&
      dispatch(userOnboardingGetPreferencesList(query))?.then((res) => {
        const options = res?.payload?.data?.response?.data;
        options && setterFunc(options?.map((elem) => ({ label: elem?.name, key: elem?.name, value: elem?.name })));
      });
  };

  // calling api to set data on change
  const handleFormChange = (_, e) => {
    const payload = {
      userSells: e?.preference_userSells,
      userTargetAudience: e?.preference_userTargetAudience,
      userWouldBuy: e?.preference_userWouldBuy,
      dreamClients: e?.preference_dreamClients,
      interest: e?.preference_interests,
    };
    dispatch(userOnboardingAddPreferences(payload));
  };

  // jsx
  return (
    <Form layout="vertical" style={{ marginTop: '30px' }} form={formDetails} onValuesChange={handleFormChange}>
      <section className="preferences" style={{ flexDirection: 'row' }}>
        <>
          <div className="insideContainers">
            <heading>My Pereferences</heading>
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
                  {/* <span>To select your preference click on your preferred tag</span> */}
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
                  {userSellsTags?.length > 0 && (
                    <PreselectedTags setTagData={setUserSellsTags} tagsData={userSellsTags} />
                  )}
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
                  {/* <span>To select your preference click on your preferred tag</span> */}
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
          </div>
          {/* ------------User would like to buy----------- */}
          {/* ------------User Dream Client----------- */}
          <div className="insideContainers">
            <div className="preferences-container">
              <Space direction="vertical" className="preferences-container__space">
                <Form.Item
                  label={`${user.name}'s Dream Clients`}
                  className="preferences-container__space--item"
                  name="preference_dreamClients"
                >
                  <Form.Item
                    name="preference_dreamClients"
                    style={{ margin: 0 }}
                    rules={[
                      {
                        required: true,
                        message: 'Please select dream clients',
                      },
                    ]}
                  >
                    <DropDown
                      onOpenChange={(e) => onOptionOpen(e, 'dreamClients', setUserDreamClientsOptions)}
                      name={'preference_dreamClients'}
                      options={userDreamClientsOptions}
                      allTags={userDreamClientsTags}
                      setterFunc={setUserDreamClientsTags}
                    />
                  </Form.Item>
                  {/* <span>To select your preference click on your preferred tag</span> */}
                </Form.Item>
                <Form.Item
                  name="preference_dreamClients"
                  style={{ margin: 0 }}
                  className={` ${
                    userDreamClientsTags?.length > 0
                      ? 'preferences-container__space--item'
                      : 'preferences-container__space--noData'
                  } `}
                >
                  {userDreamClientsTags?.length > 0 && (
                    <PreselectedTags setTagData={setUserDreamClientsTags} tagsData={userDreamClientsTags} />
                  )}
                </Form.Item>
                <div className="preferences-container__space--note">Note: min 1 is compulsory</div>
              </Space>
            </div>
            {/* -----------User Dream Client----------- */}
            {/* ------------User Interests----------- */}

            <div className="preferences-container">
              <Space direction="vertical" className="preferences-container__space">
                <Form.Item
                  label={`${user.name}'s Interests`}
                  className="preferences-container__space--item"
                  name="preference_interests"
                >
                  <Form.Item
                    name="preference_interests"
                    style={{ margin: 0 }}
                    rules={[
                      {
                        required: true,
                        message: 'Please select interests',
                      },
                    ]}
                  >
                    <DropDown
                      onOpenChange={(e) => onOptionOpen(e, 'interests', setUserInterestsOptions)}
                      name={'preference_interests'}
                      options={userInterestsOptions}
                      allTags={userInterestsTags}
                      setterFunc={setUserInterestsTags}
                    />
                  </Form.Item>
                  {/* <span>To select your preference click on your preferred tag</span> */}
                </Form.Item>
                <Form.Item
                  name="preference_interests"
                  style={{ margin: 0 }}
                  className={` ${
                    userInterestsTags?.length > 0
                      ? 'preferences-container__space--item'
                      : 'preferences-container__space--noData'
                  } `}
                >
                  {userInterestsTags?.length > 0 && (
                    <PreselectedTags setTagData={setUserInterestsTags} tagsData={userInterestsTags} />
                  )}
                </Form.Item>
                <div className="preferences-container__space--note">Note: min 1 is compulsory</div>
              </Space>
            </div>
          </div>
          {/* -----------User Interests----------- */}
        </>
      </section>
    </Form>
  );
};

export default Preference;

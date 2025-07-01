// imports
import { Button, Form, Space, Steps, Typography, message } from 'antd';
import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Joyride, { ACTIONS, EVENTS, STATUS } from 'react-joyride';
import LottieAnimation from '../../components/lottieAnimation/LottieAnimation';
import Offerings from '../../components/userOnboarding/Offerings/Offerings';
import CompanyDetails from '../../components/userOnboarding/companyDetails/CompanyDetails';
import Preference from '../../components/userOnboarding/preferences/Preference';
import PersonalDetails from '../../components/userOnboarding/professionalDetails/PersonalDetails';
import SelectPlan from '../../components/userOnboarding/selectPlan/SelectPlan';

import Title from 'antd/es/typography/Title';
import { isEmpty } from 'lodash';
import animationData from '../../../assets/images/userOnboardingLottie.json';
import {
  fetchUserOnboardingData,
  postOnboardingData,
  registerCrm,
  userOnboardingGetAllCompanyDetails,
  userOnboardingGetAllIndusteriesDetails,
} from '../../features/userOnboardingSlice';
import { STEPS_MAP, getCrmPayload, getPayloadTemplateV1, getPayloadTemplateV2 } from './userboarding.utils';
import './useronboarding.scss';

const UserOnboarding = () => {
  // hooks
  const dispatch = useDispatch();
  const [userOfferings] = Form.useForm();
  const { Text } = Typography;

  // States
  const { userOnboardingData, userPoints } = useSelector((store) => store.userOnboarding);
  const [current, setCurrent] = useState(0);
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState(null);
  const [selectedIAmAState, setSelectedIAmAState] = useState('');
  const [_userPreferenceData, set_userPreferenceData] = useState({});
  const [createCompany, setCreateCompany] = useState(false);
  const [allCompanyList, setAllCompanyList] = useState([]);
  const [allIndustriesList, setAllIndustriesList] = useState([]);
  const [dataupdationIds, setDataupdationIds] = useState({});
  const { currentLocation } = useSelector((store) => store.userDashboard);
  const [run, setRun] = useState(true);
  const joyrideRef = useRef();
  const tourSteps = [
    {
      content: <h2 style={{ marginTop: "-15px" }}>Let's begin our journey!</h2>,
      locale: { skip: <strong aria-label="skip">SKIP</strong> },
      placement: 'center',
      target: 'body'
    },
    {
      content: (
        <div>
          <p>User can select checkbox for select this as my current location.</p>
          <p> User can change curren location on the click of Change Location label and
            type location pn textbox and click on Let's Start Button.</p>
        </div>
      ),
      styles: {
        options: {
          width: 300,
        },
      },
      title: 'Select Location',
      target: 'body',
      placement: 'center',
    },
    {
      content: (
        <div>
          <p>User should select options form Company Name dropdown and Select Industry dropdown.</p>
          <p>after select mandatory options you can click on Next button or user can go back screen with help of select Back button. </p>
        </div>
      ),
      styles: {
        options: {
          width: 300,

        },
      },
      title: 'Company Details',
      target: 'body #root .ant-flex .ant-layout .ant-layout .ant-layout-content .useronboarding .useronboarding-leftdiv .ant-steps [data-testid="step-1"]',

      placement: 'bottom',
    },
    {
      content: (
        <div>
          <p>User can fill Designation Years of experience and select Key skills.</p>
          <p>after that user can click on Next button or Back button. </p>
        </div>
      ),
      styles: {
        options: {
          width: 300,

        },
      },
      target: 'body #root .ant-flex .ant-layout .ant-layout .ant-layout-content .useronboarding .useronboarding-leftdiv .ant-steps [data-testid="step-2"]',
      title: 'Professional Details',
      placement: 'bottom',
    },
    {
      content: (
        <div>
          <p>User can select his type, his deling client type, Property type and location.</p>

          <p>after that user can click on Next button or Back button. </p>
        </div>
      ),
      placement: 'bottom',
      target: 'body #root .ant-flex .ant-layout .ant-layout .ant-layout-content .useronboarding .useronboarding-leftdiv .ant-steps [data-testid="step-3"]',
      title: 'Offerings',
      styles: {
        options: {
          width: 300,

        },
      },
    },
    {
      content: (
        <div>
          <p>User can add tag for Services that prasad sells, BI target Audience and BI would like to buy.</p>

          <p>after that user can click on Next button or Back button. </p>
        </div>
      ),
      placement: 'bottom',
      target: 'body #root .ant-flex .ant-layout .ant-layout .ant-layout-content .useronboarding .useronboarding-leftdiv .ant-steps [data-testid="step-4"]',
      title: 'Preference',
      styles: {
        options: {
          width: 320,

        },
      },
    },
    {
      content: (
        <div>
          <p>User can select plan either Pay as you go or Enterprise Plan,
            for Enterprise Plan select have to click on Let's connect button and fill the form details.
          </p>

          <p>after that user can click on Next button or Back button </p>
        </div>
      ),
      placement: 'bottom',
      target: 'body #root .ant-flex .ant-layout .ant-layout .ant-layout-content .useronboarding .useronboarding-leftdiv .ant-steps [data-testid="step-5"]',
      title: 'Select Plan',
      styles: {
        options: {
          width: 300,

        },
      },
    },
  ]
  // Mounting API CALL
  useEffect(() => {
    dispatch(userOnboardingGetAllCompanyDetails())?.then((res) => {
      if (res?.payload?.data?.response?.data) {
        const items = res?.payload?.data?.response?.data?.map((elem) => ({
          value: elem?.id,
          label: elem?.name,
        }));
        setAllCompanyList(items);
        dispatch(userOnboardingGetAllIndusteriesDetails())?.then((res) => {
          const items = res?.payload?.data?.response?.data?.map((elem) => ({
            value: elem?.id,
            label: elem?.name,
          }));
          if (res?.payload?.data?.response?.data) {
            setAllIndustriesList(items);
            dispatch(fetchUserOnboardingData());
          }
        });
      }
    });
  }, []);

  // Updating states on updation
  useEffect(() => {
    if (isEmpty(userOnboardingData)) return;
    if (!loader && !isEmpty(userOnboardingData?.offerings)) {
      setSelectedIAmAState(Object.keys(userOnboardingData?.offerings)?.[0] || '');
    }

    if (!isEmpty(userOnboardingData?.preferences)) {
      set_userPreferenceData(userOnboardingData?.preferences);
    }

    const preFilledLocation = {
      label: currentLocation?.locationDetails?.name,
      key: currentLocation?.locationDetails?.name,
    };

    // --prefiilling location----
    const getPrefilledLocation = (name, data) => {
      let locations = data;
      if (isEmpty(data) || !data) {
        locations = currentLocation?.locationDetails ? [preFilledLocation] : [];
      }
      return locations;
    };
    // --prefiilling data----
    userOfferings.setFieldsValue({
      companyRepresentativeName: userOnboardingData?.name,
      companyRepresentativeMobile: userOnboardingData?.phone,
      companyRepresentativeEmail: userOnboardingData?.email,
      companyName: allCompanyList?.find((elem) => elem?.label == userOnboardingData?.professionalDetails?.companyName)
        ?.value,
      industry: allIndustriesList?.find((elem) => elem?.label == userOnboardingData?.professionalDetails?.industry)
        ?.value,
      designation: userOnboardingData?.professionalDetails?.designation,
      yearsOfExperience: userOnboardingData?.professionalDetails?.experience,
      keySkills: userOnboardingData?.professionalDetails?.keySkills,
      iAmI: !isEmpty(userOnboardingData?.offerings) ? Object.keys(userOnboardingData?.offerings)?.[0] : '',

      //Broker data

      broker_location: getPrefilledLocation('broker_location', userOnboardingData?.offerings?.broker?.location),
      broker_expertise: userOnboardingData?.offerings?.broker?.purpose,
      broker_property_type: userOnboardingData?.offerings?.broker?.propertyType,
      broker_property_type_other: userOnboardingData?.offerings?.broker?.propertyType?.find(
        (elem) => elem?.type == 'Any Other',
      )?.text,
      broker_open_to_broker: userOnboardingData?.offerings?.broker?.openToBrokers,

      //Seller data
      seller_location: getPrefilledLocation('seller_location', userOnboardingData?.offerings?.seller?.[0]?.location),
      seller_iAmHereTo: userOnboardingData?.offerings?.seller?.[0]?.purpose,
      seller_property_type: userOnboardingData?.offerings?.seller?.[0]?.propertyType,
      seller_property_type_other: userOnboardingData?.offerings?.seller?.[0]?.propertyType?.find(
        (elem) => elem?.type == 'Any Other',
      )?.text,
      seller_open_to_broker: userOnboardingData?.offerings?.seller?.[0]?.openToBrokers,

      //Buyer data
      buyer_lookingFor: userOnboardingData?.offerings?.buyer?.purpose,
      buyer_propertyType: userOnboardingData?.offerings?.buyer?.propertyType,
      buyer_property_type_other: userOnboardingData?.offerings?.buyer?.propertyType?.find(
        (elem) => elem?.type == 'Any Other',
      )?.text,
      buyer_budgetRange_lower_limit: userOnboardingData?.offerings?.buyer?.budgetRange?.min,
      buyer_budgetRange_upper_limit: userOnboardingData?.offerings?.buyer?.budgetRange?.max,
      buyer_location: getPrefilledLocation('buyer_location', userOnboardingData?.offerings?.buyer?.location),
      buyer_requirements: userOnboardingData?.offerings?.buyer?.requirements,
      buyer_open_to_broker: userOnboardingData?.offerings?.buyer?.openToBrokers,

      //Co Working data
      coworking_openToBrokers: userOnboardingData?.offerings?.coworking?.[0]?.openToBrokers,
      coworking_location: getPrefilledLocation(
        'coworking_location',
        userOnboardingData?.offerings?.coworking?.[0]?.location,
      ),
      coworking_availability: userOnboardingData?.offerings?.coworking?.[0]?.availability,
      coworking_expectaion: userOnboardingData?.offerings?.coworking?.[0]?.expectation,
      //Preference
      preference_userSells: userOnboardingData?.preferences?.userSells,
      preference_userTargetAudience: userOnboardingData?.preferences?.userTargetAudience,
      preference_userWouldBuy: userOnboardingData?.preferences?.userWouldBuy,
    });
  }, [userOnboardingData]);

  // handle submit
  const handleDataSubmit = (e) => {
    // it will call api based on current active tab i.e company details , professional details etc
    // dispatch(saveScreenData(getPayloadTemplate(e)));
    setLoader(true);
    const payload = getPayloadTemplateV1({
      e,
      current,
      allCompanyList,
      allIndustriesList,
      userOnboardingData,
      createCompany,
    })

    if (!userOnboardingData?.phone && e?.companyRepresentativeMobile) {
      dispatch(
        postOnboardingData({ pageName: 'personalDetails', body: { ...payload?.body, phone: e?.companyRepresentativeMobile } }),
      )
    }

    dispatch(
      postOnboardingData(payload),
    )?.then((res) => {
      if (res?.payload?.data?.response?.code == 201) {
        // V2 API CALL
        setLoader(false);
        if (STEPS_MAP?.[current] != 'professionalDetails') {
          dispatch(
            getPayloadTemplateV2({
              e,
              current,
              createCompany,
              selectedIAmI: e?.iAmI,
              dataupdationIds: dataupdationIds,
            }),
          )?.then((res) => {
            if (res?.payload?.data?.response) {
              if (STEPS_MAP?.[current] == 'offerings') {
                setDataupdationIds((prev) => ({
                  [e?.iAmI]: res?.payload?.data?.response?.data?.id,
                }));
                dispatch(registerCrm(getCrmPayload(userOnboardingData)));
              }
              setLoader(false);
              setCreateCompany(false);
              dispatch(fetchUserOnboardingData());
              setCurrent((prev) => {
                return prev + 1;
              });
            } else {
              setError(res?.payload?.message);
              message.error(res?.payload?.message);
            }
          });
        } else {
          setCreateCompany(false);
          dispatch(fetchUserOnboardingData());
          setCurrent((prev) => {
            return prev + 1;
          });
        }
      }
    });
  };

  // ------all steps--------
  const steps = [
    {
      title: 'Company Details',
      content: (
        <CompanyDetails
          allCompanyList={allCompanyList}
          allIndustriesList={allIndustriesList}
          setCreateCompany={setCreateCompany}
          createCompany={createCompany}
        />
      ),
      dataTestid: "step-1"
    },
    {

      title: 'Professional Details',
      content: <PersonalDetails keySkillsL={userOnboardingData?.professionalDetails?.keySkills} />,
      dataTestid: "step-2",
    },
    {
      title: 'Offerings',
      content: <Offerings _IAmA={selectedIAmAState} />,
      dataTestid: "step-3",
    },
    {
      title: 'Preference',
      content: <Preference _userPreferenceData={_userPreferenceData} />,
      dataTestid: "step-4"
    },
    {
      title: 'Select Plan',
      content: <SelectPlan />,
      dataTestid: "step-5"
    },
  ];

  const items = steps.map((item) => ({
    key: item.title,
    title: item.title,
    className: "step-class",
    'data-testid': item.dataTestid
  }));
  const contentStyle = {
    display: 'flex',
    marginTop: 16,
    minHeight: '370px',
  };
  const handleJoyrideCallback = (data) => {
    const { action, index, type, status } = data;

    if (type === EVENTS.TOUR_END && status === STATUS.FINISHED) {
      setRun(false);
    }

    if (type === EVENTS.STEP_AFTER || type === EVENTS.TARGET_NOT_FOUND) {
      console.log('Step or target not found:', data);
    }

  };

  return (
    <>
      <section className="useronboarding">
        <div
          className="useronboarding-leftdiv"
          style={{
            display: 'flex',
            flexDirection: 'column',
            width: current === 4 ? '100%' : '70%',
            background: 'white',
            borderRadius: '8px',
            padding: '20px',
          }}
        >
          <Text className="useronboarding-leftdiv__welcome">
            Welcome, <Text className="useronboarding-leftdiv__welcome--user">{userOnboardingData?.name}</Text>
          </Text>
          <Text className="useronboarding-leftdiv__desc">
            Fill this 5 step form and get your business toolkit ready to scale up!
          </Text>
          <Steps
            className="useronboarding-leftdiv__steps"
            labelPlacement="vertical"
            size="small"
            current={current}
            items={items}
          />
          <Form
            name="userOfferings"
            form={userOfferings}
            layout="vertical"
            initialValues={{
              remember: true,
            }}
            onFinish={handleDataSubmit}
            autoComplete="off"
          >
            <div style={contentStyle}>{steps[current].content}</div>
            <div className="useronboarding-leftdiv__btnbox">
              <Button
                disabled={current === 4}
                htmlType="submit"
                loading={loader}
                className="useronboarding-leftdiv__btnbox--btn"
                type="primary"
              >
                Next
              </Button>

              {/* -------- If User create company he/she can reset----------  */}
              {createCompany && current == 0 ? (
                <Button
                  onClick={() => {
                    setCreateCompany(false);
                  }}
                  className="useronboarding-leftdiv__btnbox--btn"
                  type="primary"
                  ghost
                >
                  Reset
                </Button>
              ) : (
                <Button
                  disabled={current === 0}
                  onClick={() => {
                    setCurrent((prev) => {
                      return prev - 1;
                    });
                  }}
                  className="useronboarding-leftdiv__btnbox--btn"
                  type="primary"
                  ghost
                >
                  Back
                </Button>
              )}
            </div>
          </Form>
        </div>
        {current !== 4 && (
          <div className="useronboarding-rightdiv">
            <img
              src={require('../../../assets/images/LottieBackground.png')}
              className="useronboarding-rightdiv__img"
            />
            <Space direction="vertical" className="useronboarding-rightdiv__space">
              <Title level={3} className="useronboarding-rightdiv__space--great">
                Great going {userOnboardingData?.name}!
              </Title>
              <div className="useronboarding-rightdiv__space--pointbox">
                <div className="pointbox-box">
                  <img src={require('../../../assets/images/pointsBackground.png')} className="pointbox-box__img" />
                  <div className="pointbox-box__point">
                    <Title level={3} className="pointbox-box__point--userpoint">
                      {userPoints}
                    </Title>
                  </div>
                </div>
              </div>
              <Title level={5} className="useronboarding-rightdiv__space--pointearn">
                POINTS EARNED!
              </Title>
              <div className="useronboarding-rightdiv__space--descdiv">
                <Text className="descdiv-desc">
                  Keep up the spirit and by the end of this survey you will have 200 points in your wallet.
                </Text>
              </div>
              <LottieAnimation height={220} width={220} animationData={animationData} loop={true} />
            </Space>
          </div>
        )}
        <section style={{ display: 'flex', justifyContent: 'center' }}>
          <Joyride
            ref={joyrideRef}
            callback={handleJoyrideCallback}
            run={run}
            showProgress
            showSkipButton
            steps={tourSteps}
            styles={{
              options: {
                zIndex: 10000,
              },
            }}
            locale={{
              last: 'End Tour',
            }}
            continuous// Continuous loop through steps
            scrollToFirstStep // Scroll to the first step on mount
            disableOverlayClose // Disable closing by clicking overlay
          />
        </section>

      </section>
    </>
  );
};
export default UserOnboarding;

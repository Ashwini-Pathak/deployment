import { Col, Form, Radio, Row, Typography } from 'antd';
import { isEmpty } from 'lodash';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import Broker from '../../../components/myAccount/Broker/Broker';
import Buyer from '../../../components/myAccount/Buyer/Buyer';
import CoWorkingOperator from '../../../components/myAccount/CoWorking/CoWorkingOperator';
import SellerWanttoRent from '../../../components/myAccount/Seller/SellerWanttoRent';
import {
  setBrokerLocation,
  setBuyerLocation,
  setBuyerOpenToBroker,
  setCoWorkingLocations,
  setCoWorkingOpenToBroker,
  setSellerLocations,
  setSellerPriceNegotiable,
} from '../../../features/myAccountSlice';
import { saveScreenData } from '../../../features/userOnboardingSlice';
import { getPayloadTemplateV2 } from '../../userOnboarding/userboarding.utils';
import {
  formDetailsSetOfferingData,
  getFormFieldsChangeOfferingsBody,
  getFormSubmitOfferingsBody,
} from './FormDetailsUtils';

const Offerings = ({ user }) => {
  // Hooks
  const dispatch = useDispatch();

  // forms and text
  const { Text } = Typography;
  const [formDetails] = Form.useForm();

  // States
  const [selectedIAmI, setSelectedIAmI] = useState('');
  const [renderingComponent, setRenderingComponent] = useState();

  const IAmA = {
    broker: <Broker />,
    seller: <SellerWanttoRent />,
    buyer: <Buyer />,
    coworking: <CoWorkingOperator formDetails={formDetails} />,
  };

  const navItems = [
    { label: 'Broker', value: 'broker' },
    { label: 'Seller/ Want to rent a property', value: 'seller' },
    { label: 'Buyer', value: 'buyer' },
    { label: 'Co-Working Operator', value: 'coworking' },
  ];

  useEffect(() => {
    setSelectedIAmI(Object.keys(user?.offerings || {})?.[0] || 'broker');
    setRenderingComponent(IAmA?.[Object.keys(user?.offerings || {})?.[0] || 'broker']);
  }, []);

  useEffect(() => {
    if (isEmpty(user)) return;
    if (!isEmpty(user?.offerings)) {
    }
    dispatch(setCoWorkingLocations({}));
    dispatch(setCoWorkingOpenToBroker(''));
    dispatch(setBuyerOpenToBroker(user?.offerings?.buyer?.openToBrokers));
    dispatch(setSellerLocations({}));
    dispatch(setSellerPriceNegotiable(''));
    dispatch(setBuyerLocation(user?.offerings?.buyer?.location));
    dispatch(setBrokerLocation(user?.offerings?.broker?.location));
    formDetails.setFieldsValue({
      //Broker data
      broker_location: user?.offerings?.broker?.location || [],
      broker_expertise: user?.offerings?.broker?.purpose || [],
      broker_property_type: user?.offerings?.broker?.propertyType || [],
      broker_property_type_other:
        user?.offerings?.broker?.propertyType?.find((elem) => elem?.type == 'Any Other')?.text || '',
      broker_open_to_broker: user?.offerings?.broker?.openToBrokers || [],

      //Seller data

      seller_location: [],
      seller_iAmHereTo: null,
      seller_property_type: [],
      seller_open_to_broker: null,

      //Buyer data

      buyer_lookingFor: user?.offerings?.buyer?.purpose || [],
      buyer_propertyType: user?.offerings?.buyer?.propertyType || [],
      buyer_property_type_other:
        user?.offerings?.buyer?.propertyType?.find((elem) => elem?.type == 'Any Other')?.text || '',
      buyer_budgetRange_lower_limit: user?.offerings?.buyer?.budgetRange?.min || '',
      buyer_budgetRange_upper_limit: user?.offerings?.buyer?.budgetRange?.max || '',
      buyer_location: user?.offerings?.buyer?.location || [],
      buyer_requirements: user?.offerings?.buyer?.requirements || '',
      buyer_open_to_broker: user?.offerings?.buyer?.openToBrokers || [],

      // Co working
      coworking_openToBrokers: null,
      coworking_location: [],
      coworking_availability: '',
      coworking_expectaion: '',
    });
  }, [user]);

  // handleing submiting
  const handleFinish = (e) => {
    // ---------V1 call--------

    dispatch(saveScreenData(getFormSubmitOfferingsBody(e, selectedIAmI, user)));
    // ---------V2 call--------

    dispatch(getPayloadTemplateV2({ e, current: '2', selectedIAmI }));
  };

  const handleFormChange = (changedValues, allValues) => {
    // ---------V1 call--------
    // let formValues = getFormFieldsChangeOfferingsBody(allValues, selectedIAmI, user);
    // if (!formValues) return;
    // dispatch(saveScreenData(formValues));
    // // ---------V2 call--------
    // const V2Call = formDetailsSetOfferingData({
    //   values: allValues,
    //   selectedIAmI: selectedIAmI,
    // });
    // dispatch(V2Call);
  };

  return (
    <>
      <section
        className="personalDtlsSection"
        style={{
          paddingTop: '20px',
          paddingLeft: '20px',
          backgroundColor: 'white',
          display: 'flex',
          flexDirection: 'row',
          height: 'auto',
          gap: '10px',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            marginBottom: '20px',
          }}
        >
          <Row>
            <Col>
              <Radio.Group
                onChange={(e) => {
                  setSelectedIAmI(e?.target?.value);
                  setRenderingComponent(IAmA?.[e?.target?.value]);
                }}
                value={selectedIAmI}
                style={{
                  background: '#FFFFFF 0% 0% no-repeat padding-box',
                  boxShadow: '0px 3px 6px #00000029',
                  opacity: 1,
                }}
              >
                {navItems?.map((el) => {
                  return (
                    <Radio.Button
                      key={el?.value}
                      value={el?.value}
                      style={{
                        background: selectedIAmI === el?.value ? '#0081FC' : '#FFFFFF',
                        fontSize: '12px',
                        textAlign: 'center',
                      }}
                    >
                      <Text
                        style={{
                          fontSize: '12px',
                          margin: '0px',
                          padding: '0px',
                          color: selectedIAmI === el?.value ? '#ffffff' : '#132056',
                        }}
                      >
                        {el?.label}
                      </Text>
                    </Radio.Button>
                  );
                })}
              </Radio.Group>
            </Col>
          </Row>
          <Form
            layout="vertical"
            style={{ marginTop: '30px' }}
            form={formDetails}
            onFinish={handleFinish}
            onValuesChange={handleFormChange}
          >
            <div>{renderingComponent}</div>
          </Form>
        </div>
      </section>
    </>
  );
};

export default Offerings;

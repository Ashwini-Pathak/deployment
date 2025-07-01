import { Button, Card, Col, Row, Spin, Typography } from 'antd';
import React, { useEffect,useState } from 'react';
import { clearUserOnboardingData, fetchUserOnboardingData } from '../../../features/userOnboardingSlice';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import SelectPlanPopup from './selectPlanPopup';
const SelectPlan = () => {
  const dispatch = useDispatch();
  const [showSelectPlanPopup, setShowSelectPlanPopup] = useState(false);
  const { userOnboardingData, loading } = useSelector((store) => store.userOnboarding);
  useEffect(() => {
    dispatch(fetchUserOnboardingData('selectPlan'));

    return () => {
      dispatch(clearUserOnboardingData());
    };
  }, []);

  const { Text } = Typography;
 // on close popup
 const onCloseSelectPlanPopup = () => {
  setShowSelectPlanPopup(false);
};
  return (
    <>
      {loading ? (
        <div
          style={{
            width: '100%',
            height: '40%',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '40px',
          }}
        >
          <Spin size="large" />
        </div>
      ) : (
        <Row>
          <Col
            span={24}
            style={{ display: 'flex', flexDirection: 'row', width: '100%', gap: '20px', marginBottom: '20px' }}
          >
            <Card>
              <div style={{ display: 'flex', flexDirection: 'column', width: '250px', gap: '8px' }}>
                <div
                  style={{
                    borderRadius: '8px',
                    padding: '24px 24px',
                    display: 'flex',
                    flexDirection: 'column',
                    background: '#003FAB',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: '8px',
                  }}
                >
                  <Text style={{ color: 'white', fontSize: '20px', fontWeight: 800 }}> Pay as you go</Text>
                  <Text style={{ color: 'white', fontWeight: 100 }}> Rs. X,XXX/-</Text>
                </div>
                <div style={{ marginTop: '10px' }}>
                  <Text strong>Features</Text>
                </div>
                <div>
                  <Text style={{ fontSize: '12px', fontWeight: '200' }}>
                    It is a long established fact that a reader will be distracted by the readable content of a page
                    when looking at its layout.
                  </Text>
                </div>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <Link to="#">
                    <Button
                      block
                      ghost
                      type="primary"
                      style={{
                        height: '45px',
                        borderRadius: '100px',
                        marginTop: '20px',
                        color: '#FF9C00',
                        borderColor: '#FF9C00',
                        flex: '1',
                      }}
                    >
                      Buy Coins
                    </Button>
                  </Link>
                  <Link to="/user/socialApp">
                    <Button
                      block
                      ghost
                      type="primary"
                      style={{ height: '45px', borderRadius: '100px', marginTop: '20px', flex: '1' }}
                    >
                      Proceed
                    </Button>
                  </Link>
                </div>
              </div>
            </Card>
            <Card>
              <div style={{ display: 'flex', flexDirection: 'column', width: '250px', gap: '8px' }}>
                <div
                  style={{
                    borderRadius: '8px',
                    padding: '24px 24px',
                    display: 'flex',
                    flexDirection: 'column',
                    background: '#003FAB',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: '8px',
                  }}
                >
                  <Text style={{ color: 'white', fontSize: '20px', fontWeight: 800 }}> Enterprise Plan</Text>
                  <Text style={{ color: 'white', fontWeight: 100 }}> Rs. X,XX,XXX/-</Text>
                </div>
                <div style={{ marginTop: '10px' }}>
                  <Text strong>Features</Text>
                </div>
                <div>
                  <Text style={{ fontSize: '12px', fontWeight: '200' }}>
                    It is a long established fact that a reader will be distracted by the readable content of a page
                    when looking at its layout.
                  </Text>
                </div>
                <div>
                  <Button
                    block
                    ghost
                    type="primary"
                    style={{ height: '45px', borderRadius: '100px', marginTop: '20px' }}

                    onClick={() => setShowSelectPlanPopup(true)}
                  >
                    Let's Connect
                  </Button>
                </div>
              </div>
              {/* -----------Add select plan pop over----------- */}
              <SelectPlanPopup open={showSelectPlanPopup} closePopup={onCloseSelectPlanPopup} />
              {/* -----------Add select plan pop over----------- */}
            </Card>
          </Col>
        </Row>
      )}
    </>
  );
};

export default SelectPlan;

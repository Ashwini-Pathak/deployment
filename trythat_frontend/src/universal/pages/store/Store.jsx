// Css Imports
import './store.scss';

// React,React-Redux,Router Imports
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router-dom';

// Design Library Imports
import { MinusOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Divider, Spin, Typography } from 'antd';

// Slices and reducer imports
import {
  createCart,
  decreaseUserStoreQuantity,
  fetchStorePointsData,
  getCartDetails,
  getPaymentStatus,
  increaseUserStoreQuantity,
  initiatePayment,
  updateCartDetails,
  updateStorePoints,
} from '../../features/userStoreSlice';

// Component Imports
import EmptyCartIcon from '../../../layout/home/images/EmptyCartIcon';
import PaymentStatusPopup from './PaymentStatusPopup';
import { allPendingStatus, paymentStatusMaps } from './storeUtils';

const Store = () => {
  const { Text } = Typography;

  // Hooks
  const dispatch = useDispatch();
  const navigateTo = useNavigate();

  // States
  const { loading, storePoints, paymentLoading, userCartDetails } = useSelector((store) => store.userStore);
  const [totalSpend, setTotalSpend] = useState(0);
  const [paymentDetails, setPaymentDetails] = useState({});
  const [countdown, setCountDown] = useState(120);
  const [showCountDown, setShowCountDown] = useState(false);
  const [openPaymentStatusPopup, setOpenPaymentStatusPopup] = useState();

  // Search params
  const [params, setSearchParams] = useSearchParams();
  const paymentData = params?.get('code');

  // fetching points data
  useEffect(() => {
    dispatch(fetchStorePointsData())?.then((res) => {
      const storePoints = res?.payload?.data?.response?.data;
      if (res?.payload?.data?.response?.data) {
        dispatch(getCartDetails())?.then((res) => {
          if (!res?.payload?.data?.response?.data) {
            // Creating cart if cart is not present
            dispatch(createCart());
          } else {
            // updating Creating cart if cart is  present

            const cartItem = res?.payload?.data?.response?.data?.cartItems;
            const updatedStorePoints = storePoints?.map((elem) => {
              const item = cartItem?.find((el) => el?.pointAmountMapping == elem?._id);
              return {
                ...elem,
                quantity: item?.quantity,
              };
            });
            const totalSpend = updatedStorePoints
              ?.filter((elem) => elem?.quantity > 0)
              ?.reduce((acc, curr) => acc + parseInt(curr?.amount || 0) * parseInt(curr?.quantity), 0);
            dispatch(updateStorePoints(updatedStorePoints));
            setTotalSpend(totalSpend);
          }
        });
      }
    });
  }, []);

  // handle payment data
  useEffect(() => {
    const decodedData = JSON?.parse(atob(paymentData || '') || '{}');
    if (decodedData?.orderId) {
      setOpenPaymentStatusPopup(true);
      setPaymentDetails(decodedData);
      if (paymentStatusMaps?.[decodedData?.status]?.success) {
        setTotalSpend(decodedData?.amount);
      }
      if (paymentStatusMaps?.[decodedData?.status]?.showTimeout) {
        setShowCountDown(true);
      }
    }
  }, [params]);

  // remove search param
  const removeSearchParam = () => {
    if (params.has('code')) {
      params.delete('code');
      setSearchParams(params);
    }
    return;
  };
  // route to transaction screen
  const routeToTransactionScreen = () => {
    navigateTo('/user/myaccount?activeTab=transactional_details', { replace: true });
  };

  // Tiemout counter for pending payments
  useEffect(() => {
    if (!showCountDown || countdown == 1) return;
    const countdownIntervalID = setInterval(() => {
      setCountDown((prev) => {
        // polling logic for getting payment status in every 30 sec
        if (prev % 30 == 0 || prev < 1) {
          dispatch(getPaymentStatus({ orderId: paymentDetails?.orderId, isTimedOut: prev < 1 ? true : false }))?.then(
            (res) => {
              const status = res?.payload?.data?.response?.data?.status;
              if (allPendingStatus?.includes(status)) {
                if (prev < 1) {
                  setPaymentDetails((prev) => ({ ...prev, status: 'TIMED_OUT' }));
                }
              } else {
                clearInterval(countdownIntervalID);
                setPaymentDetails((prev) => ({ ...prev, status: status }));
              }
            },
          );
        }
        if (prev < 1) {
          clearInterval(countdownIntervalID);
          setCountDown(prev - 1);
          setShowCountDown(false);
          // route to transaction screen on close
          routeToTransactionScreen();
          // remove search param on close
          removeSearchParam();
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(countdownIntervalID);
  }, [showCountDown]);

  // Close payment status pop up
  const onPaymentStatusPopUpClose = () => {
    setOpenPaymentStatusPopup(false);
    removeSearchParam();
    routeToTransactionScreen();
  };

  // Increase Slected Points
  const increase = (el) => {
    dispatch(increaseUserStoreQuantity(el?._id));
    setTotalSpend(totalSpend + parseInt(el.amount));
    const storePoint = storePoints?.map((elem) => {
      if (elem?._id == el?._id) {
        elem = {
          pointAmountMapping: el._id,
          quantity: (elem?.quantity || 0) + 1,
        };
      } else {
        elem = {
          pointAmountMapping: elem._id,
          quantity: elem?.quantity || 0,
        };
      }
      return elem;
    });
    dispatch(updateCartDetails(storePoint));
  };

  // Decrease Slected Points
  const decline = (el) => {
    dispatch(decreaseUserStoreQuantity(el._id));
    setTotalSpend(totalSpend - parseInt(el.amount));
    const storePoint = storePoints?.map((elem) => {
      if (elem?._id == el?._id) {
        elem = {
          pointAmountMapping: el._id,
          quantity: (elem?.quantity || 0) - 1,
        };
      } else {
        elem = {
          pointAmountMapping: elem._id,
          quantity: (elem?.quantity || 0)?.quantity,
        };
      }
      return elem;
    });
    dispatch(updateCartDetails(storePoint));
  };

  // It will handle all payment process
  const makePaymentHandler = () => {
    // Getting total points and amount from selected data
    const totalPointsAndAmount = storePoints
      ?.filter((elem) => elem?.quantity > 0)
      ?.map((item) => ({
        pointAmountMappingId: item?._id,
        quantity: item?.quantity,
      }));

    // Initiating payment
    dispatch(initiatePayment([...totalPointsAndAmount]));
  };

  return (
    <>
      {false ? (
        <Spin spinning={loading} size="large" fullscreen />
      ) : (
        <div className="storecontainer">
          <div className="store-container">
            <div>
              <span className="store-container__store">Store</span>
            </div>
            <div className="store-container__desc">
              <span className="store_content">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
                ex ea commodo consequat.
              </span>
            </div>
            <div className="store-container__leftpoints">
              {storePoints?.map((el, index) => {
                let points = el?.points?.toString()?.includes('000')
                  ? el?.points?.toString()?.split('000')[0] + 'k'
                  : el?.points;
                return (
                  <div key={index} className="leftpoints">
                    <div className="leftpoints-size">
                      <div>
                        <Text className="leftpoints-first__text">{points}</Text>
                      </div>
                      <div>
                        <Text className="leftpoints-second__text">POINTS</Text>
                      </div>
                      <div className="points-items">
                        <Text className="leftpoints-third__text">
                          Rs.{' '}
                          {el?.amount.toLocaleString('en-IN', {
                            maximumFractionDigits: 0,
                            currency: 'INR',
                          })}
                          /-
                        </Text>
                      </div>
                    </div>
                    <div className="leftpoints-bottom__part">
                      <div className="storeUpdPointsLftBtnDiv">
                        <Button
                          className="storeUpdPointsBtn"
                          onClick={() => decline(el)}
                          icon={<MinusOutlined />}
                          disabled={el.quantity === 0}
                        />
                      </div>
                      <div className="store-bottomwidth">
                        <span>{el.quantity}</span>
                      </div>
                      <div className="storeUpdPointsRgtBtnDiv">
                        <Button className="storeUpdPointsBtn" onClick={() => increase(el)} icon={<PlusOutlined />} />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="store-container__right">
            <div className="right-checkout">
              <span className="checkout-items">Checkout</span>
              {totalSpend != 0 && (
                <div className="checkoutFlxDiv">
                  <div className="checkoutFlxDiv-point">
                    <Text className="checkpoints-item">Points</Text>
                  </div>
                  <div className="checkoutFlxDiv-quantity">
                    <Text className="quantity-item">Quantity</Text>
                  </div>
                  <div className="checkoutFlxDiv-price">
                    <Text className="checkprice-item">Price</Text>
                  </div>
                </div>
              )}
              <div className="checkupper_box">
                {totalSpend == 0 ? (
                  <div className="empty_cart">
                    <EmptyCartIcon />
                    <span>Your cart is empty</span>
                  </div>
                ) : (
                  storePoints.map((el) => {
                    if (el?.quantity === 0) return;
                    return (
                      <>
                        <div className="amountcontainer">
                          <div className="amountcontainer-point">
                            <Text className="amountcontainer-point__item">{el.points} points</Text>
                          </div>
                          <div>
                            <Text className="amountcontainer-point__item">{el.quantity}</Text>
                          </div>
                          <div className="amountcontainer-point__action">
                            <Text className="amountcontainer-point__item">
                              Rs.{' '}
                              {(el.amount * el.quantity).toLocaleString('en-IN', {
                                maximumFractionDigits: 0,
                                currency: 'INR',
                              })}
                              /-
                            </Text>
                          </div>
                        </div>
                        <Divider className="amount-divider" />
                      </>
                    );
                  })
                )}
              </div>
              <div className="box-items">
                <div className="amountset">
                  <span className="fontset">
                    Total: Rs.{' '}
                    {totalSpend.toLocaleString('en-IN', {
                      maximumFractionDigits: 0,
                      currency: 'INR',
                    })}
                    /-
                  </span>
                </div>
                <div>
                  <Button
                    type="button"
                    disabled={totalSpend == 0 || paymentLoading}
                    loading={paymentLoading}
                    onClick={makePaymentHandler}
                    className="payment-btn"
                    block
                  >
                    Make Payment
                  </Button>
                </div>
              </div>
            </div>
          </div>
          {/* ------------Payment status popup--------- */}
          {paymentDetails && (
            <PaymentStatusPopup
              countdown={countdown}
              showCountDown={showCountDown}
              paymentStatus={paymentDetails?.status}
              orderID={paymentDetails?.orderId}
              amount={paymentDetails?.amount}
              openPaymentStatusPopup={openPaymentStatusPopup}
              onCloseHandler={onPaymentStatusPopUpClose}
            />
          )}
          {/* ------------Payment status popup--------- */}
        </div>
      )}
    </>
  );
};

export default Store;

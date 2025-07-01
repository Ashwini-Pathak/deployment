// External libray imports
import { Modal, Typography } from 'antd';

// util imports
import { convertCountdownToHourFormat, paymentStatusMaps } from './storeUtils';

// css imports
import './store.scss';

// Payment Status popup component
const PaymentStatusPopup = ({
  paymentStatus,
  countdown,
  showCountDown,
  openPaymentStatusPopup,
  amount,
  orderID,
  onCloseHandler = () => {},
}) => {
  // Typography
  const { Text } = Typography;

  return (
    <Modal
      closable
      className="payment_status_popup_modal"
      footer={false}
      centered
      width={350}
      maskClosable={false}
      open={openPaymentStatusPopup}
      onCancel={onCloseHandler}
    >
      <div className="payment_status_popup">
        {/* --------ICON-------- */}
        <span>{paymentStatusMaps?.[paymentStatus]?.icon || ''}</span>

        {/* --------COUNTDOWN-------- */}

        {showCountDown && <span>{convertCountdownToHourFormat(countdown)}</span>}

        {/* --------LABEL-------- */}

        <Text className="heading">{paymentStatusMaps?.[paymentStatus]?.label || ''}</Text>
        {paymentStatusMaps?.[paymentStatus]?.subHeading && (
          <Text className="sub_heading">{paymentStatusMaps?.[paymentStatus]?.subHeading || ''}</Text>
        )}
        {/* -------Order Id Details------- */}
        {paymentStatusMaps?.[paymentStatus]?.success && (
          <>
            <Text className="sub_heading">Order ID : {orderID || 'Awaited'}</Text>
            <Text className="sub_heading">Amount : {`Rs. ${amount}` || 'Awaited'}</Text>
          </>
        )}
        {/* -------Order Id Details------- */}
      </div>
    </Modal>
  );
};
export default PaymentStatusPopup;

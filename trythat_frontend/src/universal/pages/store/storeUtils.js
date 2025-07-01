// External Library imports
import { CheckCircleFilled, ClockCircleFilled, CloseCircleFilled } from '@ant-design/icons';

const ErrorIcon = <CloseCircleFilled className="icon_failed" />;
const PendingIcon = <ClockCircleFilled className="icon_pending" />;

// payment pop up data mapping based on payment status
export const paymentStatusMaps = {
  CHARGED: {
    label: 'Your payment is successful',
    subHeading: 'We have successfully recieved your payment.',
    icon: <CheckCircleFilled className="icon_success" />,
    success: true,
    closable: false,
    showTimeout: false,
  },
  PENDING_VBV: {
    label: 'Your payment is pending',
    subHeading: 'We are fetching your payment details please do not refresh or close this window.',
    icon: PendingIcon,
    showTimeout: true,
  },
  AUTHORIZING: {
    label: 'Your payment is pending',
    subHeading: 'We are fetching your payment details please do not refresh or close this window.',
    icon: PendingIcon,
    showTimeout: true,
  },
  AUTHENTICATION_FAILED: {
    label: 'Your payment is failed',
    icon: ErrorIcon,
    subHeading: 'Your recent payment attempt was unsuccessful.',
    closable: true,
  },
  AUTHORIZATION_FAILED: {
    label: 'Your payment is failed',
    icon: ErrorIcon,
    subHeading: 'Your recent payment attempt was unsuccessful.',
    closable: true,
  },
  JUSPAY_DECLINED: {
    label: 'Your payment is failed',
    icon: ErrorIcon,
    subHeading: 'Your recent payment attempt was unsuccessful',
  },
  STARTED: {
    label: 'Your payment is failed',
    subHeading: 'Your recent payment attempt was unsuccessful.',
    icon: ErrorIcon,
  },
  TIMED_OUT: {
    label: 'Your payment is failed',
    retry: false,
    subHeading:
      'If any amount has been deducted from your account, it will be promptly refunded within 3 working days.',
    icon: ErrorIcon,
  },
};
// All Pending Status
export const allPendingStatus = ['PENDING_VBV', 'AUTHORIZING'];

// It converts countdown counts to hh:mm format
export const convertCountdownToHourFormat = (seconds) => {
  let minutes = Math.floor(seconds / 60);
  let extraSeconds = seconds % 60;
  minutes = minutes < 10 ? '0' + minutes : minutes;
  extraSeconds = extraSeconds < 10 ? '0' + extraSeconds : extraSeconds;
  return `${minutes} min : ${extraSeconds} sec`;
};

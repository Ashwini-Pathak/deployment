import { CheckCircleFilled, ClockCircleFilled, CloseCircleFilled } from '@ant-design/icons';

const ErrorIcon = <CloseCircleFilled className="icon_status" />;
const PendingIcon = <ClockCircleFilled className="icon_status" />;

// payment status map for classnames and labels
export const paymentStatusMaps = {
  CHARGED: {
    label: 'Success',
    icon: <CheckCircleFilled className="icon_status" />,
    className: 'payment_success',
  },
  PENDING_VBV: {
    label: 'Pending',
    icon: PendingIcon,
    className: 'payment_pending',
  },
  AUTHORIZING: {
    label: 'Pending',
    icon: PendingIcon,
    className: 'payment_pending',
  },
  AUTHENTICATION_FAILED: {
    label: 'Failed',
    icon: ErrorIcon,
    className: 'payment_failed',
  },
  AUTHORIZATION_FAILED: {
    label: 'Failed',
    icon: ErrorIcon,
    className: 'payment_failed',
  },
  JUSPAY_DECLINED: {
    label: 'Failed',
    icon: ErrorIcon,
    className: 'payment_failed',
  },
  STARTED: {
    label: 'Failed',
    icon: ErrorIcon,
    className: 'payment_failed',
  },
  TIMED_OUT: {
    label: 'Failed',
    icon: ErrorIcon,
    className: 'payment_failed',
  },
  NEW: {
    label: 'Failed',
    icon: ErrorIcon,
    className: 'payment_failed',
  },
};

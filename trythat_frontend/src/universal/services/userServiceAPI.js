import { client } from '../../utils/apiClient';
import { asyncHandler } from '../../utils/asyncHandler';

const getAllNotificationsAPI = async (param, userId) => {
  const [data, err] = await asyncHandler(client.get(`/user/${userId}/notifications`));
  if (err) return err;
  return data;
};

const markAsReadNotificationAPI = async (notificationId, userId) => {
  const [data, err] = await asyncHandler(
    client.patch(`/user/${userId}/notification/${notificationId}/status`, {
      status: true,
    }),
  );
  if (err) return err;
  return data;
};
// raise concern api
export const raiseConcernAPI = async (payload, userId) => {
  const [data, err] = await asyncHandler(
    client.post(`/raiseConcern/user/${userId}/addConcern`, {
      ...payload,
    }),
  );
  if (err) return err;
  return data;
};

export { getAllNotificationsAPI, markAsReadNotificationAPI };

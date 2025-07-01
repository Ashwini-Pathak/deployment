import { isEmpty } from 'lodash';

export const getQueryFromPayload = (payload) => {
  const { email, phone } = payload;

  if (email && phone) {
    return {
      $or: [
        {
          email,
        },
        {
          phone,
        },
      ],
    };
  }

  const key = isEmpty(email) ? 'phone' : 'email';
  return {
    [key]: payload[key],
  };
};

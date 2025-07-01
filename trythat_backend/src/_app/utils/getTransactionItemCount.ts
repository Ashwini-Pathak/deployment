import { get, size } from 'lodash';

export const getTransactionItemCount = (payload) => {
  let count = 0;

  payload.forEach((el) => {
    const items = get(el, 'unlockedFields', []);
    count += size(items);
  });

  return count;
};

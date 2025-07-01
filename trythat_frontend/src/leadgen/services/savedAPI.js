import { client } from '../../utils/apiClient';
import { asyncHandler } from '../../utils/asyncHandler';

const getUserProspects = async (offset, userId) => {
  const [data, err] = await asyncHandler(client.get(`/leadgen/user/${userId}/prospect?skip=${offset}&limit=10`));
  if (err) return err;
  return data;
};

const transactProspects = async (body, userId) => {
  const [data, err] = await asyncHandler(client.post(`/leadgen/user/${userId}/recommendation/transact`, body));
  if (err) return err;
  return data;
};

export { getUserProspects, transactProspects };

import { client } from '../../utils/apiClient';
import { asyncHandler } from '../../utils/asyncHandler';

const getUserProspectsStats = async (offset, userId) => {
  const [data, err] = await asyncHandler(client.get(`/leadgen/user/${userId}/prospect/stats`));
  if (err) return err;
  return data;
};

export { getUserProspectsStats };

import { client, clientV2, docClient, docClientV2 } from '../../utils/apiClient';
import { asyncHandler } from '../../utils/asyncHandler';

// ----------get dashboard status details---------
const getDashboardAllPosts = async (userId, payload) => {
  const { limit, offset } = payload;
  const [data, err] = await asyncHandler(
    clientV2.get(`/user/${userId}/posts/dashboard?limit=${limit}&offset=${offset}`, {
      authorization: true,
    }),
  );
  if (err) return err;
  return data;
};
// ----------get cart status details---------
const getUserAllPosts = async (userId, payload) => {
  const { limit, offset } = payload;
  const [data, err] = await asyncHandler(
    clientV2.get(`/user/${userId}/posts?ownerId=${userId}&type=user_post&limit=${limit}&offset=${offset}`, {
      authorization: true,
    }),
  );
  if (err) return err;
  return data;
};
// ----------get cart status details---------
const getCompanyAllPosts = async (userId, companyId, payload) => {
  const { limit, offset } = payload;
  const [data, err] = await asyncHandler(
    // &limit=${limit}&offset=${offset}
    clientV2.get(`/user/${userId}/posts?ownerId=${companyId}&type=company_post&limit=${limit}&offset=${offset}`, {
      authorization: true,
    }),
  );
  if (err) return err;
  return data;
};
// ----------get cart status details---------
const createPost = async (userId, payload) => {
  const [data, err] = await asyncHandler(
    clientV2.post(`/user/${userId}/posts`, payload, {
      authorization: true,
    }),
  );
  // if (err) return err;
  return data;
};

const followUser = async (param, userId) => {
  try {
    const response = await clientV2.post(`/user/${userId}/follow`, param);
    return response;
  } catch (err) {
    console.error(err);
  }
};
const unfollowUser = async (param, userId) => {
  try {
    const response = await clientV2.post(`/user/${userId}/follow/unfollow`, param);
    return response;
  } catch (err) {
    console.error(err);
  }
};
const uploadPostImage = async (param, userId) => {
  try {
    const response = await docClientV2.post(`/user/${userId}/posts/upload-images`, param);
    return response;
  } catch (err) {
    console.error(err);
  }
};

const updateActivity = async (userId, postId, action, text = '') => {
  try {
    const response = await clientV2.post(`/user/${userId}/posts/activity/${postId}`, { action, text });
    return response;
  } catch (err) {
    console.error(err);
  }
};

const getComments = async (userId, postId) => {
  try {
    const response = await clientV2.get(`/user/${userId}/posts/activity/${postId}`, { params: { action: 'comments' } });
    return response;
  } catch (err) {
    console.error(err);
  }
}

const getPost =  async (userId, postId, ownerId) => {
  try {
    const response = await clientV2.get(`/user/${userId}/posts/${postId}`, {
      params: { id: userId, ownerId: ownerId, type: 'user_post' }
    });
    console.log("get post -------------> ", response);
    return response;
  } catch (err) {
    console.log("get post error-------------> ", err);
    console.error(err);
  }
}


export { getUserAllPosts, followUser, unfollowUser, getDashboardAllPosts, getCompanyAllPosts, createPost, uploadPostImage, getComments, updateActivity, getPost};

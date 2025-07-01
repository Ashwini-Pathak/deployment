import { client } from '../../utils/apiClient';
import { asyncHandler } from '../../utils/asyncHandler';

//----------------------User Authentication APIs------------------------------------------//
const signInInit = async (param) => {
  const [data, err] = await asyncHandler(client.post(`/auth/sign-in/init`, param.body, { authorization: false }));
  if (err) return err;
  return data;
};

const registerInit = async (param) => {
  const [data, err] = await asyncHandler(client.post(`/auth/sign-up/init`, param.body, { authorization: false }));
  if (err) return err;
  return data;
};

const sendOtp = async (param) => {
  const [data, err] = await asyncHandler(client.post(`/auth/otp/send`, param.body));
  if (err) return err;
  return data;
};

const verifyOtpAPI = async (param) => {
  const [data, err] = await asyncHandler(
    client.post(`/auth/otp/verify`, param.body, {
      authorization: false,
    }),
  );
  if (err) return err;
  return data;
};

const signIn = async (param) => {
  const [data, err] = await asyncHandler(
    client.post(`/auth/sign-in`, param.body, {
      authorization: false,
    }),
  );
  if (err) return err;
  return data;
};

const register = async (param) => {
  const [data, err] = await asyncHandler(
    client.post(`/auth/register`, param.body, {
      authorization: false,
    }),
  );
  if (err) return err;
  return data;
};

export { signInInit, registerInit, sendOtp, verifyOtpAPI, signIn, register };

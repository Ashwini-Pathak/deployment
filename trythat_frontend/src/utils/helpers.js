export const parseJson = (payload) => {
  try {
    return JSON.parse(payload);
  } catch {
    return false;
  }
};

export const isMobileNumber = (input) => {
  // Regular expression to match mobile numbers (assuming international format)
  const mobileNumberRegex = /^[0-9]{10,}$/;
  return mobileNumberRegex.test(input);
};

export const isEmail = (input) => {
  // Regular expression to match email addresses
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(input);
};

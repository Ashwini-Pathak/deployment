export const generateRandomNumber = (length = 5) => {
  return Math.floor(Math.pow(10, length) + Math.random() * 9 * Math.pow(10, length));
};

export const asyncHandler = (promise) =>
   promise.then((data) => [data, undefined]).catch((error) => Promise.resolve([undefined, error]));

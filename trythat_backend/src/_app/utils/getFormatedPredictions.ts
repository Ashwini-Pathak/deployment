export const getFormatedPredictions = (payload) => {
  return payload?.predictions.map(({ description = '' }) => description);
};

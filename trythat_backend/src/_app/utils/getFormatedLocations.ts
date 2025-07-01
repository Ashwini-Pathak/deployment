export const getFormatedLocations = (payload) => {
  let locationName = '';
  const additionalResults = [];
  payload?.results.forEach((location, index) => {
    if (index === 0) {
      locationName = location?.formatted_address;
      return;
    }

    additionalResults.push(location?.formatted_address);
    return;
  });

  return {
    name: locationName,
    additionalResults,
  };
};

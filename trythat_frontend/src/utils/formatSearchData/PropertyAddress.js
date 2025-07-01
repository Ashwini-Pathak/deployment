export const populateAddressInfo = (addressDetails) => {
  if (!addressDetails || typeof addressDetails !== 'object') {
    return '';
  }

  const addressComponents = [
    addressDetails.plotNo,
    addressDetails.blockNo,
    addressDetails.street,
    addressDetails.locality,
    addressDetails.city,
    addressDetails.state,
  ];

  return addressComponents?.filter(Boolean)?.join(', ');
};

export const populateAddressInfo = (addressDetails) => {
  if (!addressDetails || typeof addressDetails !== 'object') {
    return 'Awaited';
  }

  const addressComponents = [
    addressDetails.street,
    addressDetails.locality,
    addressDetails.blockNo,
    addressDetails.city,
    addressDetails.state,
    addressDetails.pincode,
  ];

  return addressComponents.filter(Boolean).join(', ');
};

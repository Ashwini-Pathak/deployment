import { populateAddressInfo } from './PropertyAddress';

export const FormatProperty = (data) => {
  return {
    id: data?._id,
    buildingName: data?.buildingName ?? 'Awaited',
    ownerName: data?.representativeInfo?.[0]?.personName ?? 'Awaited',
    phone: data?.representativeInfo?.[0]?.contactNumber ?? 'Awaited',
    email: data?.representativeInfo?.[0]?.emailId ?? 'Awaited',
    about: data?.propertyDescription ?? 'Awaited',
    gradeOfBuilding: data?.gradeOfBuilding ?? 'Awaited',
    amenities: data?.amenities,
    areaFacilities: data?.areaFacilities,
    address: data?.location?.mapLocation,
    featuredImage: data?.assetsInfo?.[0]?.featuredImage,
    name: data?.name ?? 'Awaited',
    averageRating: data?.averageRating,
    buildingType: data?.buildingType ?? 'Awaited',
    buildingStatus: data?.buildingStatus ?? 'Awaited',
    sanctionedBuiltupArea: data?.sanctionedBuiltupArea ?? 'Awaited',
    moreBuildingInfo: data?.moreBuildingInfo,
    efficiency: data?.efficiency ?? 'Awaited',
    buildingStructure: data?.buildingStructure ?? 'Awaited',
    buildingClassification: 'Awaited', // as of now data type is not defined
    developer: data?.developer ?? 'Awaited',
    addressInfo: populateAddressInfo(data?.addressInfo?.[0]),
    totalChargeableArea: data?.totalChargeableArea ?? 'Awaited',
    propertyImages: data?.assetsInfo?.[0]?.galleryFiles ?? [],
  };
};

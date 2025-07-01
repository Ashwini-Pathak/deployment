export const FormatConnect = (data) => {
  return {
    name: data?.personalInfo?.personName,
    email: data?.personalInfo?.emailId,
    phone: data?.personalInfo?.contactNumber,
    averageRating: data?.average_rating,
    currentCompany: data?.additionalConnectInfo?.companyName,
    designation: data?.additionalConnectInfo?.designation,
    experience: data?.additionalConnectInfo?.experience,
    currentIndustry: data?.professionalDetails?.currrentIndustrya,
    lastIndustry: data?.professionalDetails?.lastCompanyIndustry,
    keySkills: data?.additionalConnectInfo?.keySkills,
    userType: data?.personalInfo?.userType,
    experties: data?.additionalConnectInfo?.experties,
    perferredCities: data?.additionalConnectInfo?.preferrence,
    serviceSell: data?.additionalConnectInfo?.serviceSell,
    targetGroup: data?.additionalConnectInfo?.targetGroup,
    servicesBuy: data?.additionalConnectInfo?.servicesBuy,
    featuredImage: data?.featuredImage,
  };
};

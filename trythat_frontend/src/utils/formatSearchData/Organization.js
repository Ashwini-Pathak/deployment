export const FormatOrganization = (data) => {
  return {
    officeMailId: data?.companyEmail,
    headOfficeNumber: data?.otherCompanyInfo?.headOfficeNumber,
    industryType: data?.industryType,
    websiteLink: data?.otherCompanyInfo?.websiteLink,
    companyStrength: data?.otherCompanyInfo?.maximumNumberOfMembers,
    gallery: data?.assets?.gallery,
    averageRating: data?.average_rating,
    about: data?.otherCompanyInfo?.description,
    keyOfferings: data?.otherCompanyInfo?.keyOfferings,
    foundedYear: data?.otherCompanyInfo?.dateOfIncorporation,
    directorDetails: data?.directorInfo,
    featuredImage: data?.assets?.featuredImage,
    name: data?.companyName,
  };
};

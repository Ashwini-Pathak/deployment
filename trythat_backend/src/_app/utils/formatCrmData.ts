import { get } from 'lodash';
import { CtxSearch } from '../../search/enum/ctx-search.enum';

export const formatDataForCrm = (crmResources) => {
  const resourceSubType = get(crmResources, 'data.resourceSubType', '');
  const dataToReturn = {};

  switch (resourceSubType) {
    case CtxSearch.ORGANIZATION:
      Object.assign(dataToReturn, {
        FirstName: get(crmResources, 'data.companyName', ''),
        LastName: get(crmResources, 'data.companyName', ''),
        Company: get(crmResources, 'data.companyName', ''),
        Mobile: get(crmResources, 'data.otherCompanyInfo.headOfficeNumber', ''),
        Email: get(crmResources, 'data.companyEmail', ''),
        City: get(crmResources, 'data.companyAddressInfo[0].city', ''),
        Micromarket: get(crmResources, 'data.companyAddressInfo[0].locality', ''),
        Website: get(crmResources, 'data.otherCompanyInfo.websiteLink', ''),
        Description: get(crmResources, 'data.otherCompanyInfo.description', ''),
        Industry: get(crmResources, 'data.industryType', ''),
      });
      break;
    case CtxSearch.PROPERTY:
      Object.assign(dataToReturn, {
        FirstName: get(crmResources, 'data.buildingName', ''),
        LastName: get(crmResources, 'data.buildingName', ''),
        Mobile: get(crmResources, 'data.representativeInfo[0].contactNumber', ''),
        Email: get(crmResources, 'data.representativeInfo[0].emailId', ''),
        City: get(crmResources, 'data.addressInfo[0].city', ''),
        Micromarket: get(crmResources, 'data.addressInfo[0].locality', ''),
        Description: get(crmResources, 'data.about', ''),
      });
      break;
    case CtxSearch.CONNECT:
      Object.assign(dataToReturn, {
        FirstName: get(crmResources, 'data.personalInfo.personName', ''),
        LastName: get(crmResources, 'data.personalInfo.personName', ''),
        Mobile: get(crmResources, 'data.personalInfo.contactNumber', ''),
        Email: get(crmResources, 'data.personalInfo.emailId', ''),
      });
      break;
  }
  return dataToReturn;
};

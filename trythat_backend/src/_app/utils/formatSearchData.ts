import { get, lowerCase, isEmpty, pick } from 'lodash';
import { CtxSearch } from '../../search/enum/ctx-search.enum';
import { mapValueToCustomObj } from './mapToCustomObj';
import { resourceLockedFieldsMap, resourceLockedFieldsKey } from './resourceLockedFields';

export const formatSearchResponse = ({ payload, contacts = [], prospects = [], ctx, logger }) => {
  switch (ctx) {
    case CtxSearch.PROPERTY:
      return formatProperty({ payload, contacts, prospects, logger });

    case CtxSearch.ORGANIZATION:
      return formatOrganization({ payload, contacts, prospects, logger });

    case CtxSearch.CONNECT:
      return formatConnect({ payload, contacts, prospects, logger });

    case CtxSearch.UNIT:
      return formatUnit({ payload });

    case CtxSearch.COMMERCIAL_PROPERTY:
      return formatCommercialProperty({ payload, contacts, prospects, logger });

    case CtxSearch.RESIDENTIAL_PROPERTY:
      return formatResidentialProperty({ payload, contacts, prospects, logger });

    default:
      return payload;
  }
};

const formatOrganization = ({
  payload,
  contacts = [],
  prospects = [],
  resourceLockedFields = get(resourceLockedFieldsMap, 'organization', {}),
  lockedFields = get(resourceLockedFieldsKey, 'organization', []),
  logger,
}) => {
  try {
    const mappedPayload = getSearchIntent(payload);
    logger.debug('payload details formatOrganization');

    if (Array.isArray(mappedPayload)) {
      const tag = get(payload, 'tag', '');

      const data = mappedPayload.map((payloadEl) => {
        const isResourceLocked = getResourceLockedDetails({ lockedFields, contacts, payload: payloadEl });
        const isSaved = prospects.includes(get(payloadEl, '_id', ''));

        const formattedPayload = getFormattedPayload(payloadEl, isResourceLocked, resourceLockedFields);
        logger.debug({ formattedPayload }, 'formatted payload for reference');

        const updatedFields = {
          ...formattedPayload,
          isResourceLocked: !isEmpty(isResourceLocked),
          lockedResourceDetails: isResourceLocked,
          isSaved,
        };

        return updatedFields;
      });

      if (isEmpty(tag)) {
        return data;
      }

      return {
        tag,
        data,
      };
    }

    const isResourceLocked = getResourceLockedDetails({ lockedFields, contacts, payload });
    const isSaved = prospects.includes(get(payload, '_id', ''));

    const formattedPayload = getFormattedPayload(payload, isResourceLocked, resourceLockedFields);

    const updatedFields = {
      ...formattedPayload,
      isResourceLocked: !isEmpty(isResourceLocked),
      lockedResourceDetails: isResourceLocked,
      isSaved,
    };

    return updatedFields;
  } catch (error) {
    console.error(error);
  }
};

const formatProperty = ({
  payload,
  contacts = [],
  prospects = [],
  resourceLockedFields = get(resourceLockedFieldsMap, 'property', {}),
  lockedFields = get(resourceLockedFieldsKey, 'property', []),
  logger,
}) => {
  try {
    const mappedPayload = getSearchIntent(payload);
    logger.debug('payload details formatProperty');

    if (Array.isArray(mappedPayload)) {
      const tag = get(payload, 'tag', '');

      const data = mappedPayload.map((payloadEl) => {
        const isResourceLocked = getResourceLockedDetails({ lockedFields, contacts, payload: payloadEl });
        const isSaved = prospects.includes(get(payloadEl, '_id', ''));

        const formattedPayload = getFormattedPayload(payloadEl, isResourceLocked, resourceLockedFields);
        logger.debug({ formattedPayload }, 'formatted payload for reference');

        const updatedFields = {
          ...formattedPayload,
          isResourceLocked: !isEmpty(isResourceLocked),
          lockedResourceDetails: isResourceLocked,
          isSaved,
        };

        return updatedFields;
      });

      if (isEmpty(tag)) {
        return data;
      }

      return {
        tag,
        data,
      };
    }

    const isResourceLocked = getResourceLockedDetails({ lockedFields, contacts, payload });
    const isSaved = prospects.includes(get(payload, '_id', ''));

    const formattedPayload = getFormattedPayload(payload, isResourceLocked, resourceLockedFields);

    const updatedFields = {
      ...formattedPayload,
      isResourceLocked: !isEmpty(isResourceLocked),
      lockedResourceDetails: isResourceLocked,
      isSaved,
    };

    return updatedFields;
  } catch (error) {
    console.error(error);
  }
};

const formatCommercialProperty = ({
  payload,
  contacts = [],
  prospects = [],
  resourceLockedFields = get(resourceLockedFieldsMap, 'property', {}),
  lockedFields = get(resourceLockedFieldsKey, 'property', []),
  logger,
}) => {
  try {
    const mappedPayload = getSearchIntent(payload);
    logger.debug('payload details formatProperty');

    if (Array.isArray(mappedPayload)) {
      const tag = get(payload, 'tag', '');

      const data = mappedPayload.map((payloadEl) => {
        const isResourceLocked = getResourceLockedDetails({ lockedFields, contacts, payload: payloadEl });
        const isSaved = prospects.includes(get(payloadEl, '_id', ''));

        const formattedPayload = getFormattedPayload(payloadEl, isResourceLocked, resourceLockedFields);
        logger.debug({ formattedPayload }, 'formatted payload for reference');

        const updatedFields = {
          ...formattedPayload,
          isResourceLocked: !isEmpty(isResourceLocked),
          lockedResourceDetails: isResourceLocked,
          isSaved,
        };

        return updatedFields;
      });

      if (isEmpty(tag)) {
        return data;
      }

      return {
        tag,
        data,
      };
    }

    const isResourceLocked = getResourceLockedDetails({ lockedFields, contacts, payload });
    const isSaved = prospects.includes(get(payload, '_id', ''));

    const formattedPayload = getFormattedPayload(payload, isResourceLocked, resourceLockedFields);

    const updatedFields = {
      ...formattedPayload,
      isResourceLocked: !isEmpty(isResourceLocked),
      lockedResourceDetails: isResourceLocked,
      isSaved,
    };

    return updatedFields;
  } catch (error) {
    console.error(error);
  }
};

const formatResidentialProperty = ({
  payload,
  contacts = [],
  prospects = [],
  resourceLockedFields = get(resourceLockedFieldsMap, 'residentialProperty', {}),
  lockedFields = get(resourceLockedFieldsKey, 'residentialProperty', []),
  logger,
}) => {
  try {
    const mappedPayload = getSearchIntent(payload);
    logger.debug('payload details formatProperty');

    if (Array.isArray(mappedPayload)) {
      const tag = get(payload, 'tag', '');

      const data = mappedPayload.map((payloadEl) => {
        const isResourceLocked = getResourceLockedDetails({ lockedFields, contacts, payload: payloadEl });
        const isSaved = prospects.includes(get(payloadEl, '_id', ''));

        const formattedPayload = getFormattedPayload(payloadEl, [], resourceLockedFields);
        logger.debug({ formattedPayload }, 'formatted payload for reference');

        const updatedFields = {
          ...formattedPayload,
          isResourceLocked: [],
          lockedResourceDetails: [],
          isSaved,
        };

        return updatedFields;
      });

      if (isEmpty(tag)) {
        return data;
      }

      return {
        tag,
        data,
      };
    }

    const isResourceLocked = getResourceLockedDetails({ lockedFields, contacts, payload });
    const isSaved = prospects.includes(get(payload, '_id', ''));

    const formattedPayload = getFormattedPayload(payload, isResourceLocked, resourceLockedFields);

    const updatedFields = {
      ...formattedPayload,
      isResourceLocked: !isEmpty(isResourceLocked),
      lockedResourceDetails: isResourceLocked,
      isSaved,
    };

    return updatedFields;
  } catch (error) {
    console.error(error);
  }
};

const formatConnect = ({
  payload,
  contacts = [],
  prospects = [],
  resourceLockedFields = get(resourceLockedFieldsMap, 'connect', {}),
  lockedFields = get(resourceLockedFieldsKey, 'connect', []),
  logger,
}) => {
  try {
    const mappedPayload = getSearchIntent(payload);
    logger.debug('payload details formatConnect');

    if (Array.isArray(mappedPayload)) {
      const tag = get(payload, 'tag', '');

      const data = mappedPayload.map((payloadEl) => {
        const isResourceLocked = getResourceLockedDetails({ lockedFields, contacts, payload: payloadEl });
        const isSaved = prospects.includes(get(payloadEl, '_id', ''));

        const formattedPayload = getFormattedPayload(payloadEl, isResourceLocked, resourceLockedFields);
        logger.debug({ formattedPayload }, 'formatted payload for reference');

        const updatedFields = {
          ...formattedPayload,
          isResourceLocked: !isEmpty(isResourceLocked),
          lockedResourceDetails: isResourceLocked,
          isSaved,
        };

        return updatedFields;
      });

      if (isEmpty(tag)) {
        return data;
      }

      return {
        tag,
        data,
      };
    }

    const isResourceLocked = getResourceLockedDetails({ lockedFields, contacts, payload });
    const isSaved = prospects.includes(get(payload, '_id', ''));

    const formattedPayload = getFormattedPayload(payload, isResourceLocked, resourceLockedFields);

    const updatedFields = {
      ...formattedPayload,
      isResourceLocked: !isEmpty(isResourceLocked),
      lockedResourceDetails: isResourceLocked,
      isSaved,
    };

    return updatedFields;
  } catch (error) {
    console.error(error);
  }
};

const formatUnit = ({ payload }) => {
  return payload;
};

export const formatDataForContact = (filteredResources, payload, userId) => {
  return filteredResources.map((resource) => {
    const found = payload.find((el) => el.resourceId === resource.data._id);
    const type = get(found, 'resourceSubType', '');

    let dataToReturn;

    if (type === CtxSearch.ORGANIZATION) {
      const resourceName = get(resource, 'data.companyName', '');
      const name = get(resource, 'data.companyName', '');
      const phone = get(resource, 'data.otherCompanyInfo.headOfficeNumber', '');
      const email = get(resource, 'data.companyEmail', '');
      const industry = get(resource, 'data.otherCompanyInfo.industryType', '');

      const unlockedFields = get(found, 'unlockedFields', []);

      dataToReturn = {
        resourceName,
        name,
        email,
        phone,
        industry,
        type,
        resourceType: found.resourceType,
        resourceSubType: found.resourceSubType,
        resourceId: found.resourceId,
        userId,
        unlockedFields: unlockedFields,
      };
    }

    if (type === CtxSearch.PROPERTY) {
      const resourceName = get(resource, 'data.buildingName', '');
      const name = get(resource, 'data.buildingName', '');
      const phone = get(resource, 'data.representativeInfo[0].contactNumber', '');
      const email = get(resource, 'data.representativeInfo[0].emailId', '');
      const industry = get(resource, 'data.industryType', 'Real Estate');

      const unlockedFields = get(found, 'unlockedFields', []);

      dataToReturn = {
        resourceName,
        name,
        email,
        phone,
        industry,
        type,
        resourceType: found.resourceType,
        resourceSubType: found.resourceSubType,
        resourceId: found.resourceId,
        userId,
        unlockedFields: unlockedFields,
      };
    }

    if (type === CtxSearch.CONNECT) {
      const resourceName = get(resource, 'data.personalInfo.personName', '');
      const name = get(resource, 'data.personalInfo.personName', '');
      const phone = get(resource, 'data.personalInfo.contactNumber', '');
      const email = get(resource, 'data.personalInfo.emailId', '');
      const industry = get(resource, 'data.additionalConnectInfo.currrentIndustry', '');

      const unlockedFields = get(found, 'unlockedFields', []);

      dataToReturn = {
        resourceName,
        name,
        email,
        phone,
        industry,
        type,
        resourceType: found.resourceType,
        resourceSubType: found.resourceSubType,
        resourceId: found.resourceId,
        userId,
        unlockedFields: unlockedFields,
      };
    }

    if (type === CtxSearch.UNIT) {
      const resourceName = get(resource, 'data.purchaserInfo.personName', '');
      const name = get(resource, 'data.purchaserInfo.personName', '');
      const phone = get(resource, 'data.purchaserInfo.contactNumber', '');
      const email = get(resource, 'data.purchaserInfo.emailId', '');
      const industry = get(resource, 'data.additionalConnectInfo.currrentIndustry', '');

      const unlockedFields = get(found, 'unlockedFields', []);

      dataToReturn = {
        resourceName,
        name,
        email,
        phone,
        industry,
        type,
        resourceType: found.resourceType,
        resourceSubType: found.resourceSubType,
        resourceId: found.resourceId,
        userId,
        unlockedFields: unlockedFields,
      };
    }

    return dataToReturn;
  });
};

export const resourceDetailsFromSearch = (payload, ctx) => {
  try {
    // define search intent and map payload
    // /search                - { tag: data: { result: [] } }
    // /{tag}/:id             - { ...details }
    // /{tag}/:id?rel={type}  - [{ ...details }]

    let _resourceType;
    if (ctx === 'organization' || ctx === 'connect') {
      _resourceType = 'commercial';
    }

    const _payload = getSearchIntent(payload);

    if (Array.isArray(_payload)) {
      return _payload.map((el) => {
        const resourceId = get(el, '_id', '');
        const resourceType = lowerCase(get(el, 'buildingType', ''))
          ? lowerCase(get(el, 'buildingType', ''))
          : _resourceType;

        return {
          resourceId,
          resourceType,
          resourceSubType: ctx,
        };
      });
    }

    return [
      {
        resourceId: payload._id,
        resourceType: payload.buildingType || _resourceType,
        resourceSubType: ctx,
      },
    ];
  } catch (error) {
    console.error(error);
  }
};

const getResourceLockedDetails = ({ lockedFields, contacts, payload }) => {
  const contact = contacts.find((contact) => get(contact, 'resourceId', '') === get(payload, '_id', ''));
  const unlockedFields = get(contact, 'unlockedFields', []);
  const locked = lockedFields.filter((field) => !unlockedFields.includes(field));
  if (isEmpty(locked)) return {};

  return {
    lockedFields: locked,
  };
};

export const getFormattedPayload = (payload, toMask, lockedSchema) => {
  if (isEmpty(toMask)) return payload;

  const lockedFields = get(toMask, 'lockedFields', []);
  const details = pick(payload, lockedFields, []);
  const updatedDetails = Object.entries(details).reduce((acc, [key, value]) => {
    if (Array.isArray(value)) {
      return {
        ...acc,
        [key]: value.map((val) => mapValueToCustomObj(lockedSchema[key], val)),
      };
    }

    return {
      ...acc,
      [key]: mapValueToCustomObj(lockedSchema[key], value),
    };
  }, {});

  return {
    ...payload,
    ...updatedDetails,
  };
};

const getSearchIntent = (payload) => {
  let mappedPayload;

  if (!isEmpty(get(payload, 'tag', ''))) {
    const { tag } = payload;
    if (tag === 'organization') {
      mappedPayload = get(payload, 'data', []);
    }
    if (tag === 'connect') {
      mappedPayload = get(payload, 'data', []);
    }
    if (tag === 'property') {
      mappedPayload = get(payload, 'data', []);
    }

    if (tag === 'commercialProperty') {
      mappedPayload = get(payload, 'data', []);
    }
    if (tag === 'residentialProperty') {
      mappedPayload = get(payload, 'data', []);
    }
  }

  if (Array.isArray(payload)) {
    mappedPayload = payload;
  }

  return mappedPayload;
};

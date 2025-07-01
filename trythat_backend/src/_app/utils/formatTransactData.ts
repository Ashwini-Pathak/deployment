import { difference, get } from 'lodash';

import { CtxSearch } from '../../search/enum/ctx-search.enum';
import { resourceLockedFieldsMap, resourceLockedFieldsKey } from './resourceLockedFields';
import { getFormattedPayload } from './formatSearchData';

export const formatTransactData = ({ ctx, payload }) => {
  switch (ctx) {
    case CtxSearch.ORGANIZATION:
      return formatOrganization({
        payload,
        toMask: get(resourceLockedFieldsKey, 'organization', []),
        lockedSchema: get(resourceLockedFieldsMap, 'organization'),
      });

    default:
      return payload;
  }
};

const formatOrganization = ({ payload, toMask, lockedSchema }) => {
  const { unlockedFields } = payload;
  const dataToMask = { lockedFields: difference(toMask, unlockedFields) };

  const formattedData = getFormattedPayload(payload, dataToMask, lockedSchema);

  return formattedData;
};

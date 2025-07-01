export const mapTagToCtx = (tag) => {
  const ctxMap = {
    property: 'property',
    organization: 'organization',
    connect: 'connect',
    unit: 'Unit',
    residentialProperty: 'residentialProperty',
    commercialProperty: 'commercialProperty',
  };

  return ctxMap[tag];
};

export const mapRelToCtx = (rel) => {
  const relMap = {
    props: 'property',
    orgs: 'organization',
    connects: 'connect',
    units: 'units',
  };

  return relMap[rel];
};

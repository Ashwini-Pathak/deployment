export const resourceLockedFieldsMap = {
  organization: {
    propertyEngagement: { startDate: 'locked', endDate: 'locked' },
    directorInfo: { contactNumber: 'locked', emailId: 'locked' },
  },
  connect: {
    personalInfo: { contactNumber: 'locked', emailId: 'locked' },
  },
  property: {
    representativeInfo: {
      emailId: 'locked',
      contactNumber: 'locked',
    },
  },
};

export const resourceLockedFieldsKey = {
  organization: ['propertyEngagement', 'directorInfo'],
  connect: ['personalInfo'],
  property: ['representativeInfo'],
};

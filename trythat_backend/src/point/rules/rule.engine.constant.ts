export const pointAssignmentRule = [
  {
    conditions: {
      all: [
        {
          fact: 'step',
          operator: 'equal',
          value: 'personalDetails',
        },
        {
          fact: 'status',
          operator: 'equal',
          value: false,
        },
        {
          fact: 'completion',
          operator: 'equal',
          value: 100,
        },
      ],
    },
    event: {
      type: 'credit',
      params: {
        points: 50,
        step: 'personalDetails',
      },
    },
  },
  {
    conditions: {
      all: [
        {
          fact: 'step',
          operator: 'equal',
          value: 'professionalDetails',
        },
        {
          fact: 'status',
          operator: 'equal',
          value: false,
        },
        {
          fact: 'completion',
          operator: 'equal',
          value: 100,
        },
      ],
    },
    event: {
      type: 'credit',
      params: {
        points: 50,
        step: 'professionalDetails',
      },
    },
  },
  {
    conditions: {
      all: [
        {
          fact: 'step',
          operator: 'equal',
          value: 'geoLocation',
        },
        {
          fact: 'status',
          operator: 'equal',
          value: false,
        },
        {
          fact: 'completion',
          operator: 'equal',
          value: 100,
        },
      ],
    },
    event: {
      type: 'credit',
      params: {
        points: 50,
        step: 'geoLocation',
      },
    },
  },
  {
    conditions: {
      all: [
        {
          fact: 'step',
          operator: 'equal',
          value: 'offerings',
        },
        {
          fact: 'status',
          operator: 'equal',
          value: false,
        },
        {
          fact: 'completion',
          operator: 'equal',
          value: 100,
        },
      ],
    },
    event: {
      type: 'credit',
      params: {
        points: 50,
        step: 'offerings',
      },
    },
  },
  {
    conditions: {
      all: [
        {
          fact: 'step',
          operator: 'equal',
          value: 'preferences',
        },
        {
          fact: 'status',
          operator: 'equal',
          value: false,
        },
        {
          fact: 'completion',
          operator: 'equal',
          value: 100,
        },
      ],
    },
    event: {
      type: 'credit',
      params: {
        points: 50,
        step: 'preferences',
      },
    },
  },
];

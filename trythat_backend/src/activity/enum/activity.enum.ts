export enum ActivityType {
  LEADGEN = 'leadgen',
  UNIVERSAL = 'universal',
}

export enum ActivitySubType {
  REGISTER = 'onboarding: registration',
  geoLocation = 'onboarding: geo location',
  professionalDetails = 'onboarding: professional details',
  personalDetails = 'onboarding: personal details',
  offerings = 'onboarding: offerings',
  preferences = 'onboarding: preferences',
  currentPlanDetails = 'onboarding: current plan details',
  PAYMENT = 'payment',
}

export enum ActivityAction {
  CREDIT = 'points credited',
  DEBIT = 'points debited',
  EMAIL = 'email sent',
  CONNECT = 'connects unlocked',
}

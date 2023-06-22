export const tokenKey = 'authToken';

export const userType = {
  CUSTOMER: 'CUSTOMER',
  OWNER: 'OWNER',
  ADMIN: 'ADMIN'
};

export const apiDomains = {
  AUTH: '/auth',
  PROPERTY: '/properties',
  OWNER: '/users',
  OFFER: '/users/offers',
  MESSAGE: '/messages'
};

export const propertyStatus = {
  AVAILABLE: 'AVAILABLE',
  PENDING: 'PENDING',
  CONTINGENT: 'CONTINGENT',
  SOLD: 'SOLD'
};

export const offerStatus = {
  PENDING: 'PENDING',
  ACCEPT: 'ACCEPT',
  CANCEL: 'CANCEL'
};
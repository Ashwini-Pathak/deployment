export default () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  environment: process.env.NODE_ENV,
  logLevel: process.env.LOG_LEVEL,

  database: {
    host: process.env.DB_URI,
    port: parseInt(process.env.DB_PORT, 10) || 27017,
  },

  twilioAccountSID: process.env.TWILIO_ACCOUNT_SID,
  twilioAuthToken: process.env.TWILIO_AUTH_TOKEN,
  twilioServiceSID: process.env.TWILIO_SERVICE_SID,

  jwtSecretKey: process.env.JWT_SECRET_KEY,
  jwtExpiry: parseInt(process.env.JWT_EXPIRY),

  mailHost: process.env.MAIL_HOST,
  mailPort: parseInt(process.env.mailPort),
  mailUser: process.env.MAIL_USER,
  mailPassword: process.env.MAIL_PASSWORD,
  mailFrom: process.env.MAIL_FROM,
  mailTransport: process.env.MAIL_TRANSPORT,

  linkedinClientID: process.env.LINKEDIN_CLIENTID,
  linkedinClientSecret: process.env.LINKEDIN_CLIENTSECRET,
  linkedinScope: process.env.LINKEDIN_SCOPE.split(','),

  GOOGLE_API_KEY: process.env.GOOGLE_API_KEY,
  GOOGLE_MAPS_API_URL: process.env.GOOGLE_MAPS_API_URL,

  FRONTEND_URL: process.env.FRONTEND_URL,
  HOST_URL: process.env.HOST_URL,

  COMETCHAT_APPID: process.env.REACT_APP__COMETCHAT_APPID,
  COMETCHAT_REGION: process.env.REACT_APP__COMETCHAT_REGION,
  COMETCHAT_AUTHKEY: process.env.REACT_APP__COMETCHAT_AUTHKEY,

  AWS_ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID,
  AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY,
  IMAGE_UPLOAD_BUCKET: process.env.IMAGE_UPLOAD_BUCKET,

  R_ENGINE_HOST: process.env.R_ENGINE_HOST,

  CRM_HOST_URL: process.env.CRM_HOST_URL,
  CRM_UI_URL: process.env.CRM_UI_URL,
  CRM_LOGIN_KEY: process.env.CRM_LOGIN_KEY,
  CRM_ORGANIZATION: process.env.CRM_ORGANIZATION,
  CRM_ENCRYPTION_KEY: process.env.CRM_ENCRYPTION_KEY,
  CRM_SECRET_KEY: process.env.CRM_SECRET_KEY,

  OKR_HOST_URL: process.env.OKR_HOST_URL,
  OKR_UI_URL: process.env.OKR_UI_URL,
  OKR_ORGANIZATION: process.env.OKR_ORGANIZATION,
  OKR_SECRET_KEY: process.env.OKR_SECRET_KEY,
});

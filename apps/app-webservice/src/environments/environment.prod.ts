// eslint-disable-next-line @typescript-eslint/no-unused-vars
const packageDotJson = require('../../../../package.json');

export const environment = {
  production: true,
  passwordHashSalt: process.env.WEBSERVICE_PASSWORD_HASH_SALT || 'SALT',
  jwtSecret: process.env.WEBSERVICE_JWT_SECRET || 'secret',
  jwtExpirationTime: process.env.WEBSERVICE_JWT_EXPIRATION_TIME || '48h',
  schema: process.env.WEBSERVICE_SCHEMA || 'https',
  host: process.env.WEBSERVICE_HOST || 'localhost',
  port: process.env.WEBSERVICE_PORT || 3333,
  solutionName: `${packageDotJson.name.charAt(0).toUpperCase()}${packageDotJson.name.slice(1).split('-').join(' ')}`,
  webappUrl: process.env.WEBSERVICE_WEBAPP_URL || '',
  version: packageDotJson.version,
  emailSenderAddress: process.env.WEBSERVICE_EMAIL_SENDER_ADDRESS || '',
  emailSenderName: process.env.WEBSERVICE_EMAIL_SENDER_NAME || '',
  emailSenderLogin: process.env.WEBSERVICE_EMAIL_SENDER_LOGIN || '',
  emailSenderPassword: process.env.WEBSERVICE_EMAIL_SENDER_PASSWORD || '',
  emailSenderSmtpHost: process.env.WEBSERVICE_EMAIL_SENDER_SMTP_HOST || '',
  emailSenderSmtpPort: Number(process.env.WEBSERVICE_EMAIL_SENDER_SMTP_PORT) || 465,
  databaseHost: process.env.WEBSERVICE_DATABASE_HOST || '',
  databasePort: process.env.WEBSERVICE_DATABASE_PORT || 3306,
  databaseName: process.env.WEBSERVICE_DATABASE_NAME || '',
  databaseLogin: process.env.WEBSERVICE_DATABASE_LOGIN || '',
  databasePassword: process.env.WEBSERVICE_DATABASE_PASSWORD || '',
  supportEmailAddress: process.env.WEBSERVICE_SUPPORT_EMAIL_ADDRESS || '',
};

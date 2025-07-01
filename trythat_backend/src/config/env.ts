import { IsDefined, IsEnum, IsNumber, IsString, IsOptional } from 'class-validator';

enum Environment {
  Development = 'development',
  Production = 'production',
  Test = 'test',
  Provision = 'provision',
  UAT = 'uat',
}

export class EnvironmentVariables {
  @IsEnum(Environment)
  NODE_ENV: Environment;

  @IsNumber()
  PORT: number;

  @IsString()
  LOG_LEVEL;

  @IsDefined()
  FRONTEND_URL;

  @IsDefined()
  HOST_URL;

  @IsDefined()
  DB_URI;

  @IsDefined()
  JWT_SECRET_KEY;

  @IsDefined()
  JWT_EXPIRY;

  @IsDefined()
  MAIL_HOST;

  @IsDefined()
  MAIL_USER;

  @IsDefined()
  MAIL_PASSWORD;

  @IsDefined()
  MAIL_FROM;

  @IsDefined()
  MAIL_PORT;

  @IsDefined()
  LINKEDIN_CLIENTID;

  @IsDefined()
  LINKEDIN_CLIENTSECRET;

  @IsDefined()
  LINKEDIN_SCOPE;

  @IsDefined()
  GOOGLE_API_KEY;

  @IsDefined()
  GOOGLE_MAPS_API_URL;

  @IsDefined()
  COMETCHAT_APPID;

  @IsDefined()
  COMETCHAT_REGION;

  @IsDefined()
  COMETCHAT_AUTHKEY;

  @IsDefined()
  R_ENGINE_HOST;

  @IsDefined()
  CRM_ENCRYPTION_KEY;

  @IsDefined()
  CRM_ORGANIZATION;

  @IsDefined()
  CRM_LOGIN_KEY;

  @IsDefined()
  CRM_HOST_URL;

  @IsDefined()
  CRM_UI_URL;

  @IsDefined()
  CRM_SECRET_KEY;

  @IsDefined()
  AWS_ACCESS_KEY_ID;

  @IsDefined()
  AWS_SECRET_ACCESS_KEY;

  @IsDefined()
  IMAGE_UPLOAD_BUCKET;

  @IsOptional()
  TWILIO_ACCOUNT_SID;

  @IsOptional()
  TWILIO_AUTH_TOKEN;

  @IsOptional()
  TWILIO_SERVICE_SID;
}

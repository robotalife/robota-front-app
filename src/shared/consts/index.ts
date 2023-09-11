const process = import.meta.env;

type EnvironmentType = 'development' | 'staging' | 'production';

const environment = process.VITE_NODE_ENV as EnvironmentType;

const envs = {
  development: 'VITE_DEVELOPMENT_BASE_URL',
  staging: 'VITE_STAGING_BASE_URL',
  production: 'VITE_PRODUCTION_BASE_URL',
} as { [k in EnvironmentType]: string };

export const appVersion = process.VITE_APP_VERSION;

export const API_BASE_URL = process[envs[environment]];

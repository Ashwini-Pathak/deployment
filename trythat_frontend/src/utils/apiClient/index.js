import axios from 'axios';
import { configKeys } from '../config';

export const client = axios.create({
  baseURL: configKeys.API_URL,
  headers: {
    Accept: 'application/json',
    'Content-type': 'application/json',
  },
});

// CONFIG FOR V2 CALLS
export const clientV2 = axios.create({
  baseURL: configKeys.API_URL_V2,
  headers: {
    Accept: 'application/json',
    'Content-type': 'application/json',
  },
});

export const docClient = axios.create({
  baseURL: configKeys.API_URL,
  headers: {
    Accept: 'application/json',
    'Content-type': 'multipart/form-data',
  },
});
export const docClientV2 = axios.create({
  baseURL: configKeys.API_URL_V2,
  headers: {
    Accept: 'application/json',
    'Content-type': 'multipart/form-data',
  },
});

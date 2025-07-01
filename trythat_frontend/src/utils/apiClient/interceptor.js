import { client, clientV2, docClient, docClientV2 } from './index';
import { nanoid } from '@reduxjs/toolkit';
import { persistor } from '../../redux/store';

const setUpInterceptor = (accessToken) => {
  const delay = (t) => new Promise((resolve) => setTimeout(resolve, t));
  const logout = () => {
    persistor.purge().then(() => {
      persistor.flush().then(() => {
        localStorage.clear();
        delay(5000);
        window.location.replace('/');
      });
    });
  };

  // GET ACCESS TOKEN HERE FROM STATE

  client.interceptors.request.use(
    async (config) => {
      const corelationId = nanoid();
      config.headers['x-correlation-id'] = corelationId;

      if (config.authorization !== false) {
        if (accessToken) {
          config.headers['Authorization'] = `Bearer ${accessToken}`;
          config.headers['x-user-id'] = `${corelationId}-getUserIDFromStore`;
        }
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    },
  );

  clientV2.interceptors.request.use(
    async (config) => {
      const corelationId = nanoid();
      config.headers['x-correlation-id'] = corelationId;

      if (config.authorization !== false) {
        if (accessToken) {
          config.headers['Authorization'] = `Bearer ${accessToken}`;
          config.headers['x-user-id'] = `${corelationId}-getUserIDFromStore`;
        }
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    },
  );

  docClient.interceptors.request.use(
    async (config) => {
      const corelationId = nanoid();
      config.headers['x-correlation-id'] = corelationId;

      if (config.authorization !== false) {
        if (accessToken) {
          config.headers['Authorization'] = `Bearer ${accessToken}`;
          config.headers['x-user-id'] = `${corelationId}-getUserIDFromStore`;
        }
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    },
  );
  docClientV2.interceptors.request.use(
    async (config) => {
      const corelationId = nanoid();
      config.headers['x-correlation-id'] = corelationId;

      if (config.authorization !== false) {
        if (accessToken) {
          config.headers['Authorization'] = `Bearer ${accessToken}`;
          config.headers['x-user-id'] = `${corelationId}-getUserIDFromStore`;
        }
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    },
  );

  // HANDLE GLOBAL RESPONSE HERE
  client.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response.status === 401) {
        logout();
      }
      return Promise.reject(error);
    },
  );
  clientV2.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response.status === 401) {
        logout();
      }
      return Promise.reject(error);
    },
  );
  docClient.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response.status === 401) {
        logout();
      }
      return Promise.reject(error);
    },
  );
  docClientV2.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response.status === 401) {
        logout();
      }
      return Promise.reject(error);
    },
  );
};

export default setUpInterceptor;

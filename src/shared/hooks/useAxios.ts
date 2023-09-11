import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { API_BASE_URL } from '../consts';
import routes from '../consts/routes';
import useNotify from './useNotify';

interface AxiosHookReturn {
  axios: AxiosInstance;
}

const instance: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

const token = localStorage.getItem('token');

export default function useAxios(): AxiosHookReturn {
  const notify = useNotify();
  const { pathname } = window.location;

  instance.interceptors.response.use(
    (response: AxiosResponse) => {
      // Handle successful responses
      return response;
    },
    (error) => {
      // Handle errors
      const message = error.response?.data?.message || error.message || 'An error occurred';

      notify(message, 'error');

      if (error.response.status === 401 && pathname !== routes.signin) {
        localStorage.clear();
        delete instance.defaults.headers.common['Authorization'];
        window.location.href = routes.signin;
      }
      return Promise.reject(error);
    }
  );

  if (token) {
    instance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  }

  return {
    axios: instance,
  };
}

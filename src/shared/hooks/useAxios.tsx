import axios, { AxiosInstance, AxiosResponse } from "axios";
import { API_BASE_URL } from "../consts";
import { useSnackbar } from "notistack";

interface AxiosHookReturn {
  axios: AxiosInstance;
}

const instance: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default function useAxios(): AxiosHookReturn {
  const { enqueueSnackbar } = useSnackbar();

  instance.interceptors.response.use(
    (response: AxiosResponse) => {
      // Handle successful responses
      return response;
    },
    (error) => {
      // Handle errors
      const message =
        error.response?.data?.message || error.message || "An error occurred";
      enqueueSnackbar(message, {
        variant: "error",
        preventDuplicate: true,
      });
      return Promise.reject(error);
    }
  );

  return {
    axios: instance,
  };
}

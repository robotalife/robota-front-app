import axios, { AxiosInstance, AxiosResponse } from "axios";
import { useState } from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import { API_BASE_URL } from "../consts";

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

interface SnackbarState {
  open: boolean;
  message: string;
  severity: "success" | "error";
}

const instance: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default function useAxios() {
  const [snackbarState, setSnackbarState] = useState<SnackbarState>({
    open: false,
    message: "",
    severity: "success",
  });

  instance.interceptors.response.use(
    (response: AxiosResponse) => {
      // Handle successful responses
      setSnackbarState({
        open: true,
        message: "Request successful",
        severity: "success",
      });
      return response;
    },
    (error) => {
      // Handle errors
      const message =
        error.response?.data?.message || error.message || "An error occurred";
      setSnackbarState({
        open: true,
        message,
        severity: "error",
      });
      return Promise.reject(error);
    }
  );

  const handleCloseSnackbar = () => {
    setSnackbarState({
      ...snackbarState,
      open: false,
    });
  };

  return {
    axios: instance,
    Snackbar: (
      <Snackbar
        open={snackbarState.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert severity={snackbarState.severity}>{snackbarState.message}</Alert>
      </Snackbar>
    ),
  };
}

import { useSnackbar } from "notistack";

export type NotifyVariant =
  | "default"
  | "error"
  | "info"
  | "success"
  | "warning";

const useNotify = () => {
  const { enqueueSnackbar } = useSnackbar();

  const notify = (message: string, variant: NotifyVariant = "error") => {
    enqueueSnackbar(message, {
      variant: variant,
      preventDuplicate: true,
    });
  };

  return notify;
};

export default useNotify;

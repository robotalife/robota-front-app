import { Grid } from "@mui/material";
import { AxiosResponse } from "axios";
import apiEndPoints from "../../shared/consts/apiEndpoints";
import useAxios from "../../shared/hooks/useAxios";
import { Form, Formik } from "formik";
import Fieldset from "../../components/formElements/Fieldset";
import FieldsetElement from "../../components/formElements/FieldsetElement";
import TextField from "../../components/formElements/TextField";
import { IconMail } from "../../shared/icons/Icons";
import Button from "../../components/formElements/Button";
import ToggleButtonGroup from "../../components/formElements/ToggleButtonGroup";
import { notificationType } from "../../shared/consts/botCreateItems";
import { boolean } from "yup";
import { useEffect, useState } from "react";
import useNotify from "../../shared/hooks/useNotify";

interface IExchangeNotifications {
  open: boolean;
  close: boolean;
  error: boolean;
}

const ExchangeNotifications = () => {
  const notify = useNotify();
  const { axios } = useAxios();

  const [notificationConfig, setNotificationConfig] =
    useState<IExchangeNotifications>({
      open: true,
      close: false,
      error: false,
    });

  const submitChange = async (endpoint: string, value: string) => {
    // try {
    //   const response: AxiosResponse<any, any> = await axios.delete(
    //     `${apiEndPoints.exchange}/${id}`
    //   );
    //   notify("Settings changed", "success");
    // } catch (error) {
    //   // Handle error
    // }
  };

  return (
    <Grid container>
      <Grid item xs={12} md={4} xl={3}>
        <Fieldset legend="Bot messages" />
      </Grid>
      <Grid item xs={12} md={8} xl={9}>
        <FieldsetElement label="Open Trade">
          <ToggleButtonGroup
            options={notificationType}
            value={notificationConfig.open}
            id="openTrade"
            onChange={(e, i) =>
              setNotificationConfig({ ...notificationConfig, open: i })
            }
          />
        </FieldsetElement>
        <FieldsetElement label="Close Trade">
          <ToggleButtonGroup
            options={notificationType}
            value={notificationConfig.close}
            id="closeTrade"
            onChange={(e, i) =>
              setNotificationConfig({ ...notificationConfig, close: i })
            }
          />
        </FieldsetElement>
        <FieldsetElement label="Errors">
          <ToggleButtonGroup
            options={notificationType}
            value={notificationConfig.error}
            id="error"
            onChange={(e, i) =>
              setNotificationConfig({ ...notificationConfig, error: i })
            }
          />
        </FieldsetElement>
      </Grid>
    </Grid>
  );
};

export default ExchangeNotifications;

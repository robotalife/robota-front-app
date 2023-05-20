import { Grid, Paper, Typography } from "@mui/material";
import FieldsetElement from "../../components/formElements/FieldsetElement";
import TextField from "../../components/formElements/TextField";
import Button from "../../components/formElements/Button";
import { FormEvent, useContext, useState } from "react";
import { AuthContext } from "../../shared/providers/AuthProvider";
import useAxios from "../../shared/hooks/useAxios";
import { AxiosResponse } from "axios";
import apiEndPoints from "../../shared/consts/apiEndpoints";
import useNotify from "../../shared/hooks/useNotify";
import CustomRadioButtonsGroup from "../../components/formElements/CustomRadioButtonsGroup";
import ExchangeRadioContent from "../../components/pageSpecific/ExchangeRadioContent";
import { IconBinance, IconKucoin } from "../../shared/icons/Icons";

const NewExchange = () => {
  const { userId } = useContext(AuthContext);
  const { axios } = useAxios();
  const notify = useNotify();

  const [formData, setFormData] = useState<{
    userId: string | null;
    apiKey: string;
    apiSecret: string;
    exchangeName: string;
    exchangeType: string;
    passPhrase: string | null;
  }>({
    userId,
    apiKey: "",
    apiSecret: "",
    exchangeName: "",
    exchangeType: "",
    passPhrase: null,
  });

  const items = [
    {
      label: (
        <ExchangeRadioContent
          title="Binance Futures"
          icon={<IconBinance />}
          info="New to Binance Futures?"
          linkText="Learn how to create an API key on Binance"
          linkHref="/"
        />
      ),
      value: "BINANCE_FUTURES",
    },
    {
      label: (
        <ExchangeRadioContent
          title="Binance"
          icon={<IconBinance />}
          info="New to Binance?"
          linkText="Learn how to create an API key on Binance"
          linkHref="/"
        />
      ),
      value: "BINANCE",
    },
    {
      label: (
        <ExchangeRadioContent
          title="Kucoin"
          icon={<IconKucoin />}
          info="New to Kucoin?"
          linkText="Learn how to create an API key on Kucoin"
          linkHref="/"
        />
      ),
      value: "KUCOIN",
    },
  ];

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response: AxiosResponse<any, any> = await axios.post(
        apiEndPoints.exchange,
        formData
      );

      notify("The exchange added successfully", "info");
    } catch (error) {
      // Handle error
    }
  };

  return (
    <Grid container>
      <Grid item xs={12} md={6} lg={8} xl={5}>
        <form noValidate onSubmit={(e) => handleSubmit(e)}>
          <FieldsetElement label="Select your exchange">
            <CustomRadioButtonsGroup
              items={items}
              name="exchangeType"
              onChange={(e) =>
                setFormData({ ...formData, exchangeType: e.target.value })
              }
            />
          </FieldsetElement>
          <FieldsetElement label="Account Label">
            <TextField
              name="name"
              type="text"
              message="Example : John Smitt - Binance account"
              required
              onChange={(e) =>
                setFormData({ ...formData, exchangeName: e.target.value })
              }
            />
          </FieldsetElement>
          <FieldsetElement label="API Key">
            <TextField
              name="apiKey"
              type="text"
              required
              onChange={(e) =>
                setFormData({ ...formData, apiKey: e.target.value })
              }
            />
          </FieldsetElement>
          <FieldsetElement label="Secret Key">
            <TextField
              name="apiSecret"
              type="text"
              required
              onChange={(e) =>
                setFormData({ ...formData, apiSecret: e.target.value })
              }
            />
          </FieldsetElement>
          <Grid container spacing={2}>
            <Grid item xs={6} md={"auto"}>
              <Button type="submit" variant="contained" size="small" fullWidth>
                Connect Exchangev
              </Button>
            </Grid>
            <Grid item xs={6} md={"auto"}>
              <Button type="button" variant="outlined" size="small" fullWidth>
                Back
              </Button>
            </Grid>
          </Grid>
        </form>
      </Grid>
    </Grid>
  );
};

export default NewExchange;

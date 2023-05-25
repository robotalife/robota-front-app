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
import useReturnTo from "../../shared/hooks/useReturnTo";
import { useNavigate } from "react-router-dom";
import routes from "../../shared/consts/routes";
import ViewArticle from "../../components/pageSpecific/ViewArticle";

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

const NewExchange = () => {
  const { userId } = useContext(AuthContext);
  const { axios } = useAxios();
  const navigate = useNavigate();
  const returnTo = useReturnTo();
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

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response: AxiosResponse<any, any> = await axios.post(
        apiEndPoints.exchange,
        formData
      );

      notify("The exchange added successfully", "info");
      goBack();
    } catch (error) {
      // Handle error
    }
  };

  const goBack = () => {
    navigate(returnTo || routes.exchangeList);
  };

  return (
    <Grid container maxWidth={"xl"}>
      <Grid container columnSpacing={7}>
        <Grid item xs={12} lg={6}>
          <form
            noValidate
            onSubmit={(e) => handleSubmit(e)}
            id="newExchangeForm"
          >
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
          </form>
        </Grid>
        <Grid item xs={12} lg={6}>
          <ViewArticle
            exchange={formData.exchangeType === "KUCOIN" ? "Kucoin" : "Binance"}
            link={formData.exchangeType === "KUCOIN" ? "/" : "/"}
          />
        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={2}>
            <Grid item xs={6} md={"auto"}>
              <Button
                type="submit"
                variant="contained"
                size="small"
                fullWidth
                form="newExchangeForm"
              >
                Connect Exchange
              </Button>
            </Grid>
            <Grid item xs={6} md={"auto"}>
              <Button
                type="button"
                variant="outlined"
                size="small"
                fullWidth
                onClick={goBack}
              >
                Back
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default NewExchange;

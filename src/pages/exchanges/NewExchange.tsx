import { Grid } from "@mui/material";
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
import { IconBinance } from "../../shared/icons/Icons";
import useReturnTo from "../../shared/hooks/useReturnTo";
import { useNavigate } from "react-router-dom";
import routes from "../../shared/consts/routes";
import ViewArticle from "../../components/pageSpecific/ViewArticle";
import {
  newExchangeApiKeyStringSchema,
  newExchangeLabelKeyStringSchema,
  newExchangeSecretKeyStringSchema,
  validationSchema,
} from "../../shared/consts/validations";
import { Form, Formik } from "formik";

interface INewExchangeFormData {
  exchangeName: string;
  apiKey: string;
  apiSecret: string;
}

const items = [
  {
    label: (
      <ExchangeRadioContent
        title="Binance Futures"
        icon={<IconBinance />}
        info=""
        linkText=""
        linkHref="/"
      />
    ),
    value: "BINANCE_FUTURES",
  },
  // {
  //   label: (
  //     <ExchangeRadioContent
  //       title="Binance"
  //       icon={<IconBinance />}
  //       info="New to Binance?"
  //       linkText="Learn how to create an API key on Binance"
  //       linkHref="/"
  //     />
  //   ),
  //   value: "BINANCE",
  // },
  // {
  //   label: (
  //     <ExchangeRadioContent
  //       title="Kucoin"
  //       icon={<IconKucoin />}
  //       info="New to Kucoin?"
  //       linkText="Learn how to create an API key on Kucoin"
  //       linkHref="/"
  //     />
  //   ),
  //   value: "KUCOIN",
  // },
];

const validations = validationSchema({
  apiKey: newExchangeApiKeyStringSchema,
  apiSecret: newExchangeSecretKeyStringSchema,
  exchangeName: newExchangeLabelKeyStringSchema,
});

const initialValues: INewExchangeFormData = {
  apiKey: "",
  apiSecret: "",
  exchangeName: "",
};

const NewExchange = () => {
  const { userId } = useContext(AuthContext);
  const { axios } = useAxios();
  const navigate = useNavigate();
  const returnTo = useReturnTo();
  const notify = useNotify();

  const constFormData = {
    userId,
    exchangeType: "BINANCE_FUTURES",
    passPhrase: null,
  };

  const handleSubmit = async (values: INewExchangeFormData) => {
    try {
      const response: AxiosResponse<any, any> = await axios.post(
        apiEndPoints.exchange,
        {
          ...constFormData,
          ...values,
        }
      );

      notify("The exchange added successfully", "info");
      navigate(routes.botsNew);
      // goBack();
    } catch (error) {
      // Handle error
    }
  };

  const goBack = () => {
    if (returnTo === routes.signin) {
      return navigate(routes.exchangeList);
    } else {
      navigate(returnTo || routes.exchangeList);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validations}
      onSubmit={(values, { setSubmitting }) => {
        handleSubmit(values);
        setSubmitting(false);
      }}
    >
      {({ values, handleChange, errors, touched }) => (
        <Form noValidate style={{ width: "100%" }} id="newExchangeForm">
          <Grid container maxWidth={"xl"}>
            <Grid container columnSpacing={7}>
              <Grid item xs={12} lg={6}>
                <FieldsetElement label="Select your exchange">
                  <CustomRadioButtonsGroup
                    items={items}
                    name="exchangeType"
                    value={constFormData.exchangeType}
                  />
                </FieldsetElement>
                <FieldsetElement label="Account Label">
                  <TextField
                    name="exchangeName"
                    type="text"
                    value={values.exchangeName}
                    onChange={handleChange}
                    placeholder="Example : John Smitt - Binance account"
                    required
                    error={Boolean(errors.exchangeName && touched.exchangeName)}
                    helperText={
                      errors.exchangeName &&
                      touched.exchangeName &&
                      errors.exchangeName
                    }
                  />
                </FieldsetElement>
                <FieldsetElement label="API Key">
                  <TextField
                    name="apiKey"
                    type="text"
                    value={values.apiKey}
                    onChange={handleChange}
                    required
                    error={Boolean(errors.apiKey && touched.apiKey)}
                    helperText={
                      errors.apiKey && touched.apiKey && errors.apiKey
                    }
                  />
                </FieldsetElement>
                <FieldsetElement label="Secret Key">
                  <TextField
                    name="apiSecret"
                    type="text"
                    value={values.apiSecret}
                    onChange={handleChange}
                    required
                    error={Boolean(errors.apiSecret && touched.apiSecret)}
                    helperText={
                      errors.apiSecret && touched.apiSecret && errors.apiSecret
                    }
                  />
                </FieldsetElement>
                {constFormData.exchangeType === "KUCOIN" && (
                  <FieldsetElement label="Passphrase">
                    <TextField
                      name="apiSecret"
                      type="text"
                      required
                      // onChange={(e) =>
                      //   setFormData({
                      //     ...formData,
                      //     passPhrase: e.target.value,
                      //   })
                      // }
                    />
                  </FieldsetElement>
                )}
              </Grid>
              <Grid item xs={12} lg={6}>
                <ViewArticle
                  exchange={
                    constFormData.exchangeType === "KUCOIN"
                      ? "Kucoin"
                      : "Binance"
                  }
                  link={
                    constFormData.exchangeType === "KUCOIN"
                      ? "/"
                      : "https://www.binance.com/en-BH/support/faq/how-to-create-api-360002502072"
                  }
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
        </Form>
      )}
    </Formik>
  );
};

export default NewExchange;

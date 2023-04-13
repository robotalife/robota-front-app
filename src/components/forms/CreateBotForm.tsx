import Grid from "@mui/material/Grid";
import { Form, Formik } from "formik";
import { IconDollar, IconHexagon } from "../../shared/icons/Icons";
import Button from "../formElements/Button";
import Fieldset from "../formElements/Fieldset";
import FieldsetElement from "../formElements/FieldsetElement";
import TextField from "../formElements/TextField";
import ToggleButtonGroup from "../formElements/ToggleButtonGroup";

import {
  newBotAccess,
  newBotLeverage,
  newBotLeverageType,
  newBotStartegy,
} from "../../shared/consts/botCreateItems";
import {
  newBotAccessSchema,
  newBotLeverageSchema,
  newBotLeverageTypeSchema,
  newBotNumberSchema,
  newBotStrategySchema,
  newBotStringSchema,
  validationSchema,
} from "../../shared/consts/validations";
import apiEndPoints from "../../shared/consts/apiEndpoints";
import { AxiosResponse } from "axios";
import useAxios from "../../shared/hooks/useAxios";
import ComboBox from "../formElements/ComboBox";
import { useContext } from "react";
import { ExchangeContext } from "../../shared/providers/ExchangeProvider";

const dataTmp = {
  name: "bot name",
  exchangeId: "ebb84d68-8966-4f39-ac10-1ab8d353e6d6",
  configuration: {
    access: "PRIVATE",
    botName: "132",
    leverageType: "ISOLATED",
    leverageValue: 1,
    maxAmountForBotUsage: "4",
    minAmountForBotUsage: "3",
    monthlyPrice: "5",
    orderStrategy: "SHORT",
    pair: "BTC_USDT",
    yearlyPrice: "6",
  },
};

const validations = validationSchema({
  name: newBotStringSchema,
  exchangeId: newBotStringSchema,
  access: newBotAccessSchema,
  botName: newBotStringSchema,
  leverageType: newBotLeverageTypeSchema,
  leverageValue: newBotLeverageSchema,
  maxAmountForBotUsage: newBotNumberSchema,
  minAmountForBotUsage: newBotNumberSchema,
  monthlyPrice: newBotNumberSchema,
  orderStrategy: newBotStrategySchema,
  pair: newBotNumberSchema,
  yearlyPrice: newBotNumberSchema,
});

interface INewBotInterface {
  name: string;
  exchangeId: string;
  access: "PUBLIC" | "PRIVATE";
  botName: string;
  leverageType: "CROSS" | "ISOLATED";
  leverageValue: number;
  maxAmountForBotUsage: number;
  minAmountForBotUsage: number;
  monthlyPrice: number;
  orderStrategy: "SHORT" | "LONG";
  pair: number;
  yearlyPrice: number;
}

const initialValues: any = {
  botName: "",
  name: "",
  exchangeId: "",
  pair: "",
  orderStrategy: "LONG",
  access: "PRIVATE",
  leverageType: "CROSS",
  leverageValue: 1,
  minAmountForBotUsage: 1000,
  maxAmountForBotUsage: 5000,
  monthlyPrice: 30,
  yearlyPrice: 24,
};

const CreateBotForm = () => {
  const { axios } = useAxios();
  const { exchangeList } = useContext(ExchangeContext);

  const handleSubmit = async (values: INewBotInterface) => {
    try {
      const response: AxiosResponse<any, any> = await axios.post(
        apiEndPoints.bots,
        values
      );
    } catch (error) {
      // Handle error
    }
  };

  return (
    <Grid container>
      <Grid item xs={12} md={6} lg={8} xl={5}>
        <Formik
          initialValues={initialValues}
          validationSchema={validations}
          onSubmit={(values, { setSubmitting }) => {
            handleSubmit(values);
            setSubmitting(false);
          }}
        >
          {({ values, handleChange, errors, touched }) => (
            <Form noValidate>
              <Fieldset legend="Main Setting">
                <FieldsetElement
                  label="Name"
                  description="Please give this bot a unique name so reporting and management is easier."
                >
                  <TextField
                    name="name"
                    type="text"
                    startIcon={<IconHexagon />}
                    value={values.name}
                    onChange={handleChange}
                    required
                  />
                </FieldsetElement>
                <FieldsetElement
                  label="Exchange"
                  description="This is the exchange account the bot will use for any deals it creates."
                >
                  {/* <ComboBox
                    id="exchangeId"
                    renderInput={(params) => <TextField {...params} />}
                    value={values.exchangeId}
                    onChange={handleChange}
                    options={}
                  /> */}
                </FieldsetElement>
                <FieldsetElement
                  label="Pair"
                  description="Please select the Trading Pair this bot can use."
                >
                  <TextField
                    name="pair"
                    type="text"
                    startIcon={<IconHexagon />}
                    value={values.pair}
                    onChange={handleChange}
                    required
                  />
                </FieldsetElement>
              </Fieldset>
              <Fieldset legend="Strategy">
                <FieldsetElement
                  label="Strategy"
                  description="Long bots profit when asset prices rise, Short bots profit when asset prices fall."
                >
                  <ToggleButtonGroup
                    options={newBotStartegy}
                    value={values.orderStrategy}
                    id="orderStrategy"
                    onChange={handleChange}
                  />
                </FieldsetElement>
                <FieldsetElement
                  label="Access"
                  description="bot is for your personal use or want to make it public ?"
                >
                  <ToggleButtonGroup
                    options={newBotAccess}
                    value={values.access}
                    id="access"
                    onChange={handleChange}
                  />
                </FieldsetElement>
                <FieldsetElement
                  label="Leverage type"
                  description="what is leverage type?"
                >
                  <ToggleButtonGroup
                    options={newBotLeverageType}
                    value={values.leverageType}
                    id="leverageType"
                    onChange={handleChange}
                  />
                </FieldsetElement>
                <FieldsetElement
                  label="Leverage custom value"
                  description="what is leverage?"
                >
                  <ToggleButtonGroup
                    options={newBotLeverage}
                    value={values.leverageValue}
                    id="leverageValue"
                    onChange={handleChange}
                  />
                </FieldsetElement>
              </Fieldset>
              <Fieldset legend="Usage">
                <FieldsetElement label="Min amount for bot usage">
                  <TextField
                    name="minAmountForBotUsage"
                    type="number"
                    endIcon={<IconDollar />}
                    value={values.minAmountForBotUsage}
                    onChange={handleChange}
                    required
                  />
                </FieldsetElement>
                <FieldsetElement label="Max amount for bot usage">
                  <TextField
                    name="maxAmountForBotUsage"
                    type="number"
                    endIcon={<IconDollar />}
                    value={values.maxAmountForBotUsage}
                    onChange={handleChange}
                    required
                  />
                </FieldsetElement>
              </Fieldset>
              <Fieldset legend="Price">
                <FieldsetElement label="Monthly Bot Price">
                  <TextField
                    name="monthlyPrice"
                    type="number"
                    endIcon={<IconDollar />}
                    value={values.monthlyPrice}
                    onChange={handleChange}
                    required
                  />
                </FieldsetElement>
                <FieldsetElement label="Yearly Bot Price(Month)">
                  <TextField
                    name="yearlyPrice"
                    type="number"
                    endIcon={<IconDollar />}
                    value={values.yearlyPrice}
                    onChange={handleChange}
                    required
                  />
                </FieldsetElement>
              </Fieldset>

              <Button type="submit" variant="contained">
                Save
              </Button>
            </Form>
          )}
        </Formik>
      </Grid>
    </Grid>
  );
};

export default CreateBotForm;

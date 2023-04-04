import Grid from "@mui/material/Grid";
import { Form, Formik } from "formik";
import { IconDollar, IconHexagon } from "../../shared/icons/Icons";
import Button from "../formElements/Button";
import Fieldset from "../formElements/Fieldset";
import FieldsetElement from "../formElements/FieldsetElement";
import TextField from "../formElements/TextField";
import ToggleButtonGroup from "../formElements/ToggleButtonGroup";

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

const startegy = [
  {
    value: "long",
    label: "Long",
  },
  {
    value: "short",
    label: "Short",
  },
];

const access = [
  {
    value: "private",
    label: "Private",
  },
  {
    value: "public",
    label: "Public",
  },
];

const leverageType = [
  {
    value: "cross",
    label: "Cross",
  },
  {
    value: "isolated",
    label: "Isolated",
  },
];

const leverage = [
  {
    value: 1,
    label: "1x",
  },
  {
    value: 2,
    label: "2x",
  },
  {
    value: 3,
    label: "3x",
  },
  {
    value: 5,
    label: "5x",
  },
  {
    value: 10,
    label: "10x",
  },
  {
    value: 25,
    label: "25x",
  },
  {
    value: 100,
    label: "100x",
  },
];

const CreateBotForm = () => {
  const handleSubmit = (values: any) => {
    console.log("dalli");
  };

  return (
    <Grid container>
      <Grid item xs={12} md={6} lg={8} xl={5}>
        <Formik
          initialValues={{}}
          validationSchema={{}}
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
                    type={"text"}
                    startIcon={<IconHexagon />}
                    value={"sdfgsdfg"}
                    onChange={handleChange}
                    required
                  />
                </FieldsetElement>
                <FieldsetElement
                  label="Exchange"
                  description="This is the exchange account the bot will use for any deals it creates."
                >
                  <TextField
                    name="email"
                    type="email"
                    startIcon={<IconHexagon />}
                    value={"sdfgsdfg"}
                    onChange={handleChange}
                    required
                  />
                </FieldsetElement>
                <FieldsetElement
                  label="Pair"
                  description="Please select the Trading Pair this bot can use."
                >
                  <TextField
                    name="email"
                    type="email"
                    startIcon={<IconHexagon />}
                    value={"sdfgsdfg"}
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
                  <ToggleButtonGroup options={startegy} selected="long" />
                </FieldsetElement>
                <FieldsetElement
                  label="Access"
                  description="bot is for your personal use or want to make it public ?"
                >
                  <ToggleButtonGroup options={access} selected="public" />
                </FieldsetElement>
                <FieldsetElement
                  label="Leverage type"
                  description="what is leverage type?"
                >
                  <ToggleButtonGroup options={leverageType} selected="cross" />
                </FieldsetElement>
                <FieldsetElement
                  label="Leverage custom value"
                  description="what is leverage?"
                >
                  <ToggleButtonGroup options={leverage} selected={10} />
                </FieldsetElement>
              </Fieldset>
              <Fieldset legend="Usage">
                <FieldsetElement label="Min amount for bot usage">
                  <TextField
                    name="minDeposit"
                    type="number"
                    endIcon={<IconDollar />}
                    value={"sdfgsdfg"}
                    onChange={handleChange}
                    required
                  />
                </FieldsetElement>
                <FieldsetElement label="Max amount for bot usage">
                  <TextField
                    name="maxDeposit"
                    type="number"
                    endIcon={<IconDollar />}
                    value={"sdfgsdfg"}
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
                    value={"sdfgsdfg"}
                    onChange={handleChange}
                    required
                  />
                </FieldsetElement>
                <FieldsetElement label="Yearly Bot Price(Month)">
                  <TextField
                    name="yearlyPrice"
                    type="number"
                    endIcon={<IconDollar />}
                    value={"sdfgsdfg"}
                    onChange={handleChange}
                    required
                  />
                </FieldsetElement>
              </Fieldset>

              <Button type="submit">Save</Button>
            </Form>
          )}
        </Formik>
      </Grid>
    </Grid>
  );
};

export default CreateBotForm;

import { Grid } from "@mui/material";
import { Form, Formik } from "formik";
import { IconDollar, IconHexagon } from "../../shared/icons/Icons";
import Button from "../formElements/Button";
import Fieldset from "../formElements/Fieldset";
import FieldsetElement from "../formElements/FieldsetElement";
import TextField from "../formElements/TextField";

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
                    type="text"
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
                  label="Access"
                  description="bot is for your personal use or want to make it public ?"
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
                  label="Leverage type"
                  description="what is leverage type?"
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
                  label="Leverage custom value"
                  description="what is leverage?"
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

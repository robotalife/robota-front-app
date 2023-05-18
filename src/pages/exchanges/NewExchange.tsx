import { Grid } from "@mui/material";
import FieldsetElement from "../../components/formElements/FieldsetElement";
import TextField from "../../components/formElements/TextField";
import Button from "../../components/formElements/Button";
import RadioButtonsGroup from "../../components/formElements/RadioButtonsGroup";

const NewExchange = () => {
  const handleSubmit = (e: any) => {
    console.log(e);
  };

  return (
    <Grid container>
      <Grid item xs={12} md={6} lg={8} xl={5}>
        <form noValidate onSubmit={handleSubmit}>
          <FieldsetElement label="Select your exchange">
            <RadioButtonsGroup
              items={[
                { label: "Binance Futures", value: 0 },
                { label: "Binance", value: 1 },
                { label: "Kucoin", value: 2 },
              ]}
              defaultValue={2}
            />
          </FieldsetElement>
          <FieldsetElement label="Account Label">
            <TextField
              name="name"
              type="text"
              value={"Binance - Rosa"}
              message="Example : John Smitt - Binance account"
              required
            />
          </FieldsetElement>
          <FieldsetElement label="API Key">
            <TextField name="name" type="text" value={"daali"} required />
          </FieldsetElement>
          <FieldsetElement label="Secret Key">
            <TextField name="name" type="text" value={"daali"} required />
          </FieldsetElement>
          <Grid container spacing={2}>
            <Grid item xs={6} lg={"auto"}>
              <Button type="submit" variant="contained" size="small">
                Connect Exchange
              </Button>
            </Grid>
            <Grid item xs={6} lg={"auto"}>
              <Button type="button" variant="outlined" size="small">
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

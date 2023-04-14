import Grid from "@mui/material/Grid";
import { Form, Formik } from "formik";
import {
  IconDollar,
  IconHexagon,
  IconModalSave,
} from "../../shared/icons/Icons";
import Button from "../formElements/Button";
import Fieldset from "../formElements/Fieldset";
import FieldsetElement from "../formElements/FieldsetElement";
import TextField from "../formElements/TextField";
import ToggleButtonGroup from "../formElements/ToggleButtonGroup";
import {
  TextField as MUITextField,
  MenuItem,
  Select,
  Table,
  TableCell,
  TableRow,
  Typography,
} from "@mui/material";

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
import { FormEvent, useContext, useEffect, useState } from "react";
import { ExchangeContext } from "../../shared/providers/ExchangeProvider";
import Modal from "../shared/Modal";

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
  pair: string;
  yearlyPrice: number;
}

const initialValues: INewBotInterface = {
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
  const { exchangeList, setSelectedExchange, pairs } =
    useContext(ExchangeContext);
  const [formData, setFormData] = useState({
    name: "",
    exchangeId: "",
    configuration: {
      access: "PRIVATE",
      botName: "",
      leverageType: "ISOLATED",
      leverageValue: 1,
      maxAmountForBotUsage: "4",
      minAmountForBotUsage: "3",
      monthlyPrice: "5",
      orderStrategy: "SHORT",
      pair: "",
      yearlyPrice: "6",
    },
  });

  const [showModal, setShowModal] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setShowModal(true);
  };

  const createBot = async () => {
    try {
      const response: AxiosResponse<any, any> = await axios.post(
        apiEndPoints.bots,
        formData
      );
    } catch (error) {
      // Handle error
    }
  };
  // const getExchange = (id: string): IExchange => {
  //   return exchangeList.find((ex) => ex.exchangeId === id) || ({} as IExchange);
  // };

  return (
    <>
      <Grid container>
        <Grid item xs={12} md={6} lg={8} xl={5}>
          {/* <Formik
          initialValues={initialValues}
          validationSchema={validations}
          onSubmit={(values, { setSubmitting }) => {
            handleSubmit(values);
            setSubmitting(false);
          }}
        >
          {({ values, handleChange, errors, touched }) => (
            <Form noValidate> */}
          <form noValidate onSubmit={handleSubmit}>
            <Fieldset legend="Main Setting">
              <FieldsetElement
                label="Name"
                description="Please give this bot a unique name so reporting and management is easier."
              >
                <TextField
                  name="name"
                  type="text"
                  startIcon={<IconHexagon />}
                  value={formData.name}
                  onChange={(e) => {
                    setFormData({ ...formData, name: e.target.value });
                  }}
                  required
                />
              </FieldsetElement>
              <FieldsetElement
                label="Exchange"
                description="This is the exchange account the bot will use for any deals it creates."
              >
                <Select
                  id="exchangeId"
                  value={formData.exchangeId}
                  onChange={(e) => {
                    setFormData({ ...formData, exchangeId: e.target.value });
                    setSelectedExchange(e.target.value);
                  }}
                  sx={{ width: "100%" }}
                >
                  {exchangeList.map((ex) => (
                    <MenuItem value={ex.value} key={ex.label}>
                      {ex.label}
                    </MenuItem>
                  ))}
                </Select>
                {/* <ComboBox
                id="exchangeId"
                renderInput={(params) => <MUITextField {...params} />}
                value={getExchange(values.exchangeId)}
                onChange={handleChange}
                options={exchangeList}
                disablePortal
                isOptionEqualToValue={(o, v) => o.value === values.exchangeId}
              /> */}
              </FieldsetElement>
              <FieldsetElement
                label="Pair"
                description="Please select the Trading Pair this bot can use."
              >
                <Select
                  id="pair"
                  value={formData.configuration.pair}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      configuration: {
                        ...formData.configuration,
                        pair: e.target.value,
                      },
                    })
                  }
                  sx={{ width: "100%" }}
                  disabled={!pairs.length}
                >
                  {pairs.map((p, index) => (
                    <MenuItem value={p.value} key={`${p.value}_${index}`}>
                      {p.text}
                    </MenuItem>
                  ))}
                </Select>
              </FieldsetElement>
            </Fieldset>
            <Fieldset legend="Strategy">
              <FieldsetElement
                label="Strategy"
                description="Long bots profit when asset prices rise, Short bots profit when asset prices fall."
              >
                <ToggleButtonGroup
                  options={newBotStartegy}
                  value={formData.configuration.orderStrategy}
                  id="orderStrategy"
                  onChange={(e, v) =>
                    setFormData({
                      ...formData,
                      configuration: {
                        ...formData.configuration,
                        orderStrategy: v,
                      },
                    })
                  }
                />
              </FieldsetElement>
              <FieldsetElement
                label="Access"
                description="bot is for your personal use or want to make it public ?"
              >
                <ToggleButtonGroup
                  options={newBotAccess}
                  value={formData.configuration.access}
                  id="access"
                  onChange={(e, v) =>
                    setFormData({
                      ...formData,
                      configuration: {
                        ...formData.configuration,
                        access: v,
                      },
                    })
                  }
                />
              </FieldsetElement>
              <FieldsetElement
                label="Leverage type"
                description="what is leverage type?"
              >
                <ToggleButtonGroup
                  options={newBotLeverageType}
                  value={formData.configuration.leverageType}
                  id="leverageType"
                  onChange={(e, v) =>
                    setFormData({
                      ...formData,
                      configuration: {
                        ...formData.configuration,
                        leverageType: v,
                      },
                    })
                  }
                />
              </FieldsetElement>
              <FieldsetElement
                label="Leverage custom value"
                description="what is leverage?"
              >
                <ToggleButtonGroup
                  options={newBotLeverage}
                  value={formData.configuration.leverageValue}
                  id="leverageValue"
                  onChange={(e, v) =>
                    setFormData({
                      ...formData,
                      configuration: {
                        ...formData.configuration,
                        leverageValue: v,
                      },
                    })
                  }
                />
              </FieldsetElement>
            </Fieldset>
            <Fieldset legend="Usage">
              <FieldsetElement label="Min amount for bot usage">
                <TextField
                  name="minAmountForBotUsage"
                  type="number"
                  endIcon={<IconDollar />}
                  value={formData.configuration.minAmountForBotUsage}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      configuration: {
                        ...formData.configuration,
                        minAmountForBotUsage: e.currentTarget.value,
                      },
                    })
                  }
                />
              </FieldsetElement>
              <FieldsetElement label="Max amount for bot usage">
                <TextField
                  name="maxAmountForBotUsage"
                  type="number"
                  endIcon={<IconDollar />}
                  value={formData.configuration.maxAmountForBotUsage}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      configuration: {
                        ...formData.configuration,
                        maxAmountForBotUsage: e.currentTarget.value,
                      },
                    })
                  }
                />
              </FieldsetElement>
            </Fieldset>
            <Fieldset legend="Price">
              <FieldsetElement label="Monthly Bot Price">
                <TextField
                  name="monthlyPrice"
                  type="number"
                  endIcon={<IconDollar />}
                  value={formData.configuration.monthlyPrice}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      configuration: {
                        ...formData.configuration,
                        monthlyPrice: e.currentTarget.value,
                      },
                    })
                  }
                />
              </FieldsetElement>
              <FieldsetElement label="Yearly Bot Price(Month)">
                <TextField
                  name="yearlyPrice"
                  type="number"
                  endIcon={<IconDollar />}
                  value={formData.configuration.yearlyPrice}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      configuration: {
                        ...formData.configuration,
                        yearlyPrice: e.currentTarget.value,
                      },
                    })
                  }
                />
              </FieldsetElement>
            </Fieldset>

            <Button type="submit" variant="contained">
              Save
            </Button>
          </form>
          {/* </Form>
          )}
        </Formik> */}
        </Grid>
      </Grid>
      <Modal open={showModal} onClose={() => setShowModal(false)}>
        <>
          <Grid container justifyContent={"center"} mb={1}>
            <Grid item xs={"auto"}></Grid>
            <IconModalSave />
          </Grid>
          <Typography
            component={"h3"}
            sx={{ textAlign: "center", fontSize: 18, fontWeight: 500 }}
          >
            Save Changes?
          </Typography>
          <Table>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>{formData.name}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Exchange</TableCell>
              <TableCell>
                {
                  exchangeList.find(
                    (ex) => ex.exchangeId === formData.exchangeId
                  )?.exchangeName
                }
              </TableCell>
            </TableRow>
            {Object.keys(formData.configuration).map(
              (config) =>
                config !== "botName" && (
                  <TableRow>
                    <TableCell>{config}</TableCell>
                    <TableCell>
                      {
                        // @ts-ignore
                        formData.configuration[config]
                      }
                    </TableCell>
                  </TableRow>
                )
            )}
          </Table>
          <Grid container spacing={2} mt={2}>
            <Grid item xs={6}>
              <Button
                type="button"
                variant="outlined"
                fullWidth
                onClick={() => setShowModal(false)}
              >
                Cancel
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button
                type="button"
                variant="contained"
                fullWidth
                onClick={createBot}
              >
                Confirm
              </Button>
            </Grid>
          </Grid>
        </>
      </Modal>
    </>
  );
};

export default CreateBotForm;

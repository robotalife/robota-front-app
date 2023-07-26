import { useContext, useEffect, useMemo, useState } from "react";
import { ExchangeContext } from "../../shared/providers/ExchangeProvider";
import useAxios from "../../shared/hooks/useAxios";
import { AxiosResponse } from "axios";
import apiEndPoints from "../../shared/consts/apiEndpoints";
import { Grid, Typography } from "@mui/material";
import Fieldset from "../../components/formElements/Fieldset";
import FieldsetElement from "../../components/formElements/FieldsetElement";
import TextField from "../../components/formElements/TextField";
import {
  IconDollar,
  IconModalSave,
  IconTripleOctagons,
} from "../../shared/icons/Icons";
import ToggleButtonGroup from "../../components/formElements/ToggleButtonGroup";
import {
  newBotLeverage,
  newBotLeverageType,
  newBotStartegy,
} from "../../shared/consts/botCreateItems";
import Button from "../../components/formElements/Button";
import Modal from "../../components/shared/Modal";
import Table from "../../components/shared/table/Table";
import TableRow from "../../components/shared/table/TableRow";
import TableCell from "../../components/shared/table/TableCell";
import { useNavigate } from "react-router-dom";
import TableBody from "../../components/shared/table/TableBody";
import routes from "../../shared/consts/routes";
import { MyBotsContext } from "../../shared/providers/MyBotsProvider";

import classes from "./NewBot.module.scss";
import ComboBox, {
  AutocompleteOption,
} from "../../components/formElements/ComboBox";
import {
  exchangeComboBoxSchema,
  newBotNumberSchema,
  pairComboBoxSchema,
  stringSchema,
  validationSchema,
} from "../../shared/consts/validations";
import { Form, Formik } from "formik";
import { IPair } from "../../shared/interfaces/exchange";

const validations = validationSchema({
  name: stringSchema,
  investment: newBotNumberSchema,
  exchange: exchangeComboBoxSchema,
  pair: pairComboBoxSchema,
});

const initialValues: {
  name: string;
  investment: number | undefined;
  exchange: string;
  pair: string;
} = {
  name: "",
  investment: undefined,
  exchange: "",
  pair: "",
};

enum PropertyNameList {
  access = "Access",
  marginType = "Leverage type",
  leverageValue = "Leverage custom value",
  orderStrategy = "Strategy",
  pair = "Pair",
  investment = "Investment",
}

const NewBot = () => {
  const { filters, setFilters } = useContext(MyBotsContext);
  const { axios } = useAxios();
  const navigate = useNavigate();
  const {
    exchangeList,
    selectedExchange,
    setSelectedExchange,
    pairs,
    selectedPair,
    setSelectedPair,
    loading,
  } = useContext(ExchangeContext);

  const [showModal, setShowModal] = useState(false);

  const comboExchangeList: AutocompleteOption[] = useMemo(() => {
    return exchangeList.map((exchange) => {
      return { label: exchange.label, value: exchange.value };
    });
  }, [exchangeList]);

  const comboPairsList: AutocompleteOption[] = pairs.map((pair) => {
    return { value: pair.value, label: pair.text };
  });

  const [formData, setFormData] = useState({
    name: "",
    exchangeId: selectedExchange,
    configuration: {
      marginType: "ISOLATED",
      leverageValue: 1,
      orderStrategy: "SHORT",
      pair: selectedPair?.value || "",
      investment: "",
    },
  });

  const handleSubmit = async (values: { name: string; investment: number }) => {
    setFormData({
      ...formData,
      name: values.name,
      configuration: {
        ...formData.configuration,
        investment: values.investment.toString(),
      },
    });
    setShowModal(true);
  };

  const createBot = async () => {
    try {
      const response: AxiosResponse<{ botId: number; botName: string }, any> =
        await axios.post(apiEndPoints.bots, formData);

      const { botId } = response.data;
      setFilters({ ...filters, page: 0 });
      setShowModal(false);
      navigate(`${routes.botOverview}/${botId}`);
    } catch (error) {
      // Handle error
    }
  };

  useEffect(() => {
    setFormData({ ...formData, exchangeId: selectedExchange });
  }, [selectedExchange, setFormData]);

  useEffect(() => {
    setFormData({
      ...formData,
      configuration: {
        ...formData.configuration,
        pair: selectedPair?.value || "",
      },
    });
  }, [selectedPair, setFormData]);

  return (
    <>
      <Grid container>
        <Grid item xs={12} md={6} lg={8} xl={5}>
          <Formik
            initialValues={initialValues}
            validationSchema={validations}
            onSubmit={(values, { setSubmitting }) => {
              // @ts-ignore
              handleSubmit(values);
              setSubmitting(false);
            }}
          >
            {({ values, handleChange, errors, touched, setFieldValue }) => (
              <Form noValidate>
                <Fieldset legend="Main Setting">
                  <FieldsetElement
                    label="Name"
                    description="Please give this bot a unique name so reporting and management is easier."
                  >
                    <TextField
                      name="name"
                      type="text"
                      startIcon={<IconTripleOctagons />}
                      value={values.name}
                      onChange={handleChange}
                      required
                      error={Boolean(errors.name && touched.name)}
                      helperText={errors.name && touched.name && errors.name}
                      sx={{ mb: 2 }}
                    />
                  </FieldsetElement>
                  <FieldsetElement
                    label="Exchange"
                    description="This is the exchange account the bot will use for any deals it creates."
                  >
                    <ComboBox
                      label={"Exchange"}
                      sx={{ width: "100%" }}
                      options={comboExchangeList}
                      placeholder="Select an account"
                      onChange={(e, val) => {
                        setFormData({
                          ...formData,
                          exchangeId: val ? (val.value as string) : "",
                        });
                        setSelectedExchange(
                          (val && (val.value as string)) || ""
                        );
                        setFieldValue("exchange", val?.value || "", true);
                      }}
                      value={
                        values.exchange
                          ? exchangeList.find(
                              (ex) => ex.exchangeId === values.exchange
                            )
                          : null
                      }
                      disableClearable={false}
                      id="exchange"
                      // error={Boolean(errors.name && touched.name)}
                      messageType="error"
                      message={
                        (errors.exchange &&
                          touched.exchange &&
                          errors.exchange) ||
                        undefined
                      }
                    />
                  </FieldsetElement>
                  <FieldsetElement
                    label="Pair"
                    description="Please select the Trading Pair this bot can use."
                  >
                    <ComboBox
                      label={"Pair"}
                      sx={{ width: "100%" }}
                      placeholder="Select a pair"
                      options={comboPairsList}
                      onChange={(e, val) => {
                        setSelectedPair(
                          !!val
                            ? (pairs.find(
                                (p) => p.value === val.value
                              ) as IPair)
                            : null
                        );
                        setFieldValue("pair", val?.value || "", true);
                      }}
                      value={
                        values.pair
                          ? comboPairsList.find(
                              (ex) => ex.value === values.pair
                            )
                          : null
                      }
                      id="pair"
                      disabled={!values.exchange || !pairs.length}
                      messageType="error"
                      message={
                        (errors.pair && touched.pair && errors.pair) ||
                        undefined
                      }
                    />
                  </FieldsetElement>
                  <FieldsetElement
                    label="Investment"
                    description="This is the investment you are allocating from your exchange for this bot."
                  >
                    <TextField
                      name="investment"
                      type="number"
                      startIcon={<>USD</>}
                      value={values.investment}
                      onChange={handleChange}
                      error={Boolean(errors.investment && touched.investment)}
                      helperText={
                        errors.investment &&
                        touched.investment &&
                        errors.investment
                      }
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
                    label="Leverage type"
                    description="what is leverage type?"
                  >
                    <ToggleButtonGroup
                      options={newBotLeverageType}
                      value={formData.configuration.marginType}
                      id="marginType"
                      onChange={(e, v) =>
                        setFormData({
                          ...formData,
                          configuration: {
                            ...formData.configuration,
                            marginType: v,
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

                <Button type="submit" variant="contained">
                  Save
                </Button>
              </Form>
            )}
          </Formik>
        </Grid>
      </Grid>
      <Modal open={showModal} onClose={() => setShowModal(false)}>
        <>
          <Grid container justifyContent={"center"} mb={1}>
            <Grid item xs={"auto"}>
              <IconModalSave />
            </Grid>
          </Grid>
          <Typography
            component={"h3"}
            sx={{ textAlign: "center", fontSize: 18, fontWeight: 500 }}
          >
            Save Changes?
          </Typography>
          <Table className={classes.table}>
            <TableBody>
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
              {Object.keys(formData.configuration).map((config) => (
                <TableRow key={config}>
                  <TableCell>
                    {(PropertyNameList as { [key: string]: string })[config]}
                  </TableCell>
                  <TableCell>
                    {(PropertyNameList as { [key: string]: string })[config] ===
                    "Pair" ? (
                      <>
                        {
                          comboPairsList.find(
                            // @ts-ignore
                            (x) => x.value === formData.configuration[config]
                          )?.label
                        }
                      </>
                    ) : (
                      <>
                        {
                          // @ts-ignore
                          formData.configuration[config]
                        }
                      </>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
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

export default NewBot;

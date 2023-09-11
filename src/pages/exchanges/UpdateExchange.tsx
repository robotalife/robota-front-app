import { Grid } from '@mui/material';
import FieldsetElement from '../../components/formElements/FieldsetElement';
import TextField from '../../components/formElements/TextField';
import Button from '../../components/formElements/Button';
import { FormEvent, useContext, useState } from 'react';
import { AuthContext } from '../../shared/providers/AuthProvider';
import useAxios from '../../shared/hooks/useAxios';
import { AxiosResponse } from 'axios';
import apiEndPoints from '../../shared/consts/apiEndpoints';
import useNotify from '../../shared/hooks/useNotify';
import useReturnTo from '../../shared/hooks/useReturnTo';
import { useNavigate, useParams } from 'react-router-dom';
import routes from '../../shared/consts/routes';
import ViewArticle from '../../components/pageSpecific/ViewArticle';
import {
  newExchangeApiKeyStringSchema,
  newExchangeLabelKeyStringSchema,
  newExchangePassPhraseStringSchema,
  newExchangeSecretKeyStringSchema,
  validationSchema,
} from '../../shared/consts/validations';
import { INewExchangeFormData, INewExchangeFormDataWithPass } from './NewExchange';
import { Form, Formik } from 'formik';

const validations = validationSchema({
  apiKey: newExchangeApiKeyStringSchema,
  apiSecret: newExchangeSecretKeyStringSchema,
  exchangeName: newExchangeLabelKeyStringSchema,
});

const validationsWithPass = validationSchema({
  apiKey: newExchangeApiKeyStringSchema,
  apiSecret: newExchangeSecretKeyStringSchema,
  exchangeName: newExchangeLabelKeyStringSchema,
  passPhrase: newExchangePassPhraseStringSchema,
});

const UpdateExchange = () => {
  const { axios } = useAxios();
  const navigate = useNavigate();
  const returnTo = useReturnTo();
  const notify = useNotify();
  const { exchangeType, exchangeId, exchnageLabel } = useParams();

  const handleSubmit = async (values: INewExchangeFormData | INewExchangeFormDataWithPass) => {
    try {
      const response: AxiosResponse<any, any> = await axios.patch(apiEndPoints.exchange, {
        exchangeId,
        values,
      });

      notify('The exchange added successfully', 'info');
      navigate(routes.botsNew);
      // goBack();
    } catch (error) {
      // Handle error
    }
  };

  const goBack = () => {
    navigate(returnTo || routes.exchangeList);
  };

  const initialValues: INewExchangeFormData = {
    apiKey: '',
    apiSecret: '',
    exchangeName: exchnageLabel || '',
  };

  const initialValuesWithPass: INewExchangeFormDataWithPass = {
    apiKey: '',
    apiSecret: '',
    exchangeName: exchnageLabel || '',
    passPhrase: '',
  };

  return (
    <Formik
      initialValues={exchangeType === 'KUCOIN' ? initialValuesWithPass : initialValues}
      validationSchema={exchangeType === 'KUCOIN' ? validationsWithPass : validations}
      onSubmit={(values, { setSubmitting }) => {
        handleSubmit(values);
        setSubmitting(false);
      }}
    >
      {({ values, handleChange, errors, touched }) => (
        <Form noValidate style={{ width: '100%' }} id="newExchangeForm">
          <Grid container maxWidth={'xl'}>
            <Grid container columnSpacing={7}>
              <Grid item xs={12} lg={6}>
                <FieldsetElement label="Account Label">
                  <TextField
                    name="exchangeName"
                    type="text"
                    value={values.exchangeName}
                    onChange={handleChange}
                    placeholder="Example : John Smitt - Binance account"
                    required
                    error={Boolean(errors.exchangeName && touched.exchangeName)}
                    helperText={errors.exchangeName && touched.exchangeName && errors.exchangeName}
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
                    helperText={errors.apiKey && touched.apiKey && errors.apiKey}
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
                    helperText={errors.apiSecret && touched.apiSecret && errors.apiSecret}
                  />
                </FieldsetElement>
                {exchangeType === 'KUCOIN' && (
                  <FieldsetElement label="Passphrase">
                    <TextField
                      name="passPhrase"
                      type="text"
                      //@ts-ignore
                      value={values.passPhrase}
                      onChange={handleChange}
                      required
                      //@ts-ignore
                      error={Boolean(errors.passPhrase && touched.passPhrase)}
                      helperText={
                        //@ts-ignore
                        errors.passPhrase &&
                        //@ts-ignore
                        touched.passPhrase &&
                        //@ts-ignore
                        errors.passPhrase
                      }
                    />
                  </FieldsetElement>
                )}
              </Grid>
              <Grid item xs={12} lg={6}>
                <ViewArticle exchange={exchangeType === 'KUCOIN' ? 'Kucoin' : 'Binance'} link={exchangeType === 'KUCOIN' ? '/' : '/'} />
              </Grid>
              <Grid item xs={12}>
                <Grid container spacing={2}>
                  <Grid item xs={6} md={'auto'}>
                    <Button type="submit" variant="contained" size="small" fullWidth>
                      Update
                    </Button>
                  </Grid>
                  <Grid item xs={6} md={'auto'}>
                    <Button type="button" variant="outlined" size="small" fullWidth onClick={goBack}>
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

export default UpdateExchange;

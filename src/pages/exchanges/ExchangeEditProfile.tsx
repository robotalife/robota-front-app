import { Container, Grid } from '@mui/material';
import { email, stringSchema, validationSchema } from '../../shared/consts/validations';
import { AxiosResponse } from 'axios';
import apiEndPoints from '../../shared/consts/apiEndpoints';
import useAxios from '../../shared/hooks/useAxios';
import { Form, Formik } from 'formik';
import Fieldset from '../../components/formElements/Fieldset';
import FieldsetElement from '../../components/formElements/FieldsetElement';
import TextField from '../../components/formElements/TextField';
import { IconMail } from '../../shared/icons/Icons';
import Button from '../../components/formElements/Button';

const validations = validationSchema({
  firstName: stringSchema,
  lastName: stringSchema,
  email: email,
});

const initialValues: {
  firstName: string;
  lastName: string;
  email: string;
} = {
  firstName: '',
  lastName: '',
  email: '',
};

const ExchangeEditProfile = () => {
  const { axios } = useAxios();

  const handleSubmit = async (values: { firstName: string; lastName: string; email: string }) => {
    // Here we should call the api to update the user profile
    console.log(values);
    // try {
    //   const response: AxiosResponse<{ botId: number; botName: string }, any> =
    //     await axios.post(apiEndPoints.bots);
    // } catch (error) {
    //   // Handle error
    // }
  };

  return (
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
              <Fieldset legend="Personal info">
                <FieldsetElement label="First name">
                  <TextField
                    name="firstName"
                    type="text"
                    value={values.firstName}
                    onChange={handleChange}
                    required
                    error={Boolean(errors.firstName && touched.firstName)}
                    helperText={errors.firstName && touched.firstName && errors.firstName}
                    sx={{ mb: 2 }}
                  />
                </FieldsetElement>
                <FieldsetElement label="Last Name">
                  <TextField
                    name="lastName"
                    type="text"
                    value={values.lastName}
                    onChange={handleChange}
                    required
                    error={Boolean(errors.lastName && touched.lastName)}
                    helperText={errors.lastName && touched.lastName && errors.lastName}
                    sx={{ mb: 2 }}
                  />
                </FieldsetElement>
                <FieldsetElement label="Email address">
                  <TextField
                    name="email"
                    type="email"
                    startIcon={<IconMail />}
                    value={values.email}
                    onChange={handleChange}
                    error={Boolean(errors.email && touched.email)}
                    helperText={errors.email && touched.email && errors.email}
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

export default ExchangeEditProfile;

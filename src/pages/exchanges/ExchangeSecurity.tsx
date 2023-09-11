import { Container, Grid } from '@mui/material';
import { email, passwordConfirmation, passwordFull, stringSchema, validationSchema } from '../../shared/consts/validations';
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
  currentPassword: stringSchema,
  newPassword: passwordFull,
  ConfirmNewPassword: passwordConfirmation,
});

const initialValues: {
  currentPassword: string;
  newPassword: string;
  ConfirmNewPassword: string;
} = {
  currentPassword: '',
  newPassword: '',
  ConfirmNewPassword: '',
};

const ExchangeSecurity = () => {
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
              <Fieldset legend="Main Setting">
                <FieldsetElement label="Current password">
                  <TextField
                    name="currentPassword"
                    type="text"
                    value={values.currentPassword}
                    onChange={handleChange}
                    required
                    error={Boolean(errors.currentPassword && touched.currentPassword)}
                    helperText={errors.currentPassword && touched.currentPassword && errors.currentPassword}
                    sx={{ mb: 2 }}
                  />
                </FieldsetElement>
                <FieldsetElement label="New password" description="Use 8 or more characters with a mix of letters, numbers & symbols">
                  <TextField
                    name="newPassword"
                    type="password"
                    value={values.newPassword}
                    onChange={handleChange}
                    required
                    error={Boolean(errors.newPassword && touched.newPassword)}
                    helperText={errors.newPassword && touched.newPassword && errors.newPassword}
                    sx={{ mb: 2 }}
                  />
                </FieldsetElement>
                <FieldsetElement label="Confirm new password">
                  <TextField
                    name="ConfirmNewPassword"
                    type="password"
                    startIcon={<IconMail />}
                    value={values.ConfirmNewPassword}
                    onChange={handleChange}
                    error={Boolean(errors.ConfirmNewPassword && touched.ConfirmNewPassword)}
                    helperText={errors.ConfirmNewPassword && touched.ConfirmNewPassword && errors.ConfirmNewPassword}
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

export default ExchangeSecurity;

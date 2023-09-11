import Button from '../../components/formElements/Button';
import TextField from '../../components/formElements/TextField';
import { IconKey } from '../../shared/icons/Icons';
import { Form, Formik } from 'formik';
import useAxios from '../../shared/hooks/useAxios';
import apiEndPoints from '../../shared/consts/apiEndpoints';
import { AxiosResponse } from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import routes from '../../shared/consts/routes';
import { passwordFull, validationSchema } from '../../shared/consts/validations';
import GrayListBox from '../../components/shared/GrayListBox';
import useNotify from '../../shared/hooks/useNotify';

const validations = validationSchema({
  password: passwordFull,
});

const text = 'Use 8 or more characters with a mix of letters, numbers & symbols';

const NewPassword = () => {
  const navigate = useNavigate();
  const { key } = useParams();
  const { axios } = useAxios();
  const notify = useNotify();

  const handleSubmit = async (values: { password: string }) => {
    const userData = {
      password: values.password,
      resetKey: key,
    };

    try {
      const response: AxiosResponse<
        {
          id: string;
          token: string;
        },
        any
      > = await axios.post(apiEndPoints.resetFinish, userData);

      notify('An email with password reset link sent to you.', 'success');
      navigate(routes.signin);
    } catch (error) {
      // Handle error
    }
  };

  return (
    <Formik
      initialValues={{ password: '', resetKey: '' }}
      validationSchema={validations}
      onSubmit={(values, { setSubmitting }) => {
        handleSubmit(values);
        setSubmitting(false);
      }}
    >
      {({ values, handleChange, errors, touched }) => (
        <Form noValidate style={{ width: '100%' }}>
          <div className={'pageTitle'}>New Password</div>
          <TextField
            name="password"
            type="password"
            label="New password"
            startIcon={<IconKey />}
            value={values.password}
            onChange={handleChange}
            placeholder="Create a new password"
            required
            error={Boolean(errors.password && touched.password)}
            helperText={errors.password && touched.password && errors.password}
            sx={{ mb: 3 }}
          />

          <GrayListBox text={text} />

          <Button type="submit" variant="contained" fullWidth sx={{ mb: 2 }}>
            Resset Password
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default NewPassword;

import { Typography } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../../components/formElements/Button';
import CheckboxWithText from '../../components/formElements/CheckboxWithText';
import TextField from '../../components/formElements/TextField';
import routes from '../../shared/consts/routes';
import useAxios from '../../shared/hooks/useAxios';
import { IconKey, IconMail } from '../../shared/icons/Icons';

import { Form, Formik } from 'formik';
import apiEndPoints from '../../shared/consts/apiEndpoints';
import { AxiosResponse } from 'axios';
import { agreeCheckbox, email, passwordFull, validationSchema } from '../../shared/consts/validations';
import GrayListBox from '../../components/shared/GrayListBox';
import { SignupData, SignupResponse } from '../../shared/interfaces/auth';

const validations = validationSchema({
  email: email,
  password: passwordFull,
  agree: agreeCheckbox,
});

const initialValues = {
  email: '',
  password: '',
  agree: false,
};

const text = 'Use 8 or more characters with a mix of letters, numbers & symbols';

const Signup = () => {
  const navigate = useNavigate();
  const { axios } = useAxios();

  const handleSubmit = async (values: SignupData) => {
    try {
      const response: AxiosResponse<SignupResponse, any> = await axios.post(apiEndPoints.signup, {
        email: values.email,
        password: values.password,
      });

      localStorage.setItem('userId', response.data.id); // save token in local storage
      navigate(`${routes.activate}/${response.data.id}`);
    } catch (error) {
      // Handle error
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validations}
      onSubmit={(values, { setSubmitting }) => {
        handleSubmit(values);
        setSubmitting(false);
      }}
    >
      {({ values, handleChange, errors, touched }) => (
        <Form noValidate style={{ width: '100%' }}>
          <div className={'pageTitle'}>Signup</div>
          <div className={'pageSubtitle'}>Lets's get started</div>
          <TextField
            name="email"
            type="email"
            label="Email address"
            startIcon={<IconMail />}
            value={values.email}
            onChange={handleChange}
            placeholder="Enter your Email Address"
            required
            error={Boolean(errors.email && touched.email)}
            helperText={errors.email && touched.email && errors.email}
            sx={{ mb: 3 }}
          />
          <TextField
            name="password"
            type="password"
            label="Password"
            startIcon={<IconKey />}
            value={values.password}
            onChange={handleChange}
            placeholder="Create a password"
            required
            error={Boolean(errors.password && touched.password)}
            helperText={errors.password && touched.password && errors.password}
            sx={{ mb: 3 }}
          />

          <GrayListBox text={text} />

          <CheckboxWithText
            name="agree"
            value={values.agree}
            onChange={handleChange}
            required
            sx={{ mb: 3 }}
            message={Boolean(errors.agree && touched.agree) ? errors.agree : undefined}
            messageType={Boolean(errors.agree && touched.agree) ? 'error' : undefined}
          >
            <Typography className="pageImportantMessage">
              I have read and agree to RobotaLife’s
              <Link to={routes.terms} className="authLinks">
                {' '}
                Terms of service
              </Link>{' '}
              &<Link to={routes.privacy}> Privacy policy</Link>.
            </Typography>
          </CheckboxWithText>

          <Button type="submit" variant="contained" fullWidth sx={{ mb: 2 }}>
            Get started
          </Button>

          <Typography sx={{ textAlign: 'center' }} className="pageDescription">
            Already have an account? <Link to={routes.signin}>Sign In</Link>
          </Typography>
        </Form>
      )}
    </Formik>
  );
};

export default Signup;

import { Grid, Paper, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import Button from "../../components/formElements/Button";
import Checkbox from "../../components/formElements/Checkbox";
import TextField from "../../components/formElements/TextField";
import routes from "../../shared/consts/routes";
import useAxios from "../../shared/hooks/useAxios";
import { IconKey, IconMail } from "../../shared/icons/Icons";

import { Form, Formik } from "formik";
import apiEndPoints from "../../shared/consts/apiEndpoints";
import { AxiosResponse } from "axios";
import {
  agreeCheckbox,
  email,
  passwordFull,
  validationSchema,
} from "../../shared/consts/validations";

import classes from "./Signup.module.scss";

const validations = validationSchema({
  email: email,
  password: passwordFull,
  agree: agreeCheckbox,
});

interface SignupData {
  email: string;
  password: string;
  agree: boolean;
}

const initialValues = {
  email: "",
  password: "",
  agree: false,
};

const Signup = () => {
  const navigate = useNavigate();
  const { axios, Snackbar } = useAxios();

  const handleSubmit = async (values: SignupData) => {
    const userData = {
      email: values.email,
      password: values.password,
    };

    try {
      const response: AxiosResponse<
        {
          id: string;
          email: string;
        },
        any
      > = await axios.post(apiEndPoints.signup, userData);
      navigate(routes.activate);
      // Handle successful response
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
        <Form noValidate>
          <div className={"pageTitle"}>Signup</div>
          <div className={"pageSubtitle"}>Lets's get started</div>
          <TextField
            name="email"
            type="email"
            label="Email Address"
            startIcon={<IconMail />}
            value={values.email}
            onChange={handleChange}
            required
            error={Boolean(errors.email && touched.email)}
            helperText={errors.email && touched.email && errors.email}
          />
          <TextField
            name="password"
            type="password"
            label="Password"
            startIcon={<IconKey />}
            value={values.password}
            onChange={handleChange}
            required
            error={Boolean(errors.password && touched.password)}
            helperText={errors.password && touched.password && errors.password}
          />
          <Paper elevation={0} className={classes.passwordRules}>
            <ul className={classes.passwordCheckList}>
              <li>Min. 8 characters</li>
              <li>Not same as username</li>
              <li>At least 1 alphabet, 1 number, and 1 punctuation</li>
              <li>Differ from previous password</li>
            </ul>
          </Paper>

          <Checkbox
            name="agree"
            value={values.agree}
            onChange={handleChange}
            required
            sx={{ mb: 3 }}
            message={
              Boolean(errors.agree && touched.agree) ? errors.agree : undefined
            }
            messageType={
              Boolean(errors.agree && touched.agree) ? "error" : undefined
            }
          >
            <Typography className="pageDescription">
              I have read and agree to RobotaLife’s
              <Link to={routes.terms}>
                {" "}
                Terms of Service and Privacy Policy
              </Link>
              .
            </Typography>
          </Checkbox>

          <Button type="submit" variant="contained">
            Get started
          </Button>

          <Typography sx={{ textAlign: "center" }} className="pageDescription">
            Already have an account? <Link to={routes.signin}>Sign In</Link>
          </Typography>
        </Form>
      )}
    </Formik>
  );
};

export default Signup;

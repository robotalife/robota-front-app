import { Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import Button from "../../components/formElements/Button";
import TextField from "../../components/formElements/TextField";
import routes from "../../shared/consts/routes";
import { IconKey, IconMail } from "../../shared/icons/Icons";

import { Form, Formik } from "formik";
import apiEndPoints from "../../shared/consts/apiEndpoints";
import { AxiosResponse } from "axios";
import useAxios from "../../shared/hooks/useAxios";
import { useContext } from "react";
import { AuthContext } from "../../shared/providers/AuthProvider";
import {
  email,
  passwordSimple,
  validationSchema,
} from "../../shared/consts/validations";
import { UserContext } from "../../shared/providers/UserProvider";

const validations = validationSchema({
  email: email,
  password: passwordSimple,
});

interface SigninData {
  email: string;
  password: string;
}

const initialValues: SigninData = {
  email: "",
  password: "",
};

const Signin = () => {
  const navigate = useNavigate();
  const { axios } = useAxios();
  const { setIsAuthenticated } = useContext(AuthContext);
  const { getUser } = useContext(UserContext);

  const handleSubmit = async (values: SigninData) => {
    const userData = {
      email: values.email,
      password: values.password,
    };

    try {
      const response: AxiosResponse<
        {
          id: string;
          token: string;
        },
        any
      > = await axios.post(apiEndPoints.signin, userData);

      const { token } = response.data;
      localStorage.setItem("token", token); // save token in local storage
      setIsAuthenticated(true);
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`; // set token as default authorization header for axios requests

      getUser();
      navigate(routes.portfolio);
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
          <div className={"pageTitle"}>Sign In</div>
          <div className={"pageSubtitle"}>Welcome back! </div>
          <TextField
            name="email"
            type="email"
            label="Email Address"
            startIcon={<IconMail />}
            value={values.email}
            onChange={handleChange}
            placeholder="Enter your Email Address"
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
            placeholder="Create a password"
            required
            error={Boolean(errors.password && touched.password)}
            helperText={errors.password && touched.password && errors.password}
          />

          <Typography sx={{ mb: 3, mt: 3 }} className="pageDescription">
            <Link to={routes.forgetPassword}>Forget Password?</Link>
          </Typography>

          <Button type="submit" variant="contained">
            Sign In
          </Button>
          <Typography sx={{ textAlign: "center" }} className="pageDescription">
            Don't have an account? <Link to={routes.signup}>Sign Up</Link>
          </Typography>
        </Form>
      )}
    </Formik>
  );
};

export default Signin;

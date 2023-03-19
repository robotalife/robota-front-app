import { Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import Button from "../../components/formElements/Button";
import TextField from "../../components/formElements/TextField";
import routes from "../../shared/consts/routes";
import { IconKey, IconMail } from "../../shared/icons/Icons";

import { Form, Formik } from "formik";
import * as Yup from "yup";
import apiEndPoints from "../../shared/consts/apiEndpoints";
import { AxiosResponse } from "axios";
import useAxios from "../../shared/hooks/useAxios";

const validationSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string().required("Required"),
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
  const { axios, Snackbar } = useAxios();

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
      console.log(axios.defaults.headers);
      axios.defaults.headers.common["Authorization"] = token; // set token as default authorization header for axios requests
      navigate(routes.portfoilio);
    } catch (error) {
      // Handle error
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
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

          <Typography sx={{ mb: 3, mt: 3 }} className="pageDescription">
            <Link to={routes.resetInit}>Forget Password?</Link>
          </Typography>

          <Button type="submit" variant="contained">
            Sign In
          </Button>
          <Typography sx={{ textAlign: "center" }} className="pageDescription">
            Didn’t create an account? <Link to={routes.signup}>Sign Up</Link>
          </Typography>
        </Form>
      )}
    </Formik>
  );
};

export default Signin;

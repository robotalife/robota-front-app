import { Grid, IconButton, Typography } from "@mui/material";
import { FormEvent, FormEventHandler, useCallback, useEffect } from "react";
import { Link } from "react-router-dom";
import Button from "../../components/formElements/Button";
import Checkbox from "../../components/formElements/Checkbox";
import TextField from "../../components/formElements/TextField";
import routes from "../../shared/consts/routes";
import useAxios from "../../shared/hooks/useAxios";
import { IconKey, IconMail } from "../../shared/icons/Icons";

import { Form, Formik, useFormik } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string()
    .min(8, "Must be at least 8 characters")
    .required("Required"),
  agree: Yup.boolean().oneOf([true], "Must agree to terms"),
});

const initialValues = {
  email: "",
  password: "",
  agree: false,
};

const Signup = () => {
  const { axios, Snackbar } = useAxios();

  const handleSubmit = async (values: any) => {
    console.log(values);
    // try {
    //   const response = await axios.post("/data", values);
    //   // Handle successful response
    // } catch (error) {
    //   // Handle error
    // }
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

          <Grid
            container
            alignItems={"center"}
            justifyContent={"flex-start"}
            mb={3}
          >
            <Grid item xs={"auto"}>
              <Checkbox
                name="agree"
                value={values.agree}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs>
              <Typography className="pageDescription">
                I agree to the <Link to={routes.terms}>Terms & Condotions</Link>
              </Typography>
            </Grid>
          </Grid>
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

import Button from "../../components/formElements/Button";
import TextField from "../../components/formElements/TextField";
import { IconMail } from "../../shared/icons/Icons";
import * as Yup from "yup";
import { Form, Formik } from "formik";
import useAxios from "../../shared/hooks/useAxios";
import apiEndPoints from "../../shared/consts/apiEndpoints";
import { AxiosResponse } from "axios";
import { useState } from "react";
import { Typography } from "@mui/material";
import circleCheck from "@images/green-circle-check.svg";
import { email, validationSchema } from "../../shared/consts/validations";

const validations = validationSchema({
  email: email,
});

const ForgetPassword = () => {
  const { axios, Snackbar } = useAxios();
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = async (values: { email: string }) => {
    const userData = {
      email: values.email,
    };

    try {
      const response: AxiosResponse<
        {
          id: string;
          token: string;
        },
        any
      > = await axios.post(apiEndPoints.resetInit, userData);
      setIsSent(true);
    } catch (error) {
      // Handle error
    }
  };

  if (isSent)
    return (
      <>
        <div style={{ textAlign: "center" }}>
          <img src={circleCheck} />
        </div>
        <Typography component="div" className={"pageTitle"}>
          Please check your email to continue.
        </Typography>
      </>
    );

  return (
    <Formik
      initialValues={{ email: "" }}
      validationSchema={validations}
      onSubmit={(values, { setSubmitting }) => {
        handleSubmit(values);
        setSubmitting(false);
      }}
    >
      {({ values, handleChange, errors, touched }) => (
        <Form noValidate>
          <div className={"pageTitle"}>Reset Password</div>
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

          <Button type="submit" variant="contained">
            Resset Password
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default ForgetPassword;

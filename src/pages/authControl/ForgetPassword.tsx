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
  const { axios } = useAxios();
  const [isSent, setIsSent] = useState(false);
  const [userEmail, setUserEmail] = useState<string | undefined>();

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
      setUserEmail(values.email);
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
          Check your email
        </Typography>
        <Typography
          component="div"
          className={"pageDescription"}
          sx={{ marginTop: 2, textAlign: "center" }}
        >
          We've sent a password reset link to{" "}
          <u>{userEmail ? userEmail : "your email"}</u>. If you don't see it in
          your inbox, please check your spam folder.
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
        <Form noValidate style={{ width: "100%" }}>
          <div className={"pageTitle"}>Reset password</div>
          <TextField
            name="email"
            type="email"
            label="Email address"
            startIcon={<IconMail />}
            value={values.email}
            onChange={handleChange}
            placeholder="Enter your email address"
            required
            error={Boolean(errors.email && touched.email)}
            helperText={errors.email && touched.email && errors.email}
            sx={{ mb: 3 }}
          />

          <Button type="submit" variant="contained" fullWidth>
            Reset password
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default ForgetPassword;

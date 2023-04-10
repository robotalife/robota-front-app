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
          Reset Password email was sent to {userEmail && "email"}. If you do not
          receive a Reset Password email, please check your spam folder. Also,
          please verify that you entered a valid email address in our sign-up
          form.
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
            placeholder="Enter your enmail address"
            required
            error={Boolean(errors.email && touched.email)}
            helperText={errors.email && touched.email && errors.email}
          />

          <Button type="submit" variant="contained" fullWidth>
            Reset Password
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default ForgetPassword;

import { Grid, Typography } from "@mui/material";
import { Link, useNavigate, useParams } from "react-router-dom";
import Button from "../../components/formElements/Button";
import TextField from "../../components/formElements/TextField";
import routes from "../../shared/consts/routes";

import circleCheck from "@images/green-circle-check.svg";
import useAxios from "../../shared/hooks/useAxios";
import apiEndPoints from "../../shared/consts/apiEndpoints";
import { AxiosResponse } from "axios";
import { Form, Formik } from "formik";
import { useEffect } from "react";
import {
  validationSchema,
  verificationKey,
} from "../../shared/consts/validations";

const validations = validationSchema({
  key: verificationKey,
});

const VerifyEmail = () => {
  const { key } = useParams();
  const navigate = useNavigate();
  const { axios } = useAxios();

  useEffect(() => {
    console.log(key);
  });

  const handleSubmit = async (values: { key: string }) => {
    try {
      const response: AxiosResponse<any, any> = await axios.post(
        `${apiEndPoints.verifyEmail}${values.key}`
      );

      navigate(routes.signin);
      // Handle successful response
    } catch (error) {
      // Handle error
    }
  };

  return (
    <Formik
      initialValues={{ key: key || "" }}
      validationSchema={validations}
      onSubmit={(values, { setSubmitting }) => {
        handleSubmit(values);
        setSubmitting(false);
      }}
    >
      {({ values, handleChange, errors, touched }) => (
        <Form noValidate>
          <div style={{ textAlign: "center" }}>
            <img src={circleCheck} />
          </div>
          <div className={"pageTitle"}>Check your email</div>
          <div className={"pageSubtitle"} style={{ marginBottom: 50 }}>
            If you do not receive a confirmation email, please check your spam
            folder. Also, please verify that you entered a valid email address
            in our sign-up form.
          </div>
          <TextField
            name="key"
            type="text"
            value={values.key}
            onChange={handleChange}
            required
            error={Boolean(errors.key && touched.key)}
            helperText={errors.key && touched.key && errors.key}
          />
          <Typography sx={{ mb: 1, mt: 1 }}>
            <Link to={routes.forgetPassword}>Forget Password?</Link>
          </Typography>

          <Button
            type="submit"
            variant="contained"
            sx={{ my: 4, mx: "auto", display: "block" }}
          >
            Verify email
          </Button>
          <Typography
            component={"div"}
            sx={{ textAlign: "center" }}
            alignItems="center"
          >
            <Grid container spacing={2}>
              <Grid item>Didn’t receive the email? </Grid>
              <Grid item xs={"auto"}>
                <Button variant="text" sx={{ m: 0, p: 0 }}>
                  Click to resend
                </Button>
              </Grid>
              <Grid item xs={12}>
                <Link to={routes.signup}>Back to Sign Up</Link>
              </Grid>
            </Grid>
          </Typography>
        </Form>
      )}
    </Formik>
  );
};

export default VerifyEmail;

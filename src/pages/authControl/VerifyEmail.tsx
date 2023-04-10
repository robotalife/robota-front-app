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
import { IconArrowLeft } from "../../shared/icons/Icons";
import DigitsInput from "../../components/formElements/DigitsInput";

const validations = validationSchema({
  key: verificationKey,
});

const VerifyEmail = () => {
  const { key } = useParams();
  const navigate = useNavigate();
  const { axios } = useAxios();

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

          <DigitsInput
            name="key"
            type="text"
            value={values.key}
            onChange={handleChange}
            required
            digitCounts={4}
            message={
              Boolean(errors.key && touched.key) ? errors.key : undefined
            }
            messageType={
              Boolean(errors.key && touched.key) ? "error" : undefined
            }
          />

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
            <Grid container spacing={1} justifyContent={"center"}>
              <Grid item>Didn’t receive the email? </Grid>
              <Grid item xs={"auto"}>
                <Typography className="pageSubtitle">
                  <Link to="/" style={{ margin: 0, padding: 0 }}>
                    Click to resend
                  </Link>
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Link
                  to={routes.signup}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <IconArrowLeft style={{ margin: "0 10px" }} />
                  Back to Sign Up
                </Link>
              </Grid>
            </Grid>
          </Typography>
        </Form>
      )}
    </Formik>
  );
};

export default VerifyEmail;

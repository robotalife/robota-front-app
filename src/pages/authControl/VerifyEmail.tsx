import { Grid, Typography } from "@mui/material";
import { Link, useNavigate, useParams } from "react-router-dom";
import Button from "../../components/formElements/Button";
import routes from "../../shared/consts/routes";

import circleCheck from "@images/green-circle-check.svg";
import useAxios from "../../shared/hooks/useAxios";
import apiEndPoints from "../../shared/consts/apiEndpoints";
import { AxiosResponse } from "axios";
import { FormEvent, useEffect, useState } from "react";
import { IconArrowLeft } from "../../shared/icons/Icons";
import DigitsInput from "../../components/formElements/DigitsInput";
import useNotify from "../../shared/hooks/useNotify";

const VerifyEmail = () => {
  const { id } = useParams();
  const { axios } = useAxios();
  const notify = useNotify();
  const navigate = useNavigate();
  const [otp, setOtp] = useState(id && id.length === 4 ? id : "");
  const [otpError, setOtpError] = useState(false);

  useEffect(() => {
    if (id && id.length === 4) {
      verifyEmail(id);
    }
  }, []);

  useEffect(() => {
    setOtpError(otp.length !== 0 && otp.length !== 4);
  }, [otp]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (otpError) return;
    verifyEmail(otp);
  };

  const handleChange = (e: string) => {
    setOtp(e);
  };

  const verifyEmail = async (verifyKey: string) => {
    try {
      const response: AxiosResponse<any, any> = await axios.post(
        `${apiEndPoints.verifyEmail}${verifyKey}`
      );

      navigate(routes.signin);
      notify("Your email is verified. You can sign in.", "success");

      // Handle successful response
    } catch (error) {
      // Handle error
    }
  };

  const resendVerification = async () => {
    try {
      const response: AxiosResponse<
        {
          userId: string;
        },
        any
      > = await axios.post(apiEndPoints.resendVerification, { userId: id });

      notify("Verification email sent.", "success");
      // Handle successful response
    } catch (error) {
      // Handle error
    }
  };

  return (
    <form noValidate onSubmit={handleSubmit} style={{ width: "100%" }}>
      <div style={{ textAlign: "center" }}>
        <img src={circleCheck} />
      </div>
      <div className={"pageTitle"}>Check your email</div>
      <div className={"pageSubtitle"} style={{ marginBottom: 50 }}>
        If you do not receive a confirmation email, please check your spam
        folder. Also, please verify that you entered a valid email address in
        our sign-up form.
      </div>

      <DigitsInput
        value={otp}
        onChange={handleChange}
        digitCounts={4}
        message={otpError ? "OTP is required" : undefined}
        messageType={"error"}
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
              <Link
                to="/"
                onClick={(e) => {
                  e.preventDefault();
                  resendVerification();
                }}
                style={{ margin: 0, padding: 0 }}
              >
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
    </form>
  );
};

export default VerifyEmail;

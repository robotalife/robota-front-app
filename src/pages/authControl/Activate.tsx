import { Grid, Typography } from "@mui/material";
import { Link, useParams } from "react-router-dom";
import Button from "../../components/formElements/Button";
import Checkbox from "../../components/formElements/Checkbox";
import TextField from "../../components/formElements/TextField";
import routes from "../../shared/consts/routes";

import circleCheck from "@images/green-circle-check.svg";
import { useEffect } from "react";
import useAxios from "../../shared/hooks/useAxios";
import apiEndPoints from "../../shared/consts/apiEndpoints";
import { AxiosResponse } from "axios";

const Activate = () => {
  const { id } = useParams();
  const { axios, Snackbar } = useAxios();

  const handleSubmit = async () => {
    try {
      const response: AxiosResponse<any, any> = await axios.post(
        `${apiEndPoints.activate}${id}`
      );

      console.log(response);

      // Handle successful response
    } catch (error) {
      // Handle error
    }
  };

  return (
    <div>
      <div style={{ textAlign: "center" }}>
        <img src={circleCheck} />
      </div>
      <div className={"pageTitle"}>Check your email</div>
      <div className={"pageSubtitle"} style={{ marginBottom: 50 }}>
        If you do not receive a confirmation email, please check your spam
        folder. Also, please verify that you entered a valid email address in
        our sign-up form.
      </div>
      <TextField />
      <Typography sx={{ mb: 1, mt: 1 }}>
        <Link to={routes.resetPassword}>Forget Password?</Link>
      </Typography>

      <Button variant="contained" sx={{ my: 4, mx: "auto", display: "block" }}>
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
            <Button variant="text" sx={{ m: 0, p: 0, display: "none" }}>
              Click to resend
            </Button>
          </Grid>
          <Grid item xs={12}>
            <Link to={routes.signup}>Back to Sign Up</Link>
          </Grid>
        </Grid>
      </Typography>
    </div>
  );
};

export default Activate;

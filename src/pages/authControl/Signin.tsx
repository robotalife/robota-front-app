import { Grid, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import Button from "../../components/formElements/Button";
import Checkbox from "../../components/formElements/Checkbox";
import TextField from "../../components/formElements/TextField";
import routes from "../../shared/consts/routes";
import { IconKey, IconMail } from "../../shared/icons/Icons";

const Signin = () => {
  return (
    <>
      <div className={"pageTitle"}>Sign In</div>
      <div className={"pageSubtitle"}>Welcome back! </div>
      <TextField label="Email Address" startIcon={<IconMail />} />
      <TextField label="Password" type="password" startIcon={<IconKey />} />

      <Typography sx={{ mb: 3, mt: 3 }} className="pageDescription">
        <Link to={routes.resetPassword}>Forget Password?</Link>
      </Typography>

      <Button variant="contained">Sign In</Button>
      <Typography sx={{ textAlign: "center" }} className="pageDescription">
        Didn’t Create an Accont? <Link to={routes.signup}>Sign Up</Link>
      </Typography>
    </>
  );
};

export default Signin;

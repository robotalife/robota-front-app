import { Grid, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import Button from "../../components/formElements/Button";
import Checkbox from "../../components/formElements/Checkbox";
import TextField from "../../components/formElements/TextField";
import routes from "../../shared/consts/routes";

const Signin = () => {


  return (
    <div>
      <div className={"pageTitle"}>Sign In</div>
      <div className={"pageSubtitle"}>Welcome back! </div>
      <TextField label="Email Address" />
      <TextField label="Password" type="Password" />
      <Typography sx={{ mb: 1, mt: 1 }}>
        <Link to={routes.resetPassword}>Forget Password?</Link>
      </Typography>

      <Button variant="contained">Sign In</Button>
      <Typography sx={{ textAlign: "center" }}>
        Didn’t Create an Accont? <Link to={routes.signup}>Sign Up</Link>
      </Typography>
    </div>
  );
};

export default Signin;

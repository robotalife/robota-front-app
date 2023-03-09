import { Grid, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import Button from "../../components/formElements/Button";
import Checkbox from "../../components/formElements/Checkbox";
import TextField from "../../components/formElements/TextField";
import routes from "../../shared/consts/routes";

const Signup = () => {
  return (
    <div>
      <div className={"pageTitle"}>Signup</div>
      <div className={"pageSubtitle"}>Lets's get started</div>
      <TextField label="Email Address" />
      <TextField label="Password" />
      <Typography sx={{ mb: 1 }}>Must be at least 8 characters.</Typography>

      <Grid container alignItems={"center"} justifyContent={"flex-start"}>
        <Grid item xs={"auto"}>
          <Checkbox />
        </Grid>
        <Grid item xs>
          I agree to the <Link to={routes.terms}> Terms & Condotions</Link>
        </Grid>
      </Grid>
      <Button variant="contained">Get started</Button>
      <Typography sx={{ textAlign: "center" }}>
        Already have an account? <Link to={routes.signin}>Sign In</Link>
      </Typography>
    </div>
  );
};

export default Signup;

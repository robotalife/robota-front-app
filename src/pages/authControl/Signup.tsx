import { Grid, IconButton, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import Button from "../../components/formElements/Button";
import Checkbox from "../../components/formElements/Checkbox";
import TextField from "../../components/formElements/TextField";
import routes from "../../shared/consts/routes";
import { IconKey, IconMail } from "../../shared/icons/Icons";
import classes from "./Signup.module.scss";

const Signup = () => {
  return (
    <div>
      <div className={"pageTitle"}>Signup</div>
      <div className={"pageSubtitle"}>Lets's get started</div>
      <TextField label="Email Address" startIcon={<IconMail />} />
      <TextField
        label="Password"
        type="password"
        startIcon={<IconKey />}
        message="Must be at least 8 characters."
      />

      <Grid
        container
        alignItems={"center"}
        justifyContent={"flex-start"}
        mb={3}
      >
        <Grid item xs={"auto"}>
          <Checkbox />
        </Grid>
        <Grid item xs>
          <Typography className="pageDescription">
            I agree to the <Link to={routes.terms}>Terms & Condotions</Link>
          </Typography>
        </Grid>
      </Grid>
      <Button variant="contained">Get started</Button>
      <Typography sx={{ textAlign: "center" }} className="pageDescription">
        Already have an account? <Link to={routes.signin}>Sign In</Link>
      </Typography>
    </div>
  );
};

export default Signup;

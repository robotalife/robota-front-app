import { Grid, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import Button from "../../components/formElements/Button";
import Checkbox from "../../components/formElements/Checkbox";
import TextField from "../../components/formElements/TextField";
import routes from "../../shared/consts/routes";

const ResetPassword = () => {
  return (
    <div>
      <div className={"pageTitle"}>Reset Password</div>
      <TextField label="Email Address" />

      <Button variant="contained">Resset Password</Button>
    </div>
  );
};

export default ResetPassword;

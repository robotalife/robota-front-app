import { Grid, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import Button from "../../components/formElements/Button";
import Checkbox from "../../components/formElements/Checkbox";
import TextField from "../../components/formElements/TextField";
import routes from "../../shared/consts/routes";
import { IconKey } from "../../shared/icons/Icons";

const ResetPassword = () => {
  return (
    <>
      <div className={"pageTitle"}>Reset Password</div>
      <TextField
        label="New Password"
        type="password"
        startIcon={<IconKey />}
        message="Must be at least 8 characters."
      />

      <Button variant="contained">Resset Password</Button>
    </>
  );
};

export default ResetPassword;

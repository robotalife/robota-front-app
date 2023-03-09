import { Grid, TextField as Input } from "@mui/material";
import { PropsWithChildren, ReactNode } from "react";
import classes from "./TextField.module.scss";

interface Props {
  startIcon?: ReactNode;
  endIcon?: ReactNode;
  label?: string;
}

const TextField = (props: Props) => {
  return (
    <div className={classes.formInput}>
      <Grid container>
        {!!props.label && (
          <Grid xs={12} item>
            <label>{props.label}</label>
          </Grid>
        )}
        {!!props.startIcon && <Grid item>{props.startIcon}</Grid>}
        <Grid item xs>
          <Input sx={{ width: "100%" }} />
        </Grid>
        {!!props.startIcon && <Grid item>{props.endIcon}</Grid>}
      </Grid>
    </div>
  );
};

export default TextField;

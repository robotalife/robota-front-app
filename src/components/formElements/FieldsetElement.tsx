import { Grid, Typography } from "@mui/material";
import { PropsWithChildren } from "react";
import classes from "./FieldsetElement.mosule.scss";

interface Props extends PropsWithChildren {
  label: string;
  description: string;
}

const FieldsetElement = ({ label, description, children }: Props) => {
  return (
    <Grid container>
      <Grid item xs={12} md={4}>
        <Typography component={"h5"}>{label}</Typography>
        <Typography component={"p"}>{description}</Typography>
      </Grid>
      <Grid item xs={12} md={4}>
        {children}
      </Grid>
    </Grid>
  );
};

export default FieldsetElement;

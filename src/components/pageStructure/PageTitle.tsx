import { Grid, Typography } from "@mui/material";
import { PropsWithChildren } from "react";

import classes from "./PageTitle.module.scss";

interface Props extends PropsWithChildren {
  title: string;
}

const PageTitle = ({ title, children }: Props) => {
  return (
    <Grid container justifyContent={"space-between"}>
      <Grid item xs={12} lg={"auto"}>
        <Typography className={classes.title}>{title}</Typography>
      </Grid>
      <Grid item xs={12} lg={"auto"}>
        {children}
      </Grid>
    </Grid>
  );
};

export default PageTitle;

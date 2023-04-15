import { Grid, Typography } from "@mui/material";
import { ReactNode } from "react";

import classes from "./WrapperBoxHeader.module.scss";

interface Props {
  title?: string;
  description?: ReactNode;
  actions?: ReactNode;
}

const WrapperBoxHeader = ({ title, description, actions }: Props) => {
  return (
    <header className={classes.header}>
      <Grid container justifyContent={"space-between"} spacing={2}>
        <Grid xs={12} md={"auto"} item>
          <Typography component={"div"} className={classes.title}>
            {title}
          </Typography>
          <Typography component={"div"} className={classes.description}>
            {description}
          </Typography>
        </Grid>
        <Grid xs={12} md={"auto"} item>
          {actions}
        </Grid>
      </Grid>
    </header>
  );
};

export default WrapperBoxHeader;

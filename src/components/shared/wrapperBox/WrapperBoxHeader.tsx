import { Grid, Typography } from "@mui/material";
import { PropsWithChildren, ReactNode } from "react";

import classes from "./WrapperBoxHeader.module.scss";

interface Props extends PropsWithChildren {
  title?: string;
  description?: ReactNode;
  actions?: ReactNode;
  noBorder?: boolean;
}

const WrapperBoxHeader = ({
  title,
  description,
  actions,
  noBorder,
  children,
}: Props) => {
  return (
    <div className={`${classes.header} ${noBorder ? classes.noBorder : ""}`}>
      {children || (
        <Grid container justifyContent={"space-between"} spacing={2}>
          <Grid xs={12} lg={"auto"} item>
            <Typography component={"div"} className={classes.title}>
              {title}
            </Typography>
            <Typography component={"div"} className={classes.description}>
              {description}
            </Typography>
          </Grid>
          <Grid xs={12} lg={"auto"} item>
            {actions}
          </Grid>
        </Grid>
      )}
    </div>
  );
};

export default WrapperBoxHeader;

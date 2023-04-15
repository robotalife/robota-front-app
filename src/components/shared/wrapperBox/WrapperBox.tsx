import { Box } from "@mui/material";
import { PropsWithChildren, ReactNode } from "react";

import classes from "./WrapperBox.module.scss";

interface Props extends PropsWithChildren {
  header?: ReactNode;
  filters?: ReactNode;
  body?: ReactNode;
  action?: ReactNode;
}

const WrapperBox = ({ header, filters, body, action, children }: Props) => {
  return (
    <Box className={classes.box}>
      {!!header && header}
      {!!filters && filters}
      {!!body && body}
      {!!children && children}
      {!!action && action}
    </Box>
  );
};

export default WrapperBox;

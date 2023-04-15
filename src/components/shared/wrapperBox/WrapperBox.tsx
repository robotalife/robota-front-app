import { Box } from "@mui/material";
import { PropsWithChildren, ReactNode } from "react";

import classes from "./WrapperBox.module.scss";
import WrapperBoxSection from "./WrapperBoxSection";

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
      {!!filters && <WrapperBoxSection>{filters}</WrapperBoxSection>}
      {!!body && <WrapperBoxSection>{body}</WrapperBoxSection>}
      {!!children && <WrapperBoxSection>{children}</WrapperBoxSection>}
      {!!action && <WrapperBoxSection>{action}</WrapperBoxSection>}
    </Box>
  );
};

export default WrapperBox;

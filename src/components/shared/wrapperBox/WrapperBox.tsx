import { Box } from "@mui/material";
import { PropsWithChildren, ReactNode } from "react";

import classes from "./WrapperBox.module.scss";

interface Props extends PropsWithChildren {
  fullHeight?: boolean;
}

const WrapperBox = ({ fullHeight, children }: Props) => {
  return (
    <Box className={`${classes.box} ${fullHeight ? classes.fullHeight : ""}`}>
      {children}
    </Box>
  );
};

export default WrapperBox;

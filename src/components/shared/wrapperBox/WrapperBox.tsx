import { Box } from "@mui/material";
import { PropsWithChildren, ReactNode } from "react";

import classes from "./WrapperBox.module.scss";
import WrapperBoxSection from "./WrapperBoxSection";

const WrapperBox = ({ children }: PropsWithChildren) => {
  return <Box className={classes.box}>{children}</Box>;
};

export default WrapperBox;

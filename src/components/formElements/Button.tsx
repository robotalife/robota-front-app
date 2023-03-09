import { Grid, Button as MUIButtonImport, ButtonProps } from "@mui/material";
import { PropsWithChildren, ReactNode } from "react";
import classes from "./TextField.module.scss";

const Button = (props: ButtonProps) => {
  return <MUIButtonImport sx={{ width: "100%" }} {...props} />;
};

export default Button;

import { Button as MUIButtonImport, ButtonProps } from "@mui/material";
import classes from "./Button.module.scss";

const Button = (props: ButtonProps) => {
  return (
    <MUIButtonImport
      {...props}
      className={`${props.className || ""} ${classes.button}`}
    />
  );
};

export default Button;

import { Button as MUIButtonImport, ButtonProps } from "@mui/material";
import classes from "./Button.module.scss";

const Button = (props: ButtonProps) => {
  return (
    <MUIButtonImport
      className={`${props.className} ${classes.button} ${
        classes[`custom${props.color || "primary"}`]
      }`}
      {...props}
    />
  );
};

export default Button;

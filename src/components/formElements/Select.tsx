import { Select as MUISelect, SelectProps } from "@mui/material";
import classes from "./Select.module.scss";
import { useId } from "react";

interface Props extends SelectProps {}

const Select = ({ label, ...props }: Props) => {
  const tmpId = useId();

  return (
    <>
      {label && (
        <label htmlFor={props.id || tmpId} className={classes.label}>
          {label}
        </label>
      )}
      <MUISelect {...props}>{props.children}</MUISelect>
    </>
  );
};

export default Select;

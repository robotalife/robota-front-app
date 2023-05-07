import {
  ToggleButton as MUIToggleButton,
  ToggleButtonGroup as MUIToggleButtonGroup,
  ToggleButtonGroupProps,
} from "@mui/material";
import { MouseEvent, useState } from "react";

import classes from "./ToggleButtonGroup.module.scss";

interface Props<T extends string | number | boolean>
  extends ToggleButtonGroupProps {
  options: {
    value: T;
    label: string;
    disabled?: boolean;
  }[];
  noIndicator?: boolean;
}

const ToggleButtonGroup = <T extends string | number | boolean>({
  options,
  noIndicator,
  ...props
}: Props<T>) => {
  const [value, setValue] = useState<T>(props.value as NonNullable<T>);

  const handleAlignment = (event: MouseEvent<HTMLElement>, newValue: T) => {
    setValue(newValue);
    if (props.onChange) {
      props.onChange(event, newValue);
    }
  };

  return (
    <MUIToggleButtonGroup
      {...props}
      value={value}
      exclusive
      onChange={handleAlignment}
      className={`${classes.toggleButtonGroup} ${props.className || ""}`}
    >
      {options.map((option) => (
        <MUIToggleButton
          value={option.value as T}
          aria-label={option.label}
          key={option.label}
        >
          {!noIndicator && option.value === value && (
            <span className={classes.indicator} />
          )}
          {option.label}
        </MUIToggleButton>
      ))}
    </MUIToggleButtonGroup>
  );
};

export default ToggleButtonGroup;

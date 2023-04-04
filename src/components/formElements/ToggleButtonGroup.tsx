import {
  ToggleButton as MUIToggleButton,
  ToggleButtonGroup as MUIToggleButtonGroup,
  ToggleButtonGroupProps,
} from "@mui/material";
import { MouseEvent, useState } from "react";

interface Props<T extends string | number | boolean>
  extends ToggleButtonGroupProps {
  options: {
    value: T;
    label: string;
    disabled?: boolean;
  }[];
  selected?: T;
}

const ToggleButtonGroup = <T extends string | number | boolean>({
  options,
  selected,
  ...props
}: Props<T>) => {
  const [value, setValue] = useState<T>(selected as NonNullable<T>);

  const handleAlignment = (event: MouseEvent<HTMLElement>, newValue: T) => {
    console.log(event, newValue);
    setValue(newValue);
  };

  return (
    <MUIToggleButtonGroup
      {...props}
      value={value}
      exclusive
      onChange={handleAlignment}
      aria-label="text alignment"
    >
      {options.map((option) => (
        <MUIToggleButton
          value={option.value as T}
          aria-label={option.label}
          key={option.label}
        >
          {option.label}
        </MUIToggleButton>
      ))}
    </MUIToggleButtonGroup>
  );
};

export default ToggleButtonGroup;

import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  RadioGroupProps,
} from "@mui/material";
import classes from "./RadioButtonsGroup.module.scss";
import { useId } from "react";

interface Props extends RadioGroupProps {
  items: {
    value: number | string;
    label: number | string;
  }[];
  groupLabel?: string;
}

const RadioButtonsGroup = ({
  items,
  groupLabel,
  ...radioGroupProps
}: Props) => {
  const tmpId = useId();
  const tmpName = useId();

  return (
    <FormControl>
      {!!groupLabel && <FormLabel id={tmpId}>{groupLabel}</FormLabel>}
      <RadioGroup
        aria-labelledby={tmpId}
        name={radioGroupProps.name || tmpName}
        {...radioGroupProps}
      >
        {items.map((item, i) => (
          <FormControlLabel key={i} control={<Radio />} {...item} />
        ))}
      </RadioGroup>
    </FormControl>
  );
};

export default RadioButtonsGroup;

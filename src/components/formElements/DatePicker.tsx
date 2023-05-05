import {
  DatePickerProps,
  DatePicker as MUIDatePicker,
} from "@mui/x-date-pickers";
import { useId } from "react";
import InputWrapper from "./InputWrapper";

import classes from "./DatePicker.module.scss";

interface Props extends DatePickerProps<Date> {
  id?: string;
}

const DatePicker = ({ id, label, ...props }: Props) => {
  const tmpId = useId();

  return (
    <InputWrapper id={id || tmpId} label={label} className={classes.wrapper}>
      <MUIDatePicker format="YYYY/MM/DD" {...props} />
    </InputWrapper>
  );
};

export default DatePicker;

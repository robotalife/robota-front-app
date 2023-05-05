import {
  DatePickerProps,
  DatePicker as MUIDatePicker,
} from "@mui/x-date-pickers";

import classes from "./DatePicker.module.scss";

interface Props extends DatePickerProps<Date> {}

const DatePicker = ({ label, ...props }: Props) => {
  return (
    <div className={classes.inputWrapper}>
      {label && <label className={classes.label}>{label}</label>}

      <MUIDatePicker format="YYYY/MM/DD" {...props} />
    </div>
  );
};

export default DatePicker;

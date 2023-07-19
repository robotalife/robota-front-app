import DateRangePicker, {
  DateRangePickerProps,
} from "@wojtekmaj/react-daterange-picker";
import "@wojtekmaj/react-daterange-picker/dist/DateRangePicker.css";
import "react-calendar/dist/Calendar.css";
import classes from "./RangePicker.module.scss";

interface Props extends Omit<DateRangePickerProps, "value" | "onChange"> {
  value: (Date | null)[];
  onChange: (dates: (Date | null)[]) => void;
}

const RangePicker = ({ value, onChange, ...props }: Props) => {
  const handleChange = (
    newValue: Date | string | [Date | null, Date | null] | null
  ) => {
    if (Array.isArray(newValue)) {
      const [startDate, endDate] = newValue;

      if (startDate && endDate) {
        onChange([startDate, endDate]);
      }
    }
  };

  return (
    <div className={classes.pickerWrapper}>
      <DateRangePicker
        onChange={handleChange}
        value={value as [Date, Date]}
        clearIcon={null}
        format={"yyyy-MM-dd"}
        {...props}
      />
    </div>
  );
};

export default RangePicker;

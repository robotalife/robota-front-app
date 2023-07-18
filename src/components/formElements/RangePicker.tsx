import DateRangePicker from "@wojtekmaj/react-daterange-picker";
import "@wojtekmaj/react-daterange-picker/dist/DateRangePicker.css";
import "react-calendar/dist/Calendar.css";
import classes from "./RangePicker.module.scss";

interface IProps {
  value: Date[];
  onChange: (dates: Date[]) => void;
  disabled: boolean;
}

const RangePicker = ({ value, onChange, disabled }: IProps) => {
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
        {...{ disabled }}
      />
    </div>
  );
};

export default RangePicker;

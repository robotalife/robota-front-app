import moment, { Moment } from "moment";

const getDateTime = (
  date: Moment | string | Date | null
): { time: string; date: string } => {
  const tmpObj = { time: "", date: "" };
  const dateObj = moment(date);

  tmpObj.time = !date ? "" : dateObj.format("H:m:s");

  // Use the month index to get the short month name from the array
  tmpObj.date = !date ? "" : dateObj.format("D MMM YYYY");

  return tmpObj;
};

export default getDateTime;

const getDateTime = (date: string): { time: string; date: string } => {
  const tmpObj = { time: "", date: "" };
  const dateObj = new Date(date);

  // Define an array of month names
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  tmpObj.time = `${dateObj.getHours()}:${dateObj.getMinutes()}:${dateObj.getSeconds()}`;

  // Use the month index to get the short month name from the array
  tmpObj.date = `${dateObj.getDay()} ${
    months[dateObj.getMonth()]
  } ${dateObj.getFullYear()}`;

  return tmpObj;
};

export default getDateTime;

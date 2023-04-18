const getDateTime = (date: string): { time: string; date: string } => {
  const tmpObj = { time: "", date: "" };
  const dateObj = new Date(date);

  tmpObj.time = `${dateObj.getHours()}:${dateObj.getMinutes()}:${dateObj.getSeconds()}`;
  tmpObj.date = `${dateObj.getDay()} ${dateObj.getMonth()} ${dateObj.getFullYear()}`;

  return tmpObj;
};

export default getDateTime;

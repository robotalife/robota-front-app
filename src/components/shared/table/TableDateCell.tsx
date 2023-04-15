import { Typography } from "@mui/material";
import classes from "./TableDateCell.module.scss";

interface Props {
  date: string;
  time: string;
}

const TableDateTime = ({ date, time }: Props) => {
  return (
    <>
      <Typography component="div" className={classes.date}>
        {date}
      </Typography>
      <Typography component="div" className={classes.time}>
        {time}
      </Typography>
    </>
  );
};

export default TableDateTime;

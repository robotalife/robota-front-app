import { Typography } from '@mui/material';
import classes from './TableDateCell.module.scss';
import { ReactNode } from 'react';

interface Props {
  date: ReactNode;
  time: ReactNode;
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

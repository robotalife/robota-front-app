import { Paper, Typography } from '@mui/material';
import { PropsWithChildren } from 'react';

import classes from './GrayListBox.module.scss';

interface Props {
  text: string;
}

const GrayListBox = ({ text }: Props) => {
  return (
    <Paper elevation={0} className={classes.textWrapper}>
      <Typography className={classes.text}>{text}</Typography>
    </Paper>
  );
};

export default GrayListBox;

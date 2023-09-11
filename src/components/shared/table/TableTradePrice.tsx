import { Typography } from '@mui/material';
import classes from './TableTradePrice.module.scss';
import { ReactNode } from 'react';

interface Props {
  entryPrice: ReactNode;
  exitPrice: ReactNode;
}

const TableTradePrice = ({ entryPrice, exitPrice }: Props) => {
  return (
    <>
      <Typography className={classes.price}>
        {entryPrice} / {exitPrice}
      </Typography>
    </>
  );
};

export default TableTradePrice;

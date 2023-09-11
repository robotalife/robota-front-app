import { Grid, Typography } from '@mui/material';
import { PropsWithChildren } from 'react';

import classes from './FieldsetElement.module.scss';

interface Props extends PropsWithChildren {
  label?: string;
  description?: string;
}

const FieldsetElement = ({ label, description, children }: Props) => {
  return (
    <>
      <Grid container alignItems={'flex-start'} spacing={2}>
        {(label || description) && (
          <Grid item xs={12} md={5}>
            {label && (
              <Typography component={'h5'} className={classes.label}>
                {label}
              </Typography>
            )}
            {description && (
              <Typography component={'p'} className={classes.description}>
                {description}
              </Typography>
            )}
          </Grid>
        )}

        <Grid item xs={12} md={7}>
          {children}
        </Grid>
      </Grid>
      <div className={classes.divider}></div>
    </>
  );
};

export default FieldsetElement;

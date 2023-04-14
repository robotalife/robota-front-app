import { Box, Grid, ListItem, Typography } from "@mui/material";
import { ReactNode } from "react";

import classes from "./HeadBand.module.scss";

interface Props {
  items: {
    title: string;
    item: ReactNode;
  }[];
}

const HeadBand = ({ items }: Props) => {
  return (
    <Box className={classes.headBand}>
      <Grid container>
        {items.map((item) => (
          <Grid item xs key={item.title}>
            <Typography className={classes.title}>{item.title}</Typography>
            <div className={classes.item}>
              <div>{item.item}</div>
            </div>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default HeadBand;

import { Paper } from "@mui/material";
import { PropsWithChildren } from "react";

import classes from "./GrayListBox.module.scss";

interface Props {
  list: string[];
}

const GrayListBox = ({ list }: Props) => {
  return (
    <Paper elevation={0} className={classes.listWrapper}>
      <ul>
        {list.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </Paper>
  );
};

export default GrayListBox;

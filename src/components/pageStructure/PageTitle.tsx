import { Typography } from "@mui/material";

import classes from "./PageTitle.module.scss";

const PageTitle = ({ title }: { title: string }) => {
  return <Typography className={classes.title}>{title}</Typography>;
};

export default PageTitle;

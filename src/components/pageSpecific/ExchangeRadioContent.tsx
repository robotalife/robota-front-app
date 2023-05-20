import { Container, Grid, Typography } from "@mui/material";
import classes from "./ExchangeRadioContent.module.scss";
import { ReactNode } from "react";
import { Link } from "react-router-dom";

interface Props {
  icon: ReactNode;
  title: string;
  info: string;
  linkText: string;
  linkHref: string;
}

const ExchangeRadioContent = ({
  icon,
  linkHref,
  linkText,
  info,
  title,
}: Props) => {
  return (
    <Container className={classes.paper}>
      <Grid container spacing={2}>
        <Grid item xs="auto">
          {icon}
        </Grid>
        <Grid item xs>
          <Typography className={classes.title}>{title}</Typography>
          <Typography className={classes.info}>{info}</Typography>
          <Link className={classes.link} to={linkHref}>
            {linkText}
          </Link>
        </Grid>
      </Grid>
    </Container>
  );
};
export default ExchangeRadioContent;

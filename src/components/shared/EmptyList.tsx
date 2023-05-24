import { Typography } from "@mui/material";
import classes from "./EmptyList.module.scss";
import Button from "../formElements/Button";
import { IconAdd } from "../../shared/icons/Icons";

import bgDesktop from "../../assets/images/empty-list-desktop.svg";
import bgMobile from "../../assets/images/empty-list-mobile.svg";
import { useNavigate } from "react-router-dom";
import routes from "../../shared/consts/routes";

const currentPage = window.location.pathname;

const EmptyList = () => {
  const navigate = useNavigate();

  return (
    <div className={classes.container}>
      <img src={bgMobile} className={classes.bgMobile} />
      <img src={bgDesktop} className={classes.bgDesktop} />
      <Typography component="h5" className={classes.title}>
        No exchanges found.
      </Typography>
      <Typography component="p" className={classes.description}>
        Get started by adding an exchange.
      </Typography>
      <Button
        color="primary"
        variant="contained"
        onClick={() =>
          navigate(`${routes.exchangeNew}?returnTo=${currentPage}`)
        }
      >
        <IconAdd style={{ marginRight: 10 }} />
        Add exchange
      </Button>
    </div>
  );
};

export default EmptyList;

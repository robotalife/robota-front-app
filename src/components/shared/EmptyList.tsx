import { Typography } from "@mui/material";
import classes from "./EmptyList.module.scss";
import Button from "../formElements/Button";
import { IconAdd } from "../../shared/icons/Icons";

import bgDesktop from "../../assets/images/empty-list-desktop.svg";
import bgMobile from "../../assets/images/empty-list-mobile.svg";
import { useNavigate } from "react-router-dom";
import routes from "../../shared/consts/routes";
import { useMemo } from "react";

const currentPage = window.location.pathname;

const EmptyList = () => {
  const navigate = useNavigate();
  const pathname = window.location.pathname;

  const navigateTo = useMemo(() => {
    switch (pathname) {
      case routes.myBots:
        return {
          route: routes.botsNew,
          text: "bot",
        };

      case routes.exchangeList:
        return {
          route: routes.exchangeNew,
          text: "exchange",
        };

      default:
        null;
        break;
    }
  }, [pathname]) as { route: string; text: string } | null;

  return (
    <div className={classes.container}>
      <img src={bgMobile} className={classes.bgMobile} />
      <img src={bgDesktop} className={classes.bgDesktop} />
      <Typography component="h5" className={classes.title}>
        No exchanges found.
      </Typography>
      <Typography component="p" className={classes.description}>
        Get started by adding an {navigateTo?.text}.
      </Typography>
      {navigateTo && (
        <Button
          color="primary"
          variant="contained"
          onClick={() => {
            navigate(`${navigateTo?.route}?returnTo=${currentPage}`);
          }}
        >
          <IconAdd style={{ marginRight: 10 }} />
          Add {navigateTo.text}
        </Button>
      )}
    </div>
  );
};

export default EmptyList;

import { Box, Grid, Typography } from "@mui/material";
import classes from "./BotCard.module.scss";
import { IBot } from "../../../shared/interfaces/bots";
import PairLogo from "../PairLogo";
import BotCardChart from "../chart/BotCardChart";
import { PropsWithChildren } from "react";
import { TempChartLong, TempChartShort } from "../../../shared/icons/Icons";
import { Link } from "react-router-dom";

interface Props extends PropsWithChildren {
  data: IBot;
  link: string;
}

const BotCard = ({ data, link, children }: Props) => {
  const pnlClass = (data: IBot) => {
    if (data.pnl == "0") {
      return "";
    }
    if (data.pnl.includes("-")) {
      return classes.red;
    }

    if (data.pnl.includes("+")) {
      return classes.green;
    }
  };

  return (
    <Box className={classes.botCard}>
      <Grid
        container
        justifyContent={"space-between"}
        alignItems={"center"}
        sx={{ mb: 3 }}
      >
        <Grid item>
          <Link to={link} className={classes.link}>
            <Typography className={classes.pairTitle} component={"div"}>
              {data.name}
            </Typography>
          </Link>
        </Grid>
        <Grid item>
          <Typography className={classes.strategy}>{data.strategy}</Typography>
        </Grid>
      </Grid>
      <Grid
        container
        justifyContent={"space-between"}
        className={classes.borderBottom}
      >
        <Grid item>
          <Typography component={"div"} className={classes.profitTitle}>
            Net Profit last month
          </Typography>
          <Typography
            component={"div"}
            className={`${classes.profitPercentage} ${pnlClass(data)}`}
          >
            {data.pnl}
          </Typography>
        </Grid>
        <Grid item>
          {data.chartData ? (
            <BotCardChart input={data.chartData} />
          ) : data.strategy === "SHORT" ? (
            <TempChartShort />
          ) : (
            <TempChartLong />
          )}
        </Grid>
      </Grid>
      <Grid
        container
        justifyContent={"space-between"}
        className={classes.borderBottom}
      >
        <Grid item>
          <PairLogo
            src={data.exchangeLogo}
            alt={data.exchangeType}
            style={{ marginRight: 6, verticalAlign: "middle" }}
          />
          {data.exchangeType}
        </Grid>
        <Grid item>
          <PairLogo
            src={data.assetLogo}
            alt={data.tradingPair}
            style={{ marginRight: 6, verticalAlign: "middle" }}
          />
          {data.tradingPair}
        </Grid>
      </Grid>
      <Grid container justifyContent={"space-between"} alignItems={"center"}>
        <Grid item>{children}</Grid>
        <Grid item xs="auto">
          <span className={classes.badge}>{data.monthlyPrice}$/Month</span>
        </Grid>
      </Grid>
    </Box>
  );
};

export default BotCard;

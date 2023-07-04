import { Box, Grid, Typography } from "@mui/material";
import classes from "./BotCard.module.scss";
import Button from "../../formElements/Button";
import { useNavigate } from "react-router-dom";
import routes from "../../../shared/consts/routes";
import { IBot } from "../../../shared/interfaces/bots";
import PairLogo from "../PairLogo";
import BotCardChart from "../chart/BotCardChart";

interface Props {
  data: IBot;
}

const BotCard = ({ data }: Props) => {
  const navigate = useNavigate();
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
          <Typography className={classes.pairTitle} component={"div"}>
            {data.name}
          </Typography>
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
          {data.chartData && <BotCardChart input={data.chartData} />}
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
        <Grid item>
          <Button
            onClick={() => {
              navigate(`${routes.botOverview}/${data.id}`);
            }}
            variant="outlined"
            size="small"
          >
            View bot detail
          </Button>
        </Grid>
        <Grid item>
          <span className={classes.badge}>{data.monthlyPrice}$/Month</span>
        </Grid>
      </Grid>
    </Box>
  );
};

export default BotCard;

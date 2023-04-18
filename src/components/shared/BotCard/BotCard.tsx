import { Box, Grid, Typography } from "@mui/material";
import classes from "./BotCard.module.scss";
import { IBot } from "../../../shared/providers/MyBotsProvider";
import { TempChartLong, TempChartShort } from "../../../shared/icons/Icons";
import Button from "../../formElements/Button";
import { useNavigate } from "react-router-dom";
import routes from "../../../shared/consts/routes";

interface Props {
  data: IBot;
}

const BotCard = ({ data }: Props) => {
  const navigate = useNavigate();

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
            {data.baseAsset} - {data.qouteAsset}
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
            className={`${classes.profitPercentage} ${
              data.strategy === "LONG" ? classes.green : classes.red
            }`}
          >
            +18%
          </Typography>
        </Grid>
        <Grid item>
          {data.strategy === "LONG" ? <TempChartLong /> : <TempChartShort />}
        </Grid>
      </Grid>
      <Grid
        container
        justifyContent={"space-between"}
        className={classes.borderBottom}
      >
        <Grid item>{data.exchangeType}</Grid>
        <Grid item>{data.tradingPair}</Grid>
      </Grid>
      <Grid container justifyContent={"space-between"} alignItems={"center"}>
        <Grid item>
          <Button
            onClick={() => {
              navigate(`${routes.botOverview}/${data.id}`);
            }}
            variant="outlined"
            className={classes.btn}
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

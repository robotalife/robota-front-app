import { Box, Grid } from "@mui/material";
import classes from "./BotCard.module.scss";
import { IBot } from "../../../shared/providers/MyBotsProvider";
import { TempChart } from "../../../shared/icons/Icons";
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
      <Grid container>
        <Grid item>
          {data.baseAsset} - {data.qouteAsset}
          <br />
          Net Profit last month
          <br />
          Profit Percentage
        </Grid>
        <Grid item>
          {data.strategy}
          <TempChart />
        </Grid>
      </Grid>
      <Grid container>
        <Grid item>{data.exchangeType}</Grid>
        <Grid item>{data.tradingPair}</Grid>
      </Grid>
      <Grid container>
        <Grid item>
          <Button
            onClick={() => {
              navigate(`${routes.botOverview}/${data.id}`);
            }}
            variant="outlined"
          >
            View bot detail
          </Button>
        </Grid>
        <Grid item>{data.monthlyPrice}$/Month</Grid>
      </Grid>
    </Box>
  );
};

export default BotCard;

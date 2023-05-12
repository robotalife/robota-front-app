import { Box, Grid, Typography } from "@mui/material";
import Button from "../../formElements/Button";
import { useNavigate } from "react-router-dom";
import routes from "../../../shared/consts/routes";
import PairLogo from "../PairLogo";
import BotCardChart from "../chart/BotCardChart";
import { IExchange } from "../../../shared/interfaces/exchange";

import classes from "./ExchangeCard.module.scss";
import { IconBinance, IconPencil } from "../../../shared/icons/Icons";
import IndicatorBadge from "../IndicatorBadge";

interface Props {
  data: IExchange;
}

const ExchangeCard = ({ data }: Props) => {
  return (
    <Box className={classes.exchangeCard}>
      <Grid
        container
        justifyContent={"space-between"}
        alignItems={"flex-start"}
        sx={{ mb: 3 }}
      >
        <Grid item xs="auto">
          <IconBinance />
        </Grid>
        <Grid item xs="auto">
          <IndicatorBadge>Deactive</IndicatorBadge>
        </Grid>
      </Grid>
      <Grid
        container
        justifyContent={"space-between"}
        alignItems={"center"}
        className={classes.borderBottom}
      >
        <Grid item xs="auto">
          <Typography className={classes.name}>{data.exchangeName}</Typography>
          <Typography className={classes.description}>
            {data.exchangeType}
          </Typography>
        </Grid>
        <Grid item xs="auto">
          <Typography className={classes.balance}>2,400 $</Typography>
        </Grid>
      </Grid>
      <Grid container justifyContent={"space-between"} alignItems={"center"}>
        <Grid item xs={6}>
          <Button variant="outlined" size="small">
            <IconPencil style={{ marginRight: 8, height: 16, width: 16 }} />{" "}
            Update API
          </Button>
        </Grid>
        <Grid item xs={6}>
          <Button variant="outlined" size="small">
            Delete Exchange
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ExchangeCard;

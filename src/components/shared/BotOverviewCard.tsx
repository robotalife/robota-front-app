import { Grid, Typography } from "@mui/material";
import { ReactNode, useContext } from "react";

import classes from "./BotOverviewCard.module.scss";
import {
  IconArrowDown,
  IconArrowUp,
  TempChartLong,
  TempChartShort,
} from "../../shared/icons/Icons";
import { BotContext } from "../../shared/providers/BotProvider";

interface Props {
  action: ReactNode;
  chart: ReactNode;
  content: ReactNode;
  description: ReactNode;
  title: string;
}

const BotOverviewCard = ({
  action,
  chart,
  content,
  description,
  title,
}: Props) => {
  const { botData } = useContext(BotContext);

  const isLong = botData.strategy === "LONG";

  return (
    <Grid container justifyContent={"space-between"}>
      <Grid item>
        <Typography>{title}</Typography>
        <Typography>{content}</Typography>
        <div>
          {isLong ? <IconArrowUp /> : <IconArrowDown />}
          <Typography className={`${isLong ? classes.success : classes.error}`}>
            2%
          </Typography>
          <Typography>Avg. Daily Profit</Typography>
        </div>
      </Grid>
      <Grid item>
        <div>{action}</div>
        <div>{isLong ? <TempChartLong /> : <TempChartShort />}</div>
      </Grid>
    </Grid>
  );
};

export default BotOverviewCard;

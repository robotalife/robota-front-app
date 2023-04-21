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
        <Typography className={classes.title}>{title}</Typography>
        <Typography className={classes.content}>{content}</Typography>
        <div className={classes.description}>{description}</div>
      </Grid>
      <Grid
        item
        sx={{
          textAlign: "end",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <div className={classes.action}>{action}</div>
        <div className={classes.chart}>{chart}</div>
      </Grid>
    </Grid>
  );
};

export default BotOverviewCard;

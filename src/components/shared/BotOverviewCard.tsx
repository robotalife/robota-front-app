import { Grid, Typography } from "@mui/material";
import { ReactNode, useContext } from "react";

import classes from "./BotOverviewCard.module.scss";
import { BotContext } from "../../shared/providers/BotProvider";
import BotCardChart from "./chart/BotCardChart";
import { IChartData } from "../../shared/interfaces/bots";

interface Props {
  action: ReactNode;
  hasChart?: boolean;
  content: ReactNode;
  description: ReactNode;
  title: string;
  chartData: IChartData;
}

const BotOverviewCard = ({
  action,
  hasChart,
  content,
  description,
  title,
  chartData,
}: Props) => {
  const { botData } = useContext(BotContext);
  const emptyChart: IChartData = { labels: [], data: [] };

  const isNegative = typeof content === "string" && content.startsWith("-");

  return (
    <Grid container justifyContent={"space-between"}>
      <Grid item xs>
        <Typography className={classes.title}>{title}</Typography>
        {hasChart ? (
          <Typography
            className={`${
              isNegative ? classes.negativeContent : classes.positiveContent
            }`}
          >
            {content}
          </Typography>
        ) : (
          <Typography className={classes.content}>{content}</Typography>
        )}
        <div className={classes.description}>{description}</div>
      </Grid>
      <Grid
        xs
        item
        sx={{
          textAlign: "end",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <div className={classes.action}>{action}</div>
        <div className={classes.chartContainer}>
          {hasChart && (
            <BotCardChart input={chartData ? chartData : emptyChart} />
          )}
        </div>
      </Grid>
    </Grid>
  );
};

export default BotOverviewCard;

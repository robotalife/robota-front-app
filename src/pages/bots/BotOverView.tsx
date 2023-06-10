import { useParams } from "react-router-dom";
import useAxios from "../../shared/hooks/useAxios";
import { useCallback, useEffect, useState } from "react";
import { AxiosResponse } from "axios";
import apiEndPoints from "../../shared/consts/apiEndpoints";
import { IBotOverview } from "../../shared/interfaces/bots";
import { Container, Grid, MenuItem, Paper, Typography } from "@mui/material";
import WrapperBox from "../../components/shared/wrapperBox/WrapperBox";
import WrapperBoxSection from "../../components/shared/wrapperBox/WrapperBoxSection";
import BotOverviewCard from "../../components/shared/BotOverviewCard";
import {
  Icon3DotsVertical,
  IconArrowUp,
  IconInfoCircle,
} from "../../shared/icons/Icons";
import WrapperBoxHeader from "../../components/shared/wrapperBox/WrapperBoxHeader";
import ToggleButtonGroup from "../../components/formElements/ToggleButtonGroup";
import { durations } from "../../shared/consts/durations";
import OverviewAreaChart from "../../components/shared/chart/OverviewAreaChart";
import Button from "../../components/formElements/Button";
import Select from "../../components/formElements/Select";

const buttonStyle = {
  borderRadius: "6px !important",
  fontSize: 14,
  fontWeight: 500,
  color: "#667085",
  marginRight: 2,
};

const activeButtonStyle = {
  backgroundColor: "#F9F5FF",
  color: "#6941C6",
};

const BotOverView = () => {
  const { botId } = useParams();
  const { axios } = useAxios();
  const [overview, setOverview] = useState<IBotOverview>({} as IBotOverview);
  const [loading, setLoading] = useState(true);

  const [activeButton, setActiveButton] = useState<"summary" | "day">(
    "summary"
  );

  const getOverviewData = useCallback(async () => {
    setLoading(true);

    try {
      const response: AxiosResponse<IBotOverview, any> = await axios.get(
        apiEndPoints.getBotOverview(botId as string)
      );

      const overview = response.data;
      setOverview(overview);
    } catch (error) {
      // Handle error
    } finally {
      setLoading(false);
    }
  }, [setOverview, setLoading]);

  useEffect(() => {
    getOverviewData();
  }, [getOverviewData]);

  useEffect(() => {
    //action for active button
    console.log(activeButton);
  }, [activeButton]);

  return (
    <Container maxWidth="xl">
      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid xs={12} lg={4} item>
          <WrapperBox fullHeight>
            <WrapperBoxSection>
              <BotOverviewCard
                action={<IconInfoCircle />}
                hasChart
                content={overview.totalProfit}
                chartData={overview.pnlChartData}
                description={
                  <>
                    <IconArrowUp className="success" />
                    <Typography
                      component={"span"}
                      className="success"
                      sx={{ px: 1 }}
                    >
                      2%
                    </Typography>
                    <Typography
                      component={"span"}
                      className="description"
                      sx={{ px: 1 }}
                    >
                      Avg. Daily Profit
                    </Typography>
                  </>
                }
                title={"Total Profit"}
              />
            </WrapperBoxSection>
          </WrapperBox>
        </Grid>
        <Grid xs={12} lg={4} item>
          <WrapperBox fullHeight>
            <WrapperBoxSection>
              <BotOverviewCard
                action={<Icon3DotsVertical />}
                hasChart
                chartData={overview.winRateChartData}
                content={overview.winRate}
                description={
                  <>
                    <Typography
                      component={"span"}
                      className="success"
                      sx={{ px: 1 }}
                    >
                      0.8%
                    </Typography>
                    <Typography
                      component={"span"}
                      className="description"
                      sx={{ px: 1 }}
                    >
                      Avg. Daily Winrate
                    </Typography>
                  </>
                }
                title={"Win rate"}
              />
            </WrapperBoxSection>
          </WrapperBox>
        </Grid>
        <Grid xs={12} lg={4} item>
          <WrapperBox fullHeight>
            <WrapperBoxSection>
              {/*TODO: @homam chartData is not provide*/}
              <BotOverviewCard
                action={""}
                // chartData={{
                //   labels: [],
                //   data: [],
                // }}
                content={overview.closedDeals}
                description={""}
                title={"Closed Deals"}
              />
            </WrapperBoxSection>
          </WrapperBox>
        </Grid>
      </Grid>
      <Grid
        container
        justifyContent={"space-between"}
        alignItems={"center"}
        sx={{ mb: 3 }}
      >
        <Grid item xs={12} lg="auto">
          <WrapperBoxHeader title="Overview" noBorder />
        </Grid>
        <Grid item xs={12} lg="auto" sx={{ mb: { xs: 2, lg: 0 } }}>
          <ToggleButtonGroup options={durations} noIndicator id="durations" />
        </Grid>
        <Grid item xs={12} sx={{ mb: 2, display: { xs: "none", lg: "block" } }}>
          <Button
            size="small"
            sx={{
              ...buttonStyle,
              ...(activeButton === "summary" ? activeButtonStyle : {}),
            }}
            onClick={() => setActiveButton("summary")}
          >
            Summary Profit
          </Button>
          <Button
            size="small"
            onClick={() => setActiveButton("day")}
            sx={{
              ...buttonStyle,
              ...(activeButton === "day" ? activeButtonStyle : {}),
            }}
          >
            Profit by Day
          </Button>
        </Grid>
        <Grid item xs={12} sx={{ mb: 2, display: { lg: "none" } }}>
          <Select
            onChange={(e) =>
              setActiveButton(e.target.value as "summary" | "day")
            }
            value={activeButton}
            sx={{ width: "100%" }}
          >
            <MenuItem value={"summary"}>Summary Profit</MenuItem>
            <MenuItem value={"day"}>Profit by Day</MenuItem>
          </Select>
        </Grid>
      </Grid>
      <OverviewAreaChart />
    </Container>
  );
};

export default BotOverView;

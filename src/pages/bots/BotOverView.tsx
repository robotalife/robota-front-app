import { useParams } from "react-router-dom";
import useAxios from "../../shared/hooks/useAxios";
import { useCallback, useEffect, useState } from "react";
import { AxiosResponse } from "axios";
import apiEndPoints from "../../shared/consts/apiEndpoints";
import { IBotOverview } from "../../shared/interfaces/bots";
import { Container, Grid, Typography } from "@mui/material";
import WrapperBox from "../../components/shared/wrapperBox/WrapperBox";
import WrapperBoxSection from "../../components/shared/wrapperBox/WrapperBoxSection";
import BotOverviewCard from "../../components/shared/BotOverviewCard";
import {
  Icon3DotsVertical,
  IconArrowUp,
  IconInfoCircle,
  TempChartLong,
} from "../../shared/icons/Icons";
import WrapperBoxHeader from "../../components/shared/wrapperBox/WrapperBoxHeader";
import ToggleButtonGroup from "../../components/formElements/ToggleButtonGroup";
import { durations } from "../../shared/consts/durations";
import OverviewAreaChart from "../../components/shared/chart/OverviewAreaChart";

const BotOverView = () => {
  const { botId } = useParams();
  const { axios } = useAxios();
  const [overview, setOverview] = useState<IBotOverview>({} as IBotOverview);
  const [loading, setLoading] = useState(true);

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
                title={"Winrate"}
              />
            </WrapperBoxSection>
          </WrapperBox>
        </Grid>
        <Grid xs={12} lg={4} item>
          <WrapperBox fullHeight>
            <WrapperBoxSection>
              <BotOverviewCard
                action={""}
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
        <Grid item xs={12} lg="auto">
          <ToggleButtonGroup options={durations} noIndicator id="durations" />
        </Grid>
      </Grid>
      <OverviewAreaChart />
    </Container>
  );
};

export default BotOverView;

import { useCallback, useContext, useEffect, useState } from "react";
import { Container, Grid, MenuItem } from "@mui/material";
import { MyBotsContext } from "../../shared/providers/MyBotsProvider";
import Button from "../../components/formElements/Button";
import { useNavigate, useParams } from "react-router-dom";
import WrapperBox from "../../components/shared/wrapperBox/WrapperBox";
import WrapperBoxSection from "../../components/shared/wrapperBox/WrapperBoxSection";
import WrapperBoxHeader from "../../components/shared/wrapperBox/WrapperBoxHeader";
import classes from "./TradeTerminal.module.scss";
import useAxios from "../../shared/hooks/useAxios";
import { IBotOverview, IChartData } from "../../shared/interfaces/bots";
import Loader from "../../components/shared/Loader";
import Table from "../../components/shared/table/Table";
import TableRow from "../../components/shared/table/TableRow";
import TableCell from "../../components/shared/table/TableCell";
import TableBody from "../../components/shared/table/TableBody";
import ToggleButtonGroup from "../../components/formElements/ToggleButtonGroup";
import { durations } from "../../shared/consts/durations";
import Select from "../../components/formElements/Select";
import OverviewAreaChart from "../../components/shared/chart/OverviewAreaChart";
import { AxiosResponse } from "axios";
import apiEndPoints from "../../shared/consts/apiEndpoints";
import TabBar, { TabBarItem } from "../../components/pageStructure/TabBar";
import BotaDataTable from "../../components/pageStructure/BotaDataTable";

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

const NewBotOverview = () => {
  const { botId } = useParams();
  const [overview, setOverview] = useState<IBotOverview>({
    averageDailyProfit: "",
    averageWinRate: "",
  } as IBotOverview);

  const [tab, setTab] = useState<"performance" | "information">("performance");

  const [loading, setLoading] = useState(false);
  const { axios } = useAxios();

  const [duration, setDuration] = useState<number>(durations[0].value);
  const [selectedChart, setSelectedChart] = useState<string>("ROI");
  const handleDurationChange = (e: any) => {
    setDuration(Number(e.target.value));
  };
  const [activeButton, setActiveButton] = useState<"summary" | "day">(
    "summary"
  );
  const [chartInput, setChartInput] = useState<IChartData>({
    labels: [],
    data: [],
  });

  const getOverviewData = useCallback(async () => {
    setLoading(true);

    try {
      const response: AxiosResponse<IBotOverview, any> = await axios.get(
        `${apiEndPoints.getBotOverview(botId as string)}${duration}`
      );

      const overview = response.data;
      setOverview(overview);
      const charts = {
        summaryProfitChart: overview.cumulativeProfitChartData,
        profitByDay: overview.profitPerDayChartData,
      };
      setChartInput(
        activeButton === "summary"
          ? overview.cumulativeProfitChartData
          : overview.profitPerDayChartData
      );
    } catch (error) {
      // Handle error
    } finally {
      setLoading(false);
    }
  }, [setOverview, setLoading, setActiveButton, setChartInput, duration]);

  useEffect(() => {
    getOverviewData();
  }, [getOverviewData]);

  useEffect(() => {
    //action for active button
    setChartInput(
      activeButton === "summary"
        ? overview.cumulativeProfitChartData
        : overview.profitPerDayChartData
    );
  }, [activeButton, overview]);

  const tabs: TabBarItem[] = [
    {
      label: "Information",
      value: "information",
      action: () => setTab("information"),
      active: tab === "information",
    },
    {
      label: "Performance",
      value: "performance",
      action: () => setTab("performance"),
      active: tab === "performance",
    },
  ];

  return (
    <Container maxWidth="xl" sx={{ m: 0, padding: "0!important" }}>
      <Grid container spacing={4} sx={{ mb: 3 }}>
        <Grid item xs={12} lg={4}>
          <WrapperBox>
            <WrapperBoxHeader>
              <TabBar tabs={tabs} />
            </WrapperBoxHeader>
            <WrapperBoxSection>
              {tab === "performance" ? (
                <Grid item xs={12} lg="auto" sx={{ mb: { xs: 2, lg: 0 } }}>
                  <ToggleButtonGroup
                    options={durations}
                    noIndicator
                    id="durations"
                    value={duration}
                    onChange={(e) => {
                      handleDurationChange(e);
                    }}
                    fullWidth
                  />
                  <Table className={classes.table}>
                    <TableBody>
                      <TableRow>
                        <TableCell>Asset Account</TableCell>
                        <TableCell sx={{ textAlign: "end" }}>
                          USDT 643
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>ROI</TableCell>
                        <TableCell sx={{ textAlign: "end" }}>
                          USDT 243
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Win Ratio</TableCell>
                        <TableCell sx={{ textAlign: "end" }}>92.32 %</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>uPNL of active bot trades</TableCell>
                        <TableCell sx={{ textAlign: "end" }}>$ 12</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>PnL Ratio</TableCell>
                        <TableCell sx={{ textAlign: "end" }}>1:3.1</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Invested money on bot</TableCell>
                        <TableCell sx={{ textAlign: "end" }}>
                          USDT 400
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Funds locked in bot trades</TableCell>
                        <TableCell sx={{ textAlign: "end" }}>
                          USDT 540
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Total Transactions</TableCell>
                        <TableCell sx={{ textAlign: "end" }}>325</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>No. of Winning Trades</TableCell>
                        <TableCell sx={{ textAlign: "end" }}>27</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>No. of Winning Trades</TableCell>
                        <TableCell sx={{ textAlign: "end" }}>27</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>No. of Losing Trades</TableCell>
                        <TableCell sx={{ textAlign: "end" }}>219</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Average Profit</TableCell>
                        <TableCell sx={{ textAlign: "end" }}>4.24</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Average Losses</TableCell>
                        <TableCell sx={{ textAlign: "end" }}>-11.84</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Average Holding Time</TableCell>
                        <TableCell sx={{ textAlign: "end" }}>3D 20H</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Average Holding Time</TableCell>
                        <TableCell sx={{ textAlign: "end" }}>
                          Leverage Median 20x
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Trading Frequency</TableCell>
                        <TableCell sx={{ textAlign: "end" }}>41D</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Last Trading Time</TableCell>
                        <TableCell sx={{ textAlign: "end" }}>
                          2023-04-12 05:47
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </Grid>
              ) : (
                <BotaDataTable />
              )}
            </WrapperBoxSection>
          </WrapperBox>
        </Grid>
        <Grid item xs={12} lg={8}>
          <WrapperBox>
            <WrapperBoxHeader title={selectedChart} />
            <WrapperBoxSection>
              <Grid
                container
                justifyContent={"space-between"}
                alignItems={"center"}
                sx={{ mb: 3 }}
              >
                <Grid
                  item
                  xs={12}
                  sx={{ mb: 2, display: { xs: "none", lg: "block" } }}
                >
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
              {loading ? <Loader /> : <OverviewAreaChart input={chartInput} />}
            </WrapperBoxSection>
          </WrapperBox>
        </Grid>
      </Grid>
    </Container>
  );
};
export default NewBotOverview;

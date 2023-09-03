import {useCallback, useEffect, useState} from "react";
import {Container, Grid, MenuItem, Typography} from "@mui/material";
import Button from "../../components/formElements/Button";
import {useParams} from "react-router-dom";
import WrapperBox from "../../components/shared/wrapperBox/WrapperBox";
import WrapperBoxSection from "../../components/shared/wrapperBox/WrapperBoxSection";
import WrapperBoxHeader from "../../components/shared/wrapperBox/WrapperBoxHeader";
import useAxios from "../../shared/hooks/useAxios";
import {IBotOverviewV2, IChartData} from "../../shared/interfaces/bots";
import Loader from "../../components/shared/Loader";
import Table from "../../components/shared/table/Table";
import TableRow from "../../components/shared/table/TableRow";
import TableCell from "../../components/shared/table/TableCell";
import TableBody from "../../components/shared/table/TableBody";
import ToggleButtonGroup from "../../components/formElements/ToggleButtonGroup";
import {durations} from "../../shared/consts/durations";
import Select from "../../components/formElements/Select";
import OverviewAreaChart from "../../components/shared/chart/OverviewAreaChart";
import {AxiosResponse} from "axios";
import apiEndPoints from "../../shared/consts/apiEndpoints";
import TabBar, {TabBarItem} from "../../components/pageStructure/TabBar";
import BotaDataTable from "../../components/pageStructure/BotaDataTable";
import TextBadge from "../../components/shared/TextBadge";
import classes from "./BotOverviewV2.module.scss";

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
    const {botId} = useParams();
    const [overview, setOverview] = useState<IBotOverviewV2>({
        botId: "",
        loseRate: {
            value: "",
            symbol: "",
        },
        roi: {
            value: "0",
            symbol: "",
        },
        pnl: {
            value: "0",
            symbol: "",
        },
        winRate: {
            value: "",
            symbol: "",
        },
        roiChartData: {
            data: [],
            labels: [],
        },
        cumulativeProfitChartData: {
            data: [],
            labels: [],
        },
        totalTransactions:{
            value: "",
            symbol: "",
        }
    } as unknown as IBotOverviewV2);

    const [tab, setTab] = useState<"performance" | "information">("performance");

    const [loading, setLoading] = useState(false);
    const {axios} = useAxios();

    const [duration, setDuration] = useState<number>(durations[0].value);
    const [selectedChart, setSelectedChart] = useState<string>("ROI");
    const handleDurationChange = (e: any) => {
        setDuration(Number(e.target.value));
    };
    const [activeButton, setActiveButton] = useState<"roi" | "pnl">(
        "roi"
    );
    const [chartInput, setChartInput] = useState<IChartData>({
        labels: [],
        data: [],
    });

    const getOverviewData = useCallback(async () => {
        setLoading(true);

        try {
            const response: AxiosResponse<IBotOverviewV2, any> = await axios.get(
                `${apiEndPoints.getBotOverview2(botId as string)}${duration}`
            );

            const overview = response.data;
            console.log(overview, "overview");
            setOverview(overview);
            const charts = {
                roiChartData: overview.roiChartData,
                pnlCumulativeChartData: overview.pnlCumulativeChartData,
            };
            setChartInput(
                activeButton === "roi"
                    ? overview.roiChartData
                    : overview.pnlCumulativeChartData
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
            activeButton === "roi"
                ? overview.roiChartData
                : overview.pnlCumulativeChartData
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
        <Container maxWidth="xl" sx={{m: 0, padding: "0!important"}}>
            <Grid container spacing={4} sx={{mb: 3}}>
                <Grid item xs={12} lg={4}>
                    <WrapperBox>
                        <WrapperBoxHeader>
                            <TabBar tabs={tabs}/>
                        </WrapperBoxHeader>
                        <WrapperBoxSection>
                            {tab === "performance" ? (
                                <Grid item xs={12} lg="auto" sx={{mb: {xs: 2, lg: 0}}}>
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
                                            {/*<TableRow>*/}
                                            {/*  <TableCell>Asset Account</TableCell>*/}
                                            {/*  <TableCell sx={{ textAlign: "end" }}>*/}
                                            {/*    USDT 643*/}
                                            {/*  </TableCell>*/}
                                            {/*</TableRow>*/}
                                            <TableRow>
                                                <TableCell><Typography component={"span"}>ROI</Typography></TableCell>
                                                <TableCell sx={{textAlign: "end"}}>
                                                    <TextBadge>
                                                        {overview.roi.value + overview.roi.symbol}
                                                    </TextBadge>
                                                    {/*<Typography*/}
                                                    {/*    component={"span"}*/}
                                                    {/*>*/}
                                                    {/*    {overview.pnl.value + " " + overview.pnl.symbol}*/}
                                                    {/*</Typography>*/}
                                                </TableCell>
                                            </TableRow>
                                            {/*<TableRow>*/}
                                            {/*    <TableCell><Typography component={"span"}>Win Ratio</Typography></TableCell>*/}
                                            {/*    <TableCell sx={{textAlign: "end"}}>*/}
                                            {/*        <Typography*/}
                                            {/*            component={"span"}*/}
                                            {/*        >*/}
                                            {/*            {overview.winRate.value + " " + overview.winRate.symbol}*/}
                                            {/*        </Typography>*/}
                                            {/*    </TableCell>*/}
                                            {/*</TableRow>*/}
                                            {/*<TableRow>*/}
                                            {/*    <TableCell><Typography component={"span"}>uPNL of active bot trades</Typography></TableCell>*/}
                                            {/*    <TableCell sx={{textAlign: "end"}}><Typography*/}
                                            {/*        component={"span"} className={classes.overviewValue}*/}
                                            {/*    >*/}
                                            {/*        $ 12*/}
                                            {/*    </Typography></TableCell>*/}
                                            {/*</TableRow>*/}
                                            {/*<TableRow>*/}
                                            {/*    <TableCell><Typography component={"span"}>PnL Ratio</Typography></TableCell>*/}
                                            {/*    <TableCell sx={{textAlign: "end"}}>*/}
                                            {/*        <Typography*/}
                                            {/*            component={"span"} className={classes.overviewValue}*/}
                                            {/*        >*/}
                                            {/*            1:3.1*/}
                                            {/*        </Typography></TableCell>*/}
                                            {/*</TableRow>*/}
                                            {/*<TableRow>*/}
                                            {/*    <TableCell><Typography component={"span"}>Invested money on bot</Typography></TableCell>*/}
                                            {/*    <TableCell sx={{textAlign: "end"}}>*/}
                                            {/*        <Typography*/}
                                            {/*            component={"span"} className={classes.overviewValue}*/}
                                            {/*        > USDT 400*/}
                                            {/*        </Typography>*/}
                                            {/*    </TableCell>*/}
                                            {/*</TableRow>*/}
                                            {/*<TableRow>*/}
                                            {/*    <TableCell><Typography component={"span"}>Funds locked in bot trades</Typography></TableCell>*/}
                                            {/*    <TableCell sx={{textAlign: "end"}}>*/}
                                            {/*        <Typography*/}
                                            {/*            component={"span"} className={classes.overviewValue}*/}
                                            {/*        > USDT 400*/}
                                            {/*        </Typography>*/}
                                            {/*    </TableCell>*/}
                                            {/*</TableRow>*/}
                                            <TableRow>
                                                <TableCell>
                                                    <Typography component={"span"}
                                                    >Total Transactions
                                                    </Typography>
                                                </TableCell>
                                                <TableCell sx={{textAlign: "end"}}>
                                                    <Typography component={"span"} className={classes.overviewValue}>
                                                        {overview.totalTransactions.value + " " + overview.totalTransactions.symbol}
                                                    </Typography>
                                                </TableCell>
                                            </TableRow>
                                            {/*<TableRow>*/}
                                            {/*    <TableCell><Typography component={"span"}>No. of Winning Trades</Typography></TableCell>*/}
                                            {/*    <TableCell sx={{textAlign: "end"}}>  <Typography*/}
                                            {/*        component={"span"} className={classes.overviewValue}*/}
                                            {/*    > 27*/}
                                            {/*    </Typography></TableCell>*/}
                                            {/*</TableRow>*/}
                                            {/*<TableRow>*/}
                                            {/*    <TableCell><Typography component={"span"}>No. of Winning Trades</Typography></TableCell>*/}
                                            {/*    <TableCell sx={{textAlign: "end"}}>  <Typography*/}
                                            {/*        component={"span"} className={classes.overviewValue}*/}
                                            {/*    > 12*/}
                                            {/*    </Typography></TableCell>*/}
                                            {/*</TableRow>*/}
                                            {/*<TableRow>*/}
                                            {/*    <TableCell><Typography component={"span"}>No. of Losing Trades</Typography></TableCell>*/}
                                            {/*    <TableCell sx={{textAlign: "end"}}>*/}
                                            {/*        <Typography*/}
                                            {/*            component={"span"} className={classes.overviewValue}*/}
                                            {/*        >219</Typography></TableCell>*/}
                                            {/*</TableRow>*/}
                                            {/*<TableRow>*/}
                                            {/*    <TableCell><Typography component={"span"}>Average Profit</Typography></TableCell>*/}
                                            {/*    <TableCell sx={{textAlign: "end"}}>*/}
                                            {/*        <Typography*/}
                                            {/*            component={"span"} className={classes.overviewValue}*/}
                                            {/*        >4.24*/}
                                            {/*        </Typography>*/}
                                            {/*    </TableCell>*/}
                                            {/*</TableRow>*/}
                                            {/*<TableRow>*/}
                                            {/*    <TableCell><Typography component={"span"}>Average Losses</Typography></TableCell>*/}
                                            {/*    <TableCell sx={{textAlign: "end"}}>*/}
                                            {/*        <Typography*/}
                                            {/*            component={"span"} className={classes.overviewValue}*/}
                                            {/*        >*/}
                                            {/*            -11.84*/}
                                            {/*        </Typography>*/}
                                            {/*    </TableCell>*/}
                                            {/*</TableRow>*/}
                                            {/*<TableRow>*/}
                                            {/*    <TableCell><Typography component={"span"}>Average Holding Time</Typography></TableCell>*/}
                                            {/*    <TableCell sx={{textAlign: "end"}}>*/}
                                            {/*        <Typography*/}
                                            {/*            component={"span"} className={classes.overviewValue}*/}
                                            {/*        >*/}
                                            {/*            3D 20H*/}
                                            {/*        </Typography>*/}
                                            {/*    </TableCell>*/}
                                            {/*</TableRow>*/}
                                            {/*<TableRow>*/}
                                            {/*    <TableCell><Typography component={"span"}>Average Holding Time</Typography></TableCell>*/}
                                            {/*    <TableCell sx={{textAlign: "end"}}>*/}
                                            {/*        <Typography*/}
                                            {/*            component={"span"} className={classes.overviewValue}*/}
                                            {/*        >20x</Typography>*/}
                                            {/*    </TableCell>*/}
                                            {/*</TableRow>*/}
                                            {/*<TableRow>*/}
                                            {/*    <TableCell><Typography component={"span"}>Trading Frequency</Typography></TableCell>*/}
                                            {/*    <TableCell sx={{textAlign: "end"}}>*/}
                                            {/*        <Typography*/}
                                            {/*            component={"span"} className={classes.overviewValue}*/}
                                            {/*        >41D*/}
                                            {/*        </Typography>*/}
                                            {/*    </TableCell>*/}
                                            {/*</TableRow>*/}
                                            {/*<TableRow>*/}
                                            {/*    <TableCell>*/}
                                            {/*        <Typography component={"span"}>*/}
                                            {/*            Last Trading Time*/}
                                            {/*        </Typography>*/}
                                            {/*    </TableCell>*/}
                                            {/*    <TableCell sx={{textAlign: "end"}}>*/}
                                            {/*        <Typography*/}
                                            {/*            component={"span"} className={classes.overviewValue}*/}
                                            {/*        >*/}
                                            {/*            2023-04-12 05:47*/}
                                            {/*        </Typography>*/}
                                            {/*    </TableCell>*/}
                                            {/*</TableRow>*/}
                                        </TableBody>
                                    </Table>
                                </Grid>
                            ) : (
                                <BotaDataTable/>
                            )}
                        </WrapperBoxSection>
                    </WrapperBox>
                </Grid>
                <Grid item xs={12} lg={8}>
                    <WrapperBox>
                        <WrapperBoxHeader title={selectedChart}/>
                        <WrapperBoxSection>
                            <Grid
                                container
                                justifyContent={"space-between"}
                                alignItems={"center"}
                                sx={{mb: 3}}
                            >
                                <Grid
                                    item
                                    xs={12}
                                    sx={{mb: 2, display: {xs: "none", lg: "block"}}}
                                >
                                    <Button
                                        size="small"
                                        sx={{
                                            ...buttonStyle,
                                            ...(activeButton === "roi" ? activeButtonStyle : {}),
                                        }}
                                        onClick={() => setActiveButton("roi")}
                                    >
                                        ROI
                                    </Button>
                                    {/*<Button*/}
                                    {/*    size="small"*/}
                                    {/*    onClick={() => setActiveButton("pnl")}*/}
                                    {/*    sx={{*/}
                                    {/*        ...buttonStyle,*/}
                                    {/*        ...(activeButton === "pnl" ? activeButtonStyle : {}),*/}
                                    {/*    }}*/}
                                    {/*>*/}
                                    {/*    Cumulative PnL*/}
                                    {/*</Button>*/}
                                </Grid>
                                <Grid item xs={12} sx={{mb: 2, display: {lg: "none"}}}>
                                    <Select
                                        onChange={(e) =>
                                            setActiveButton(e.target.value as "roi" | "pnl")
                                        }
                                        value={activeButton}
                                        sx={{width: "100%"}}
                                    >
                                        <MenuItem value={"roi"}>ROI</MenuItem>
                                        {/*<MenuItem value={"pnl"}>Cumulative PnL</MenuItem>*/}
                                    </Select>
                                </Grid>
                            </Grid>
                            {loading ? <Loader/> : <OverviewAreaChart input={chartInput}/>}
                        </WrapperBoxSection>
                    </WrapperBox>
                </Grid>
            </Grid>
        </Container>
    );
};
export default NewBotOverview;

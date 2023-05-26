import WrapperBox from "../../components/shared/wrapperBox/WrapperBox";
import WrapperBoxHeader from "../../components/shared/wrapperBox/WrapperBoxHeader";
import WrapperBoxSection from "../../components/shared/wrapperBox/WrapperBoxSection";
import Table from "../../components/shared/table/Table";
import TableCell from "../../components/shared/table/TableCell";
import React, {useCallback, useEffect, useState} from "react";
import TableHead from "../../components/shared/table/TableHead";
import TableRow from "../../components/shared/table/TableRow";
import TableBody from "../../components/shared/table/TableBody";
import {Grid} from "@mui/material";
import PairLogo from "../../components/shared/PairLogo";
import {ILiveTrade} from "../../shared/interfaces/bots";
import {DataWithPagination, PaginationObj} from "../../shared/interfaces/paginateData";
import {AxiosResponse} from "axios";
import apiEndPoints from "../../shared/consts/apiEndpoints";
import useAxios from "../../shared/hooks/useAxios";
import IndicatorBadge from "../../components/shared/IndicatorBadge";
import TableDateTime from "../../components/shared/table/TableDateCell";
import TableStrategy from "../../components/shared/table/StrategyBadge";
import {IconPause, IconPlay} from "../../shared/icons/Icons";
import Button from "../../components/formElements/Button";
import Pagination from "../../components/shared/Pagination";
import Loader from "../../components/shared/Loader";


const LiveTrade = () => {
    const {axios} = useAxios();
    const [liveTrades, setLiveTrades] = useState<ILiveTrade[]>([] as ILiveTrade[]);
    const [pagination, setPagination] = useState<PaginationObj>({
        currentPage: 0,
        hasNext: false,
        nextPage: 1,
        hasPrevious: false,
        perPage: 10,
        remainingCount: 1,
        total: 1,
        totalPages: 1,
        previousPage: 0,
    });
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(0);
    const postTrade = useCallback(async (action: "START" | "STOP", botId: number) => {
        try {
            setLoading(true)
            const response: AxiosResponse<any, any> = await axios.post(
                apiEndPoints.signal,
                {
                    action: action,
                    botId: botId,
                }
            );
            getLiveTrades();
            setLoading(false)
        } catch (error) {
            // Handle error
        }
    }, []);


    const getLiveTrades = useCallback(async () => {
        setLoading(true);
        try {
            const resposne: AxiosResponse<DataWithPagination<ILiveTrade[]>, any> = await axios.get(`${apiEndPoints.getLiveTrades}?page=${page}`);
            const {data, ...paginateData} = resposne.data;
            setLiveTrades(data);
            setPagination(paginateData as PaginationObj);
        } catch (error) {
            // Handle error
        } finally {
            setLoading(false);
        }
    }, [setLiveTrades, setPagination, page]);
    useEffect(() => {
        getLiveTrades();
    }, [])


    return (
        <WrapperBox>
            <WrapperBoxHeader
                title="Live Trade"
            />
            <WrapperBoxSection noPadding>
                {loading?(<Loader/>):(
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{minWidth: 180}}>BotName / Pair</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell>Strategy</TableCell>
                            <TableCell>Active Trade</TableCell>
                            {/*<TableCell>UNR. %Profit/Loss of Open Trade</TableCell>*/}
                            <TableCell></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {Array.isArray(liveTrades) && liveTrades.length ? (liveTrades.map((h, i) => (
                                <TableRow key={`${h.botName}_${h.botStrategy}_${i}`}>
                                    <TableCell>
                                        <Grid container
                                              spacing={1}
                                              alignItems={"center"}
                                              wrap="nowrap"
                                        >
                                            <Grid item xs={"auto"}>
                                                <PairLogo src={h.baseAssetLogo} alt={h.botName}/>
                                            </Grid>
                                            <Grid item xs={"auto"}>
                                                <TableDateTime date={h.botName}
                                                               time={`${h.baseAsset}_${h.qouteAsset}`}/>
                                            </Grid>
                                        </Grid>
                                    </TableCell>
                                    <TableCell>
                                        {h.public ? (
                                            <IndicatorBadge color={"success"}>Public</IndicatorBadge>
                                        ) : (
                                            <IndicatorBadge color={"secondary"}>Private</IndicatorBadge>
                                        )}
                                    </TableCell>
                                    <TableCell>
                                        <TableStrategy strategy={h.botStrategy}/>
                                    </TableCell>
                                    <TableCell>
                                        {h.activeTradeCount === 1 ? (
                                            <IndicatorBadge color={"success"}>Trading</IndicatorBadge>
                                        ) : (
                                            <IndicatorBadge color={"secondary"}>No Active Trade</IndicatorBadge>
                                        )}
                                    </TableCell>
                                    {/*<TableCell>*/}
                                    {/*    {h.pnl.indexOf("-") === -1 ? (*/}
                                    {/*        <TextBadge variation="success">*/}
                                    {/*            {h.pnl}*/}
                                    {/*            <IconArrowUp />*/}
                                    {/*        </TextBadge>*/}
                                    {/*    ) : (*/}
                                    {/*        <TextBadge variation="error">*/}
                                    {/*            {h.pnl}*/}
                                    {/*            <IconArrowDown />*/}
                                    {/*        </TextBadge>*/}
                                    {/*    )}*/}
                                    {/*</TableCell>*/}
                                    <TableCell>
                                        {h.activeTradeCount === 1 ? (
                                            <Grid>
                                                <Button
                                                    variant="contained"
                                                    color="inherit"
                                                    size="small"
                                                    sx={{mb: {xs: 2, lg: 0}}}
                                                    disabled={loading}
                                                    onClick={() => postTrade("STOP", h.botId)}>
                                                    <IconPause style={{width: 10, marginRight: 10}}/>
                                                    Cancel Trade
                                                </Button>
                                            </Grid>) : (
                                            <Grid>
                                                <Button
                                                    variant="contained"
                                                    color="primary"
                                                    size="small"
                                                    sx={{mb: {xs: 2, lg: 0}}}
                                                    disabled={loading}
                                                    onClick={() => postTrade("START", h.botId)}>
                                                    <IconPlay style={{width: 10, marginRight: 10}}/>
                                                    Open Trade
                                                </Button>
                                            </Grid>

                                        )}

                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={5}>There is no live-trade (bot) available</TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
                    )}
            </WrapperBoxSection>
            <WrapperBoxSection noPadding>
                <Pagination
                    currentPage={pagination.currentPage + 1}
                    totalPages={pagination.totalPages}
                    hasNext={pagination.hasNext}
                    hasPrevious={pagination.hasPrevious}
                    next={() => setPage(pagination.nextPage)}
                    previous={() => setPage(pagination.previousPage)}
                />
            </WrapperBoxSection>
        </WrapperBox>
    )
};
export default LiveTrade;
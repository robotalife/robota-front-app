import React, {useCallback, useEffect, useState} from "react";
import {Box, Grid, Typography} from "@mui/material";
import {IBot, ILiveTrade} from "../../shared/interfaces/bots";
import {DataWithPagination, PaginationObj} from "../../shared/interfaces/paginateData";
import {AxiosResponse} from "axios";
import apiEndPoints from "../../shared/consts/apiEndpoints";
import useAxios from "../../shared/hooks/useAxios";
import ComboBox from "../../components/formElements/ComboBox";
import {altDurations} from "../../shared/consts/durations";
import classes from "../../components/shared/BotCard/BotCard.module.scss";


const TradeTerminal = () => {
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
        // setLoading(true);
        try {
            const resposne: AxiosResponse<IBot[]> = await axios.get(`${apiEndPoints.getLiveTrades}?page=${page}`);

           console.log(resposne.data)

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
        <Box className={classes.botCard}>
            <Grid>
                <Grid>
                    <Typography>
                        {"Bots"}
                    </Typography>

                </Grid>
                <Grid>
                    <ComboBox
                        options={altDurations}
                        value={altDurations[0]}
                    ></ComboBox>
                </Grid>
            </Grid>
        </Box>
    )
};
export default TradeTerminal;
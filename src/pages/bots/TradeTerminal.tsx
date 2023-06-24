import React, { useCallback, useContext, useEffect, useState } from "react";
import { Alert, Box, Container, Grid, Typography } from "@mui/material";
import { IBot, ILiveTrade } from "../../shared/interfaces/bots";
import {
  DataWithPagination,
  PaginationObj,
} from "../../shared/interfaces/paginateData";
import { AxiosResponse } from "axios";
import apiEndPoints from "../../shared/consts/apiEndpoints";
import useAxios from "../../shared/hooks/useAxios";
import ComboBox, {
  AutocompleteOption,
} from "../../components/formElements/ComboBox";
import { altDurations } from "../../shared/consts/durations";
import classes from "../../components/shared/BotCard/BotCard.module.scss";
import { MyBotsContext } from "../../shared/providers/MyBotsProvider";
import Button from "../../components/formElements/Button";
import { useNavigate } from "react-router-dom";
import routes from "../../shared/consts/routes";
import TradingViewChart from "../../components/shared/TradingViewChart";
import { ChartData } from "chart.js";

const TradeTerminal = () => {
  const {
    botsList,
    setFilters,
    paginateData,
    loading: botsLoading,
    filters,
  } = useContext(MyBotsContext);
  const [selectedBot, setSelectedBot] = useState<AutocompleteOption | null>(
    null
  );
  const navigate = useNavigate();

  const botsCombo = botsList.map((bot) => ({
    label: bot.name,
    value: bot.id.toString(),
  })) as AutocompleteOption[];

  const { axios } = useAxios();
  const [liveTrades, setLiveTrades] = useState<ILiveTrade[]>(
    [] as ILiveTrade[]
  );
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
  const postTrade = useCallback(
    async (action: "START" | "STOP", botId: number) => {
      try {
        setLoading(true);
        const response: AxiosResponse<any, any> = await axios.post(
          apiEndPoints.signal,
          {
            action: action,
            botId: botId,
          }
        );
        getLiveTrades();
        setLoading(false);
      } catch (error) {
        // Handle error
      }
    },
    []
  );

  const getLiveTrades = useCallback(async () => {
    // setLoading(true);
    try {
      const resposne: AxiosResponse<IBot[]> = await axios.get(
        `${apiEndPoints.getLiveTrades}?page=${page}`
      );
    } catch (error) {
      // Handle error
    } finally {
      setLoading(false);
    }
  }, [setLiveTrades, setPagination, page]);

  const getSelectedBot = (botId: string) => {
    const bot = botsList.find((bot) => bot.id === Number(botId));
    return bot;
  };

  useEffect(() => {
    getLiveTrades();
  }, []);

  const candlestickData = [
    { time: "2018-12-22", open: 100, high: 150, low: 80, close: 120 },
    { time: "2018-12-23", open: 120, high: 180, low: 100, close: 150 },
    // Add more candlestick data objects as needed
  ];

  return (
    <Container maxWidth="xl" sx={{ m: 0, padding: "0!important" }}>
      <Grid container spacing={4}>
        <Grid item xs={12} lg>
          <Box className={classes.botCard}>
            <Typography variant="h6">
              {selectedBot === null
                ? "Select a bot to start trade"
                : getSelectedBot(selectedBot.value as string)?.name}
            </Typography>
            <TradingViewChart data={candlestickData} />
          </Box>
        </Grid>
        <Grid item xs={12} lg={3}>
          <Box className={classes.botCard}>
            <Typography variant="h6">Bots</Typography>
            <ComboBox
              placeholder="Select Bot to start trade"
              options={[...botsCombo]}
              onChange={(e, val) => {
                setSelectedBot(val);
              }}
              sx={{ width: "100%" }}
              id="botsList"
            />
            {selectedBot && (
              <>
                <Button
                  variant="outlined"
                  size="small"
                  fullWidth
                  onClick={() =>
                    navigate(`${routes.botOverview}/${selectedBot?.value}`)
                  }
                >
                  View bot overview
                </Button>
                <hr />
                <Alert severity="warning">
                  This bot already has an open trade.
                </Alert>
                <hr />
                <Button
                  color="error"
                  variant="contained"
                  size="small"
                  fullWidth
                >
                  Close trade at market price
                </Button>
                <Button
                  color="success"
                  variant="contained"
                  size="small"
                  fullWidth
                >
                  Open Position at Market Price
                </Button>
              </>
            )}
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};
export default TradeTerminal;

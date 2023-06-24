import { useCallback, useContext, useEffect, useState } from "react";
import { Alert, Container, Grid } from "@mui/material";
import { IBot, ILiveTrade } from "../../shared/interfaces/bots";
import { PaginationObj } from "../../shared/interfaces/paginateData";
import { AxiosResponse } from "axios";
import apiEndPoints from "../../shared/consts/apiEndpoints";
import useAxios from "../../shared/hooks/useAxios";
import ComboBox, {
  AutocompleteOption,
} from "../../components/formElements/ComboBox";
import { MyBotsContext } from "../../shared/providers/MyBotsProvider";
import Button from "../../components/formElements/Button";
import { useNavigate } from "react-router-dom";
import routes from "../../shared/consts/routes";
import TradingViewChart from "../../components/shared/TradingViewChart";
import WrapperBox from "../../components/shared/wrapperBox/WrapperBox";
import WrapperBoxSection from "../../components/shared/wrapperBox/WrapperBoxSection";
import WrapperBoxHeader from "../../components/shared/wrapperBox/WrapperBoxHeader";
import useEnhancedEffect from "@mui/utils/useEnhancedEffect";

const TradeTerminal = () => {
  const navigate = useNavigate();
  const { botsList } = useContext(MyBotsContext);
  const [selectedBot, setSelectedBot] = useState<AutocompleteOption | null>(
    null
  );
  const [liveData, setLiveData] = useState<any[]>([]);
  const [socket, setSocket] = useState<WebSocket | null>(null);

  useEffect(() => {
    if (socket) {
      setLiveData([]);
      socket.close();
    }
    if (!selectedBot) {
      return;
    }
    let newSocket = new WebSocket("wss://stream.binance.com:9443/ws");

    newSocket.onopen = () => {
      const tradingPair = getSelectedBot(
        selectedBot.value as string
      )?.tradingPair;
      newSocket.send(
        JSON.stringify({
          method: "SUBSCRIBE",
          params: [`${(tradingPair as string).toLowerCase()}@kline_1m`],
          id: 1,
        })
      );
    };

    newSocket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data?.e === "kline") {
        const candlestick = {
          time: data.E,
          open: parseFloat(data.k.o),
          high: parseFloat(data.k.h),
          low: parseFloat(data.k.l),
          close: parseFloat(data.k.c),
        };

        setLiveData((prevData) => [...prevData, candlestick]);
      }
    };

    setSocket(newSocket);

    return () => {
      newSocket.close();
    };
  }, [selectedBot]);

  const botsCombo = botsList.map((bot) => ({
    label: bot.name,
    value: bot.id.toString(),
  })) as AutocompleteOption[];

  const getSelectedBot = (botId: string) => {
    const bot = botsList.find((bot) => bot.id === Number(botId));
    return bot;
  };

  return (
    <Container maxWidth="xl" sx={{ m: 0, padding: "0!important" }}>
      <Grid container spacing={4}>
        <Grid item xs={12} lg={9}>
          <WrapperBox>
            <WrapperBoxHeader
              title={
                selectedBot === null
                  ? "Select a bot to start trade"
                  : `${getSelectedBot(selectedBot.value as string)?.name} - ${
                      getSelectedBot(selectedBot.value as string)?.tradingPair
                    } - ${
                      getSelectedBot(selectedBot.value as string)?.strategy
                    }`
              }
            />
            <WrapperBoxSection>
              {selectedBot && <TradingViewChart data={liveData} />}
            </WrapperBoxSection>
          </WrapperBox>
        </Grid>
        <Grid item xs={12} lg={3}>
          <WrapperBox>
            <WrapperBoxHeader title="Bots" noBorder />
            <WrapperBoxSection>
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
                    sx={{ mb: 3, mt: 3 }}
                  >
                    View bot overview
                  </Button>
                  <hr />
                  <Alert severity="warning" sx={{ mb: 3, mt: 3 }}>
                    This bot already has an open trade.
                  </Alert>
                  <hr />

                  {/* <Button
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
                  </Button> */}
                </>
              )}
            </WrapperBoxSection>
          </WrapperBox>
        </Grid>
      </Grid>
    </Container>
  );
};
export default TradeTerminal;

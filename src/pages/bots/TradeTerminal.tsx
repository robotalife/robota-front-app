import { useCallback, useContext, useEffect, useState } from "react";
import { Alert, Container, Grid } from "@mui/material";
import ComboBox, {
  AutocompleteOption,
} from "../../components/formElements/ComboBox";
import { MyBotsContext } from "../../shared/providers/MyBotsProvider";
import Button from "../../components/formElements/Button";
import { useNavigate } from "react-router-dom";
import routes from "../../shared/consts/routes";
import WrapperBox from "../../components/shared/wrapperBox/WrapperBox";
import WrapperBoxSection from "../../components/shared/wrapperBox/WrapperBoxSection";
import WrapperBoxHeader from "../../components/shared/wrapperBox/WrapperBoxHeader";
import TradingViewWidget from "../../components/shared/TradingViewWidget";
import classes from "./TradeTerminal.module.scss";
import apiEndPoints from "../../shared/consts/apiEndpoints";
import { AxiosResponse } from "axios";
import useAxios from "../../shared/hooks/useAxios";
import { IActiveTrade } from "../../shared/interfaces/bots";
import Loader from "../../components/shared/Loader";
import Table from "../../components/shared/table/Table";
import TableHead from "../../components/shared/table/TableHead";
import TableRow from "../../components/shared/table/TableRow";
import TableCell from "../../components/shared/table/TableCell";
import TableBody from "../../components/shared/table/TableBody";
import PairLogo from "../../components/shared/PairLogo";
import TableDateTime from "../../components/shared/table/TableDateCell";
import TableStrategy from "../../components/shared/table/StrategyBadge";
import getDateTime from "../../shared/helpers/getDateTimeObj";
import TextBadge from "../../components/shared/TextBadge";
import {
  IconArrowDown,
  IconArrowUp,
  IconClock,
} from "../../shared/icons/Icons";
import TableTradePrice from "../../components/shared/table/TableTradePrice";
import useNotify from "../../shared/hooks/useNotify";

const TradeTerminal = () => {
  const notify = useNotify();

  const navigate = useNavigate();
  const { botsList } = useContext(MyBotsContext);
  const [selectedBot, setSelectedBot] = useState<AutocompleteOption | null>(
    null
  );
  const [widgetSymbol, setWidgetSymbol] = useState<string>("BINANCE:BTCUSDT.P");
  const [loading, setLoading] = useState(false);
  const [activeTrade, setActiveTrade] = useState<IActiveTrade | undefined>();
  const { axios } = useAxios();

  useEffect(() => {}, [selectedBot, activeTrade]);

  const onBotChange = (bot: AutocompleteOption | null) => {
    setLoading(true);
    const botted = findBotByBotId(bot?.value as string);
    setWidgetSymbol(`BINANCE:${botted?.tradingPair}.P`);
    getActiveTrade(bot?.value);
    setSelectedBot(bot);
  };

  const getActiveTrade = useCallback(
    async (botId: string | undefined | null) => {
      try {
        const response: AxiosResponse<IActiveTrade, any> = await axios.get(
          apiEndPoints.getBotActiveTrade(botId as string)
        );
        const trade = response.data || undefined;
        setActiveTrade(trade);
      } catch (error) {
        // Handle error
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const botsCombo = botsList.map((bot) => ({
    label: bot.name,
    value: bot.id.toString(),
  })) as AutocompleteOption[];

  const findBotByBotId = (botId: string) => {
    return botsList.find((bot) => bot.id === Number(botId));
  };

  const openPosition = () => {
    signal("START");
  };

  const closePosition = () => {
    signal("STOP");
  };

  const signal = useCallback(
    async (action: "START" | "STOP") => {
      setLoading(true);

      try {
        await axios.post(apiEndPoints.signal, {
          action: action,
          botId: selectedBot?.value,
        });

        getActiveTrade(selectedBot?.value);
        notify(`Trade ${action}`, "info");
      } catch (error) {
        // Handle error
      }
    },
    [selectedBot]
  );

  return (
    <Container maxWidth="xl" sx={{ m: 0, padding: "0!important" }}>
      <Grid container spacing={4} sx={{ mb: 3 }}>
        <Grid item xs={12} lg={9}>
          <WrapperBox>
            <WrapperBoxHeader
              title={
                selectedBot === null
                  ? "Select a bot to start trade"
                  : `${findBotByBotId(selectedBot.value as string)?.name} - ${
                      findBotByBotId(selectedBot.value as string)?.tradingPair
                    } - ${
                      findBotByBotId(selectedBot.value as string)?.strategy
                    }`
              }
            />
            <WrapperBoxSection>
              <TradingViewWidget symbol={widgetSymbol}></TradingViewWidget>
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
                  onBotChange(val);
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
                  <hr className={classes.lineBreak} />
                  {activeTrade ? (
                    <>
                      <Alert severity="info" sx={{ mb: 3, mt: 3 }}>
                        This bot already has an open trade.
                      </Alert>
                      <Button
                        color={"error"}
                        variant={"contained"}
                        size={"small"}
                        fullWidth
                        onClick={closePosition}
                        disabled={loading}
                      >
                        Close trade at market price
                      </Button>
                    </>
                  ) : (
                    <>
                      <Alert severity="success" sx={{ mb: 3, mt: 3 }}>
                        This bot has no open trades.
                      </Alert>
                      <Button
                        color={"success"}
                        variant={"contained"}
                        size={"small"}
                        fullWidth
                        onClick={openPosition}
                        disabled={loading}
                      >
                        Open Position at Market Price
                      </Button>
                    </>
                  )}
                </>
              )}
            </WrapperBoxSection>
          </WrapperBox>
        </Grid>
      </Grid>
      <WrapperBox>
        <WrapperBoxHeader
          title={
            selectedBot === null
              ? "Select a bot to start trade"
              : "Active Trade"
          }
        />
        {loading ? (
          <Loader />
        ) : (
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ minWidth: 180 }}>Pair / Bot</TableCell>
                <TableCell>Strategy</TableCell>
                <TableCell>Creation Date</TableCell>
                <TableCell>Duration</TableCell>
                <TableCell>Entry Price / Current Price</TableCell>
                <TableCell>% Unl Profit/Loss </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {activeTrade ? (
                <TableRow>
                  <TableCell>
                    <Grid container spacing={1} alignItems={"center"}>
                      <Grid item>
                        <PairLogo
                          src={activeTrade.logo}
                          alt={activeTrade.pair}
                        />
                      </Grid>
                      <Grid item>
                        <TableDateTime
                          date={activeTrade.pair}
                          time={activeTrade.botName}
                        />
                      </Grid>
                    </Grid>
                  </TableCell>
                  <TableCell>
                    <TableStrategy strategy={activeTrade.strategy} />
                  </TableCell>
                  <TableCell>
                    <TableDateTime {...getDateTime(activeTrade.creationDate)} />
                  </TableCell>
                  <TableCell>
                    <TextBadge variation="primary">
                      <IconClock />
                      {activeTrade.duration}
                    </TextBadge>
                  </TableCell>
                  <TableCell>
                    <TableTradePrice
                      entryPrice={activeTrade.entryPrice}
                      exitPrice={activeTrade.currentPrice}
                    />
                  </TableCell>
                  <TableCell>
                    {activeTrade.profit.indexOf("-") === -1 ? (
                      <TextBadge variation="success">
                        {activeTrade.profit}
                        <IconArrowUp />
                      </TextBadge>
                    ) : (
                      <TextBadge variation="error">
                        {activeTrade.profit}
                        <IconArrowDown />
                      </TextBadge>
                    )}
                  </TableCell>
                </TableRow>
              ) : (
                <TableRow>
                  <TableCell colSpan={6}>There is no active trade.</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        )}
      </WrapperBox>
    </Container>
  );
};
export default TradeTerminal;

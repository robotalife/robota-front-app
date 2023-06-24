import {useCallback, useEffect, useState} from "react";
import WrapperBox from "../../components/shared/wrapperBox/WrapperBox";
import WrapperBoxHeader from "../../components/shared/wrapperBox/WrapperBoxHeader";
import {useParams} from "react-router-dom";
import useAxios from "../../shared/hooks/useAxios";
import {AxiosResponse} from "axios";
import apiEndPoints from "../../shared/consts/apiEndpoints";
import WrapperBoxSection from "../../components/shared/wrapperBox/WrapperBoxSection";
import Table from "../../components/shared/table/Table";
import TableHead from "../../components/shared/table/TableHead";
import TableRow from "../../components/shared/table/TableRow";
import TableCell from "../../components/shared/table/TableCell";
import TableBody from "../../components/shared/table/TableBody";
import TableDateTime from "../../components/shared/table/TableDateCell";
import TableTradePrice from "../../components/shared/table/TableTradePrice";
import getDateTime from "../../shared/helpers/getDateTimeObj";
import {IActiveTrade} from "../../shared/interfaces/bots";
import Loader from "../../components/shared/Loader";
import {Grid, IconButton, Typography} from "@mui/material";
import PairLogo from "../../components/shared/PairLogo";
import TextBadge from "../../components/shared/TextBadge";

import {IconArrowDown, IconArrowUp, IconClock, IconCloseCircle,} from "../../shared/icons/Icons";
import useNotify from "../../shared/hooks/useNotify";
import TableStrategy from "../../components/shared/table/StrategyBadge";

const BotActiveTrade = () => {
  const notify = useNotify();
  const { botId } = useParams();
  const { axios } = useAxios();
  const [activeTrade, setActiveTrade] = useState<IActiveTrade | undefined>();
  const [loading, setLoading] = useState(true);

  const getActiveTrade = useCallback(async () => {
    setLoading(true);

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
  }, []);

  const signal = useCallback(async (action: "START" | "STOP") => {
    try {
      const response: AxiosResponse<any, any> = await axios.post(
        apiEndPoints.signal,
        {
          action: action,
          botId: botId,
        }
      );

      getActiveTrade();
      notify(`Trade ${action}`, "info");
    } catch (error) {
      // Handle error
    }
  }, []);

  useEffect(() => {
    getActiveTrade();
  }, []);

  return (
    <WrapperBox>
      <WrapperBoxHeader
        title="Active Trade"
        description="Monitor active trades for this bot"
      />
      <WrapperBoxSection noPadding>
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
                <TableCell>Action</TableCell>
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
                    <TableTradePrice entryPrice={activeTrade.entryPrice} exitPrice={activeTrade.currentPrice}/>
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
                  <TableCell>
                    <IconButton onClick={() => signal("STOP")}>
                      <IconCloseCircle />
                    </IconButton>
                    <Typography component={"span"}>Cancel Trade</Typography>
                  </TableCell>
                </TableRow>
              ) : (
                <TableRow>
                  <TableCell colSpan={6}>
                    There is no active trade.
                    {/* There is no active trade, start it now{" "}*/}
                    {/*<button onClick={() => signal("START")}>start</button>*/}
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        )}
      </WrapperBoxSection>
    </WrapperBox>
  );
};

export default BotActiveTrade;

import { useCallback, useEffect, useState } from "react";
import WrapperBox from "../../components/shared/wrapperBox/WrapperBox";
import WrapperBoxHeader from "../../components/shared/wrapperBox/WrapperBoxHeader";
import { useLocation, useParams } from "react-router-dom";
import useAxios from "../../shared/hooks/useAxios";
import { AxiosResponse } from "axios";
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
import { IActiveTrade } from "../../shared/interfaces/bots";
import Loader from "../../components/shared/Loader";
import { Grid, IconButton, Typography } from "@mui/material";
import PairLogo from "../../components/shared/PairLogo";
import TextBadge from "../../components/shared/TextBadge";

import {
  IconArrowDown,
  IconArrowUp,
  IconClock,
  IconCloseCircle,
  IconHelpCircle,
} from "../../shared/icons/Icons";
import useNotify from "../../shared/hooks/useNotify";
import TableStrategy from "../../components/shared/table/StrategyBadge";
import routes from "../../shared/consts/routes";

const BotActiveTrade = () => {
  const { pathname } = useLocation();
  const isMyBot = pathname.includes(routes.botActiveTrades);
  const notify = useNotify();
  const { botId } = useParams();
  const { axios } = useAxios();
  const [activeTrades, setActiveTrades] = useState<
    IActiveTrade[] | undefined
  >();
  const [loading, setLoading] = useState(true);

  const getActiveTrades = useCallback(async () => {
    setLoading(true);

    try {
      const response: AxiosResponse<IActiveTrade[], any> = await axios.get(
        apiEndPoints.getBotActiveTrades(botId as string)
      );
      const trades = response.data || undefined;
      setActiveTrades(trades);
    } catch (error) {
      // Handle error
    } finally {
      setLoading(false);
    }
  }, []);

  const closeTrade = useCallback(
    async (tradeId: string) => {
      setLoading(true);
      try {
        console.log(tradeId, "tradeId to close");
        await axios.delete(apiEndPoints.closeTrade(tradeId));
        notify("Trade closed successfully", "success");
        getActiveTrades();
      } catch (e) {
      } finally {
        setLoading(false);
      }
    },
    [activeTrades]
  );

  useEffect(() => {
    getActiveTrades();
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
                {isMyBot && <TableCell>Entry Price / Current Price</TableCell>}
                <TableCell>
                  % Unl Profit/Loss <IconHelpCircle />
                </TableCell>
                {isMyBot && <TableCell>Action</TableCell>}
              </TableRow>
            </TableHead>
            <TableBody>
              {Array.isArray(activeTrades) && activeTrades.length ? (
                activeTrades.map((h, i) => (
                  <TableRow key={`${h.id}_${i}`}>
                    <TableCell>
                      <Grid container spacing={1} alignItems={"center"}>
                        <Grid item>
                          <PairLogo src={h.logo} alt={h.pair} />
                        </Grid>
                        <Grid item>
                          <TableDateTime date={h.pair} time={h.botName} />
                        </Grid>
                      </Grid>
                    </TableCell>
                    <TableCell>
                      <TableStrategy strategy={h.strategy} />
                    </TableCell>
                    <TableCell>
                      <TableDateTime {...getDateTime(h.creationDate)} />
                    </TableCell>
                    <TableCell>
                      <TextBadge variation="primary">
                        <IconClock />
                        {h.duration}
                      </TextBadge>
                    </TableCell>
                    {isMyBot && (
                      <TableCell>
                        <TableTradePrice
                          entryPrice={h.entryPrice}
                          exitPrice={h.currentPrice}
                        />
                      </TableCell>
                    )}
                    <TableCell>
                      {h.profit.indexOf("-") === -1 ? (
                        <TextBadge variation="success">
                          {h.profit}
                          <IconArrowUp />
                        </TextBadge>
                      ) : (
                        <TextBadge variation="error">
                          {h.profit}
                          <IconArrowDown />
                        </TextBadge>
                      )}
                    </TableCell>
                    {isMyBot && (
                      <TableCell>
                        <IconButton onClick={() => closeTrade(h.id)}>
                          <IconCloseCircle />
                        </IconButton>
                        <Typography component={"span"}>Close trade</Typography>
                      </TableCell>
                    )}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6}>There is no active trade.</TableCell>
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

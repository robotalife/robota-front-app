import { useCallback, useEffect, useState } from "react";
import WrapperBox from "../../components/shared/wrapperBox/WrapperBox";
import WrapperBoxHeader from "../../components/shared/wrapperBox/WrapperBoxHeader";
import { useParams } from "react-router-dom";
import useAxios from "../../shared/hooks/useAxios";
import { AxiosResponse } from "axios";
import apiEndPoints from "../../shared/consts/apiEndpoints";
import { useSnackbar } from "notistack";
import WrapperBoxSection from "../../components/shared/wrapperBox/WrapperBoxSection";
import Table from "../../components/shared/table/Table";
import TableHead from "../../components/shared/table/TableHead";
import TableRow from "../../components/shared/table/TableRow";
import TableCell from "../../components/shared/table/TableCell";
import TableBody from "../../components/shared/table/TableBody";
import TableDateTime from "../../components/shared/table/TableDateCell";
import getDateTime from "../../shared/helpers/getDateTimeObj";
import { IActiveTrade } from "../../shared/interfaces/bots";
import Loader from "../../components/shared/Loader";
import { Grid, IconButton, Typography } from "@mui/material";
import PairLogo from "../../components/shared/PairLogo";
import TextBadge from "../../components/shared/TextBadge";
import {
  IconArrowDownRight,
  IconArrowUpRight,
  IconClock,
  IconCloseCircle,
} from "../../shared/icons/Icons";

const BotActiveTrade = () => {
  const { enqueueSnackbar } = useSnackbar();
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
      enqueueSnackbar(`Trade ${action}`, {
        variant: "info",
        preventDuplicate: true,
      });
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
                <TableCell>Startegy</TableCell>
                <TableCell>Creation Date</TableCell>
                <TableCell>Duration</TableCell>
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
                    <TextBadge variation="secondary">
                      {activeTrade.strategy === "LONG" ? (
                        <>
                          Long{" "}
                          <IconArrowUpRight
                            style={{ marginLeft: 8, height: 5, width: 5 }}
                          />
                        </>
                      ) : (
                        <>
                          Short{" "}
                          <IconArrowDownRight
                            style={{ marginLeft: 8, height: 5, width: 5 }}
                          />
                        </>
                      )}
                    </TextBadge>
                  </TableCell>
                  <TableCell>
                    <TableDateTime {...getDateTime(activeTrade.creationDate)} />
                  </TableCell>
                  <TableCell>
                    <TextBadge>
                      <IconClock />
                      {activeTrade.duration}
                    </TextBadge>
                  </TableCell>
                  <TableCell>{activeTrade.profit}</TableCell>
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
                    There is no active trade, start it now{" "}
                    <button onClick={() => signal("START")}>start</button>
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

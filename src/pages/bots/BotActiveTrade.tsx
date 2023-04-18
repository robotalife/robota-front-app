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

interface IActiveTrade {
  botName: string;
  creationDate: string;
  duration: string;
  logo: string;
  pair: string;
  profit: string;
  strategy: "SHORT" | "LONG";
}

const BotActiveTrade = () => {
  const { enqueueSnackbar } = useSnackbar();
  const { botId } = useParams();
  const { axios } = useAxios();
  const [activeTrade, setActiveTrade] = useState<IActiveTrade | undefined>();

  const getActiveTrade = useCallback(async () => {
    try {
      const response: AxiosResponse<IActiveTrade, any> = await axios.get(
        apiEndPoints.getBotActiveTrade(botId as string)
      );

      const trade = response.data || undefined;
      setActiveTrade(trade);
    } catch (error) {
      // Handle error
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
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Pair / Bot</TableCell>
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
                  <TableDateTime
                    date={activeTrade.pair}
                    time={activeTrade.botName}
                  />
                </TableCell>
                <TableCell>{activeTrade.strategy}</TableCell>
                <TableCell>
                  <TableDateTime {...getDateTime(activeTrade.creationDate)} />
                </TableCell>
                <TableCell>{activeTrade.duration}</TableCell>
                <TableCell>{activeTrade.profit}</TableCell>
                <TableCell>
                  <button onClick={() => signal("START")}>start</button>
                  <button onClick={() => signal("STOP")}>stop</button>
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
      </WrapperBoxSection>
    </WrapperBox>
  );
};

export default BotActiveTrade;

import { useParams } from "react-router-dom";
import WrapperBox from "../../components/shared/wrapperBox/WrapperBox";
import WrapperBoxHeader from "../../components/shared/wrapperBox/WrapperBoxHeader";
import useAxios from "../../shared/hooks/useAxios";
import { useCallback, useEffect, useState } from "react";
import { AxiosResponse } from "axios";
import apiEndPoints from "../../shared/consts/apiEndpoints";
import WrapperBoxSection from "../../components/shared/wrapperBox/WrapperBoxSection";
import Table from "../../components/shared/table/Table";
import TableHead from "../../components/shared/table/TableHead";
import TableRow from "../../components/shared/table/TableRow";
import TableCell from "../../components/shared/table/TableCell";
import TableBody from "../../components/shared/table/TableBody";
import TableDateTime from "../../components/shared/table/TableDateCell";
import getDateTime from "../../shared/helpers/getDateTimeObj";
import { PaginateData } from "../../shared/interfaces/paginateData";
import { IBotHistoryObj } from "../../shared/interfaces/bots";

const BotTradeHistory = () => {
  const { botId } = useParams();
  const { axios } = useAxios();
  const [history, setHistory] = useState<IBotHistoryObj[]>(
    [] as IBotHistoryObj[]
  );

  const getTokenData = useCallback(async () => {
    try {
      const response: AxiosResponse<
        PaginateData<IBotHistoryObj[]>,
        any
      > = await axios.get(apiEndPoints.getBotHistory(botId as string));

      const data = response.data;
      setHistory(data.data);
    } catch (error) {
      // Handle error
    }
  }, [setHistory]);

  useEffect(() => {
    getTokenData();
  }, [getTokenData]);

  return (
    <WrapperBox>
      <WrapperBoxHeader
        title="Trade History"
        description="Auto Update in 10 Minutes."
      />
      <WrapperBoxSection noPadding>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Pair / Bot</TableCell>
              <TableCell>Creation Date</TableCell>
              <TableCell>End Date</TableCell>
              <TableCell>Duration</TableCell>
              <TableCell>$ Net Profit/Loss </TableCell>
              {/* <TableCell>% Profit/Loss </TableCell>
              <TableCell>Volume</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Exchange</TableCell> */}
            </TableRow>
          </TableHead>
          <TableBody>
            {Array.isArray(history) && history.length ? (
              history.map((h, i) => (
                <TableRow key={`${h.botName}_${h.creationDate}_${i}`}>
                  <TableCell>
                    <TableDateTime date={h.pair} time={h.botName} />
                  </TableCell>
                  <TableCell>
                    <TableDateTime {...getDateTime(h.creationDate)} />
                  </TableCell>
                  <TableCell>
                    <TableDateTime {...getDateTime(h.closeDate)} />
                  </TableCell>
                  <TableCell>{h.Duration}</TableCell>
                  <TableCell>{h.profit}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5}>There is no logs available</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </WrapperBoxSection>
    </WrapperBox>
  );
};

export default BotTradeHistory;

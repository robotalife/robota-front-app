import Table from "../../components/shared/table/Table";
import TableBody from "../../components/shared/table/TableBody";
import TableCell from "../../components/shared/table/TableCell";
import TableHead from "../../components/shared/table/TableHead";
import TableRow from "../../components/shared/table/TableRow";
import WrapperBox from "../../components/shared/wrapperBox/WrapperBox";
import WrapperBoxHeader from "../../components/shared/wrapperBox/WrapperBoxHeader";
import WrapperBoxSection from "../../components/shared/wrapperBox/WrapperBoxSection";
import TableDateTime from "../../components/shared/table/TableDateCell";
import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useAxios from "../../shared/hooks/useAxios";
import { AxiosResponse } from "axios";
import apiEndPoints from "../../shared/consts/apiEndpoints";
import getDateTime from "../../shared/helpers/getDateTimeObj";
import { PaginateData } from "../../shared/interfaces/paginateData";
import { IEventLog } from "../../shared/interfaces/bots";
import Loader from "../../components/shared/Loader";

const BotEventLog = () => {
  const { botId } = useParams();
  const { axios } = useAxios();
  const [logs, setLogs] = useState<IEventLog[]>([] as IEventLog[]);
  const [loading, setLoading] = useState(true);

  const getTokenData = useCallback(async () => {
    setLoading(true);

    try {
      const response: AxiosResponse<
        PaginateData<IEventLog[]>,
        any
      > = await axios.get(apiEndPoints.getBotLog(botId as string));

      const log = response.data;
      setLogs(log.data);
    } catch (error) {
      // Handle error
    } finally {
      setLoading(false);
    }
  }, [setLogs]);

  useEffect(() => {
    getTokenData();
  }, [getTokenData]);

  return (
    <WrapperBox>
      <WrapperBoxHeader
        title="Event Log"
        description="Auto Update in 10 Minutes."
      />
      <WrapperBoxSection noPadding>
        {loading ? (
          <Loader />
        ) : (
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Creation Date</TableCell>
                <TableCell>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {Array.isArray(logs) && logs.length ? (
                logs.map((log) => (
                  <TableRow key={`${log.botId}_${log.id}_${log.createdAt}`}>
                    <TableCell>
                      <TableDateTime {...getDateTime(log.createdAt)} />
                    </TableCell>
                    <TableCell>{log.message}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={2}>There is no logs available</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        )}
      </WrapperBoxSection>
    </WrapperBox>
  );
};

export default BotEventLog;

import { Typography } from "@mui/material";
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

interface IEventLog {
  id: number;
  botId: number;
  logtype: string;
  createdAt: string;
  message: string;
}

const tableData = [
  {
    date: "22 Jan 2022",
    time: "12:42 AM",
    status:
      "Placing sell at Market Price trade. Price: market Size: ≈1009.196 USDT (3214.0 ADAUSDT)",
  },
  {
    date: "22 Jan 2022",
    time: "12:42 AM",
    status:
      "Placing sell at Market Price trade. Price: market Size: ≈1009.196 USDT (3214.0 ADAUSDT)",
  },
  {
    date: "22 Jan 2022",
    time: "12:42 AM",
    status:
      "Placing sell at Market Price trade. Price: market Size: ≈1009.196 USDT (3214.0 ADAUSDT)",
  },
  {
    date: "22 Jan 2022",
    time: "12:42 AM",
    status:
      "Placing sell at Market Price trade. Price: market Size: ≈1009.196 USDT (3214.0 ADAUSDT)",
  },
  {
    date: "22 Jan 2022",
    time: "12:42 AM",
    status:
      "Placing sell at Market Price trade. Price: market Size: ≈1009.196 USDT (3214.0 ADAUSDT)",
  },
  {
    date: "22 Jan 2022",
    time: "12:42 AM",
    status:
      "Placing sell at Market Price trade. Price: market Size: ≈1009.196 USDT (3214.0 ADAUSDT)",
  },
  {
    date: "22 Jan 2022",
    time: "12:42 AM",
    status:
      "Placing sell at Market Price trade. Price: market Size: ≈1009.196 USDT (3214.0 ADAUSDT)",
  },
  {
    date: "22 Jan 2022",
    time: "12:42 AM",
    status:
      "Placing sell at Market Price trade. Price: market Size: ≈1009.196 USDT (3214.0 ADAUSDT)",
  },
];

const BotEventLog = () => {
  const { botId } = useParams();
  const { axios } = useAxios();
  const [logs, setLogs] = useState<IEventLog[]>([] as IEventLog[]);

  const getTokenData = useCallback(async () => {
    try {
      const response: AxiosResponse<IEventLog[], any> = await axios.get(
        apiEndPoints.getBotLog(botId as string)
      );

      const log = response.data;
      setLogs(log);
    } catch (error) {
      // Handle error
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
      </WrapperBoxSection>
    </WrapperBox>
  );
};

export default BotEventLog;

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
  const [tokens, setTokens] = useState("");

  const getTokenData = useCallback(async () => {
    try {
      const response: AxiosResponse<any, any> = await axios.get(
        apiEndPoints.getBotLog(botId as string)
      );

      const data = response.data;
      setTokens(data);
    } catch (error) {
      // Handle error
    }
  }, [setTokens]);

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
            {tableData.map((row, i) => (
              <TableRow key={`${row.date}_${row.time}_${i}`}>
                <TableCell>
                  <TableDateTime time={row.time} date={row.date} />
                </TableCell>
                <TableCell>{row.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </WrapperBoxSection>
    </WrapperBox>
  );
};

export default BotEventLog;

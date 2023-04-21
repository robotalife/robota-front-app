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
import Loader from "../../components/shared/Loader";
import TextBadge from "../../components/shared/TextBadge";
import {
  IconArrowUp,
  IconClock,
  IconExport,
  IconFilter,
} from "../../shared/icons/Icons";
import { Grid, Typography } from "@mui/material";
import PairLogo from "../../components/shared/PairLogo";
import Filters from "../../components/shared/Filters";
import Pagination from "../../components/shared/Pagination";
import Button from "../../components/formElements/Button";

const BotTradeHistory = () => {
  const { botId } = useParams();
  const { axios } = useAxios();
  const [history, setHistory] = useState<IBotHistoryObj[]>(
    [] as IBotHistoryObj[]
  );
  const [loading, setLoading] = useState(true);

  const getHistory = useCallback(async () => {
    setLoading(true);
    try {
      const response: AxiosResponse<
        PaginateData<IBotHistoryObj[]>,
        any
      > = await axios.get(apiEndPoints.getBotHistory(botId as string));

      const data = response.data;
      setHistory(data.data);
    } catch (error) {
      // Handle error
    } finally {
      setLoading(false);
    }
  }, [setHistory]);

  useEffect(() => {
    getHistory();
  }, [getHistory]);

  const HeaderActions = (
    <Grid container spacing={1}>
      <Grid item>
        <Button disabled variant="outlined" color="primary">
          <IconFilter style={{ marginRight: 8 }} />
          Filter
        </Button>
      </Grid>
      <Grid item>
        <Button disabled variant="outlined" color="primary">
          <IconExport style={{ marginRight: 8 }} />
          Export
        </Button>
      </Grid>
    </Grid>
  );

  return (
    <WrapperBox>
      <WrapperBoxHeader
        title="Trade History"
        description="Auto Update in 10 Minutes."
        actions={HeaderActions}
      />
      <WrapperBoxSection>
        <Filters />
      </WrapperBoxSection>
      <WrapperBoxSection noPadding>
        {loading ? (
          <Loader />
        ) : (
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Pair / Bot</TableCell>
                <TableCell>Creation Date</TableCell>
                <TableCell>End Date</TableCell>
                <TableCell>Duration</TableCell>
                <TableCell>$ Net Profit/Loss </TableCell>
                <TableCell>% Profit/Loss </TableCell>
                <TableCell>Volume</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Exchange</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {Array.isArray(history) && history.length ? (
                history.map((h, i) => (
                  <TableRow key={`${h.botName}_${h.creationDate}_${i}`}>
                    <TableCell>
                      <Grid container spacing={1} alignItems={"center"}>
                        <Grid item xs={"auto"}>
                          <PairLogo src={h.quoteLogo} alt={h.pair} />
                        </Grid>
                        <Grid item xs={"auto"}>
                          <TableDateTime date={h.pair} time={h.botName} />
                        </Grid>
                      </Grid>
                    </TableCell>
                    <TableCell>
                      <TableDateTime {...getDateTime(h.creationDate)} />
                    </TableCell>
                    <TableCell>
                      <TableDateTime {...getDateTime(h.closeDate)} />
                    </TableCell>
                    <TableCell>
                      <TextBadge variation="primary">
                        <IconClock />
                        {h.duration}
                      </TextBadge>
                    </TableCell>
                    <TableCell>
                      {h.netProfit && (
                        <TextBadge variation="success">
                          {h.netProfit}
                          <IconArrowUp />
                        </TextBadge>
                      )}
                    </TableCell>
                    <TableCell>{/* Profit / loss */}</TableCell>
                    <TableCell>
                      <Typography component={"div"}>{h.baseVolume}</Typography>
                      <Typography component={"div"}>{h.quoteVolume}</Typography>
                    </TableCell>
                    <TableCell>
                      {h.status && (
                        <TextBadge variation="success">
                          <IconClock />
                          {h.status}
                        </TextBadge>
                      )}
                    </TableCell>
                    <TableCell>
                      <TableDateTime date={h.exchangeType} time={h.strategy} />
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5}>There is no logs available</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        )}
      </WrapperBoxSection>
      <WrapperBoxSection noPadding>
        <Pagination />
      </WrapperBoxSection>
    </WrapperBox>
  );
};

export default BotTradeHistory;

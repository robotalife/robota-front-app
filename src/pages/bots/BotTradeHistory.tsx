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
import {
  DataWithPagination,
  PaginationObj,
} from "../../shared/interfaces/paginateData";
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
import Button from "../../components/formElements/Button";
import Pagination from "../../components/shared/Pagination";

const BotTradeHistory = () => {
  const { botId } = useParams();
  const { axios } = useAxios();
  const [history, setHistory] = useState<IBotHistoryObj[]>(
    [] as IBotHistoryObj[]
  );
  const [pagination, setPagination] = useState<PaginationObj>({
    currentPage: 0,
    hasNext: false,
    nextPage: 1,
    hasPrevious: false,
    perPage: 10,
    remainingCount: 1,
    total: 1,
    totalPages: 1,
    previousPage: 0,
  });
  const [loading, setLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(true);

  const getHistory = useCallback(
    async (page: number = 0) => {
      setLoading(true);
      try {
        const response: AxiosResponse<
          DataWithPagination<IBotHistoryObj[]>,
          any
        > = await axios.get(
          `${apiEndPoints.getBotHistory(botId as string)}?page=${page}`
        );

        const { data, ...paginateData } = response.data;
        setHistory(data);
        setPagination(paginateData as PaginationObj);
      } catch (error) {
        // Handle error
      } finally {
        setLoading(false);
      }
    },
    [setHistory, setPagination]
  );

  const getExport = useCallback(async () => {
    try {
      const response: AxiosResponse<any, any> = await axios.get(
        apiEndPoints.getBotTradesFile(botId as string)
      );
    } catch (error) {
      // Handle error
    } finally {
      setLoading(false);
    }
  }, [setHistory, setPagination]);

  const getNext = () => {
    if (!pagination.hasNext) return undefined;
    getHistory(pagination.nextPage);
  };

  const getPrevious = () => {
    if (!pagination.hasPrevious) return undefined;
    getHistory(pagination.previousPage);
  };

  const HeaderActions = (
    <Grid container spacing={1}>
      <Grid item xs={12} md>
        <Button
          variant="outlined"
          color="primary"
          onClick={() => {
            setShowFilters(!showFilters);
          }}
          fullWidth
        >
          <IconFilter style={{ marginRight: 8 }} />
          Filter
        </Button>
      </Grid>
      <Grid item xs={12} md>
        <Button
          variant="outlined"
          color="primary"
          fullWidth
          onClick={getExport}
        >
          <IconExport style={{ marginRight: 8 }} />
          Export
        </Button>
      </Grid>
    </Grid>
  );

  useEffect(() => {
    getHistory();
  }, [getHistory]);

  return (
    <WrapperBox>
      <WrapperBoxHeader
        title="Trade History"
        description="Auto Update in 10 Minutes."
        actions={HeaderActions}
      />
      {showFilters && (
        <WrapperBoxSection>
          <Filters />
        </WrapperBoxSection>
      )}
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
                      <Grid container spacing={1} alignItems={"center"}>
                        <Grid item xs={"auto"}>
                          <PairLogo
                            src={h.baseLogo}
                            alt={h.baseVolume}
                            style={{ marginBottom: 8 }}
                          />
                          <PairLogo src={h.quoteLogo} alt={h.quoteVolume} />
                        </Grid>
                        <Grid item xs={"auto"}>
                          <Typography component={"div"} sx={{ mb: 1 }}>
                            {h.baseVolume}
                          </Typography>
                          <Typography component={"div"}>
                            {h.quoteVolume}
                          </Typography>
                        </Grid>
                      </Grid>
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
        <Pagination
          currentPage={pagination.currentPage + 1}
          totalPages={pagination.totalPages}
          hasNext={pagination.hasNext}
          hasPrevious={pagination.hasPrevious}
          next={getNext}
          previous={getPrevious}
        />
      </WrapperBoxSection>
    </WrapperBox>
  );
};

export default BotTradeHistory;

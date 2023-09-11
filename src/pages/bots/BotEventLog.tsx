import Table from '../../components/shared/table/Table';
import TableBody from '../../components/shared/table/TableBody';
import TableCell from '../../components/shared/table/TableCell';
import TableHead from '../../components/shared/table/TableHead';
import TableRow from '../../components/shared/table/TableRow';
import WrapperBox from '../../components/shared/wrapperBox/WrapperBox';
import WrapperBoxHeader from '../../components/shared/wrapperBox/WrapperBoxHeader';
import WrapperBoxSection from '../../components/shared/wrapperBox/WrapperBoxSection';
import TableDateTime from '../../components/shared/table/TableDateCell';
import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useAxios from '../../shared/hooks/useAxios';
import { AxiosResponse } from 'axios';
import apiEndPoints from '../../shared/consts/apiEndpoints';
import getDateTime from '../../shared/helpers/getDateTimeObj';
import { DataWithPagination, PaginationObj } from '../../shared/interfaces/paginateData';
import { IEventLog } from '../../shared/interfaces/bots';
import Loader from '../../components/shared/Loader';
import TextBadge from '../../components/shared/TextBadge';
import { IconCircleCheck } from '../../shared/icons/Icons';
import Pagination from '../../components/shared/Pagination';

const BotEventLog = () => {
  const { botId } = useParams();
  const { axios } = useAxios();
  const [logs, setLogs] = useState<IEventLog[]>([] as IEventLog[]);
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

  const getLogData = useCallback(
    async (page: number = 0) => {
      setLoading(true);

      try {
        const response: AxiosResponse<DataWithPagination<IEventLog[]>, any> = await axios.get(
          `${apiEndPoints.getBotLog(botId as string)}?page=${page}`
        );

        const { data, ...paginateData } = response.data;
        setLogs(data);
        setPagination(paginateData as PaginationObj);
      } catch (error) {
        // Handle error
      } finally {
        setLoading(false);
      }
    },
    [setLogs]
  );

  const getNext = () => {
    if (!pagination.hasNext) return undefined;
    getLogData(pagination.nextPage);
  };

  const getPrevious = () => {
    if (!pagination.hasPrevious) return undefined;
    getLogData(pagination.previousPage);
  };

  useEffect(() => {
    getLogData();
  }, [getLogData]);

  return (
    <WrapperBox>
      <WrapperBoxHeader title="Event Log" description="Auto Update in 10 Minutes." />
      <WrapperBoxSection noPadding>
        {loading ? (
          <Loader />
        ) : (
          <Table sx={{ tableLayout: 'fixed' }}>
            <TableHead>
              <TableRow>
                <TableCell sx={{ width: 150 }}>Creation Date</TableCell>
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
                    <TableCell>
                      <TextBadge>
                        <IconCircleCheck />
                        {log.message}
                      </TextBadge>
                    </TableCell>
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

export default BotEventLog;

import {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import apiEndPoints from "../consts/apiEndpoints";
import { AxiosResponse } from "axios";
import useAxios from "../hooks/useAxios";
import { AuthContext } from "./AuthProvider";
import { IBot, IBotFilters, IMyBots, IMyBotsContext } from "../interfaces/bots";
import { PaginationObj } from "../interfaces/paginateData";
import { ExchangeContext } from "./ExchangeProvider";

const getFiltersString = (filters: IBotFilters): string => {
  let tmpStr = "";

  tmpStr += `page=${filters.page !== 0 ? filters.page : "0"}&`;
  tmpStr += filters.duration !== 0 ? `duration=${filters.duration}&` : "";
  tmpStr += filters.exchange !== "all" ? `exchange=${filters.exchange}&` : "";
  tmpStr += filters.pair !== null ? `pair=${filters.pair}&` : "";
  tmpStr += filters.profit[0] !== -100 ? `profitMin=${filters.profit[0]}&` : "";
  tmpStr += filters.profit[1] !== 100 ? `profitMin=${filters.profit[1]}` : "";

  return tmpStr;
};

const initialFilters: IBotFilters = {
  duration: 0,
  exchange: "all",
  pair: "all",
  profit: [-100, 100],
  page: 0,
};

export const StoreBotsContext = createContext<IMyBotsContext>({
  botsList: [] as IBot[],
  paginateData: {} as PaginationObj,
  loading: true,
  setFilters: (filters: IBotFilters) => {},
  filters: initialFilters,
  reloadBots: () => {},
});

export const StoreBotsProvider = ({ children }: PropsWithChildren) => {
  const { isAuthenticated } = useContext(AuthContext);
  const { selectedExchange } = useContext(ExchangeContext);

  const { axios } = useAxios();

  const [myBotsList, setMyBotsList] = useState<IBot[]>([]);
  const [paginateData, setPaginateData] = useState<PaginationObj>(
    {} as PaginationObj
  );

  const [filters, setFilters] = useState<IBotFilters>({
    ...initialFilters,
    exchange: selectedExchange,
  });

  const [loading, setLoading] = useState(true);

  const loadMyBots = useCallback(async () => {
    setLoading(true);
    try {
      const response: AxiosResponse<IMyBots, any> = await axios.get(
        `${apiEndPoints.storeBots}?${getFiltersString(filters)}`
      );

      const { data, ...tmpPaginate } = response.data;

      setMyBotsList(data);
      setPaginateData(tmpPaginate as PaginationObj);
    } catch (error) {
      // Handle error
    } finally {
      setLoading(false);
    }
  }, [setMyBotsList, setPaginateData, myBotsList, paginateData, filters]);

  useEffect(() => {
    if (isAuthenticated) {
      loadMyBots();
    }
  }, [isAuthenticated, filters]);

  const value = useMemo(() => {
    return {
      botsList: myBotsList,
      paginateData,
      loading,
      filters,
      setFilters,
    } as IMyBotsContext;
  }, [myBotsList, paginateData, loading]);

  return (
    <StoreBotsContext.Provider value={value}>
      {children}
    </StoreBotsContext.Provider>
  );
};

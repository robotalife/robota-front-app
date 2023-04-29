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
import { IBot, IMyBots, IMyBotsContext } from "../interfaces/bots";
import { PaginationObj } from "../interfaces/paginateData";

export const MyBotsContext = createContext<IMyBotsContext>({
  botsList: [] as IBot[],
  paginateData: {} as PaginationObj,
  setBotPage: (page: number) => {},
  loading: true,
});

export const MyBotsProvider = ({ children }: PropsWithChildren) => {
  const { isAuthenticated } = useContext(AuthContext);
  const { axios } = useAxios();

  const [myBotsList, setMyBotsList] = useState<IBot[]>([]);
  const [paginateData, setPaginateData] = useState<PaginationObj>(
    {} as PaginationObj
  );
  const [botPage, setBotPage] = useState(0);

  const [loading, setLoading] = useState(true);

  const loadMyBots = useCallback(async () => {
    setLoading(true);
    try {
      const response: AxiosResponse<IMyBots, any> = await axios.get(
        `${apiEndPoints.bots}?&page=${botPage}`
      );

      const { data, ...tmpPaginate } = response.data;

      setMyBotsList(data);
      setPaginateData(tmpPaginate as PaginationObj);
    } catch (error) {
      // Handle error
    } finally {
      setLoading(false);
    }
  }, [setMyBotsList, setPaginateData, myBotsList, paginateData, botPage]);

  useEffect(() => {
    loadMyBots();
  }, [botPage]);

  useEffect(() => {
    if (isAuthenticated) {
      loadMyBots();
    }
  }, [isAuthenticated]);

  const value = useMemo(() => {
    return {
      botsList: myBotsList,
      setBotPage,
      paginateData,
      loading,
    } as IMyBotsContext;
  }, [myBotsList, paginateData, setBotPage, loading]);

  return (
    <MyBotsContext.Provider value={value}>{children}</MyBotsContext.Provider>
  );
};

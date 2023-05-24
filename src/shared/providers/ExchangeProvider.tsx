import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";
import apiEndPoints from "../consts/apiEndpoints";
import { AxiosResponse } from "axios";
import useAxios from "../hooks/useAxios";
import { AuthContext } from "./AuthProvider";
import routes from "../consts/routes";
import {
  IExchange,
  IExchangeContext,
  IExchangeListResponseObj,
  IPair,
} from "../interfaces/exchange";

export const ExchangeContext = createContext<IExchangeContext>({
  exchangeList: [],
  selectedExchange: "",
  setSelectedExchange: () => {},
  pairs: [],
  loading: false,
  getList: () => {},
});

export const ExchangeProvider = ({ children }: PropsWithChildren) => {
  const { isAuthenticated, userId } = useContext(AuthContext);
  const { axios } = useAxios();

  const [exchangeList, setExchangeList] = useState<IExchange[]>([]);
  const [selectedExchange, setSelectedExchange] = useState("");
  const [pairs, setPairs] = useState<IPair[]>([] as IPair[]);
  const [loading, setLoading] = useState(true);

  const getList = async () => {
    if (!userId) return;
    try {
      const response: AxiosResponse<
        { exchanges: IExchangeListResponseObj[] },
        any
      > = await axios.post(apiEndPoints.exchangeList, {
        userId: userId,
      });

      const { exchanges } = response.data;

      setExchangeList(
        exchanges.map((ex) => {
          return {
            ...ex,
            label: ex.exchangeName,
            value: ex.exchangeId,
          };
        })
      );

      if (
        !exchanges.length &&
        window.location.pathname !== routes.exchangeNew
      ) {
        window.location.href = routes.exchangeNew;
      }

      const tmpSelected =
        exchanges.find((ex) => ex.default)?.exchangeId ||
        exchanges[0]?.exchangeId;
      setSelectedExchange(tmpSelected as string);
    } catch (error) {
      // Handle error
    } finally {
      setLoading(false);
    }
  };

  const getPairs = async (exchangeId: string) => {
    try {
      const response: AxiosResponse<
        {
          symbols: IPair[];
        },
        any
      > = await axios.get(`${apiEndPoints.symbolsList}${exchangeId}`);

      const { symbols } = response.data;
      setPairs(symbols);
    } catch (error) {
      // Handle error
    }
  };

  useEffect(() => {
    if (exchangeList.length) {
      const exId =
        selectedExchange || exchangeList.find((ex) => ex.default)?.exchangeId;

      if (exId) {
        getPairs(exId);
      }
    }
  }, [exchangeList]);

  useEffect(() => {
    if (isAuthenticated) {
      getList();
    }
  }, [isAuthenticated]);

  return (
    <ExchangeContext.Provider
      value={{
        exchangeList,
        selectedExchange,
        setSelectedExchange,
        pairs,
        loading,
        getList,
      }}
    >
      {children}
    </ExchangeContext.Provider>
  );
};

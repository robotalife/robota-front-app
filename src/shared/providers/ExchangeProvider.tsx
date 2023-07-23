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
  selectedPair: null,
  setSelectedPair: () => {},
  loading: false,
  getList: () => {},
});

export const ExchangeProvider = ({ children }: PropsWithChildren) => {
  const { isAuthenticated, userId } = useContext(AuthContext);
  const { axios } = useAxios();

  const [exchangeList, setExchangeList] = useState<IExchange[]>([]);
  const [selectedExchange, setSelectedExchange] = useState("");
  const [pairs, setPairs] = useState<IPair[]>([] as IPair[]);
  const [selectedPair, setSelectedPair] = useState<IPair | null>(
    pairs[0] || null
  );
  const [loading, setLoading] = useState(true);

  const getList = async () => {
    if (!userId) return;
    setLoading(true);
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

      if (!!exchanges.length) {
        const tmpSelected =
          exchangeList.find((ex) => ex.default)?.exchangeId ||
          exchanges[0].exchangeId;
        setSelectedExchange(tmpSelected as string);
        getPairs(tmpSelected as string);
      }
    } catch (error) {
      // Handle error
    }
  };

  const getPairs = async (exchangeId: string) => {
    setLoading(true);
    try {
      const response: AxiosResponse<
        {
          symbols: IPair[];
        },
        any
      > = await axios.get(`${apiEndPoints.symbolsList}${exchangeId}`);

      const { symbols } = response.data;
      setPairs(symbols);
      setSelectedPair(symbols[0]);
    } catch (error) {
      // Handle error
    } finally {
      setLoading(false);
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
  }, [selectedExchange, exchangeList]);

  useEffect(() => {
    if (isAuthenticated && !exchangeList.length) {
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
        selectedPair,
        setSelectedPair,
        loading,
        getList,
      }}
    >
      {children}
    </ExchangeContext.Provider>
  );
};

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
import { UserContext } from "./UserProvider";
import routes from "../consts/routes";
import { useNavigate } from "react-router-dom";

interface IExchangeListResponseObj {
  default: boolean;
  exchangeId: string;
  exchangeName: string;
  exchangeType: string;
}
export interface IExchange extends IExchangeListResponseObj {
  label: string;
  value: string;
}

export interface IPair {
  value: string;
  text: string;
  base: string;
  quote: string;
  symbolFilter: {
    lotSizeFilter: {
      minQty: string;
      maxQty: string;
      stepSize: string;
      maxAllowedPrecision: number;
    };
    priceFilter: {
      minPrice: string;
      maxPrice: string;
      tickSize: string;
    };
  };
}

interface IExchangeContext {
  exchangeList: IExchange[];
  selectedExchange: string | undefined;
  setSelectedExchange: (exchange: string) => void;
  pairs: IPair[];
}

export const ExchangeContext = createContext<IExchangeContext>({
  exchangeList: [],
  selectedExchange: undefined,
  setSelectedExchange: () => {},
  pairs: [],
});

export const ExchangeProvider = ({ children }: PropsWithChildren) => {
  const { isAuthenticated } = useContext(AuthContext);
  const { user } = useContext(UserContext);
  const { axios } = useAxios();

  const [exchangeList, setExchangeList] = useState<IExchange[]>([]);
  const [selectedExchange, setSelectedExchange] = useState(
    exchangeList.find((ex) => ex.default)?.exchangeId
  );
  const [pairs, setPairs] = useState<IPair[]>([] as IPair[]);

  const getList = async () => {
    try {
      const response: AxiosResponse<
        { exchanges: IExchangeListResponseObj[] },
        any
      > = await axios.post(apiEndPoints.exchangeList, {
        userId: user.userId,
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

      const tmpSelected = exchanges.find((ex) => ex.default)?.exchangeId;
      setSelectedExchange(tmpSelected);
    } catch (error) {
      // Handle error
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
      }}
    >
      {children}
    </ExchangeContext.Provider>
  );
};

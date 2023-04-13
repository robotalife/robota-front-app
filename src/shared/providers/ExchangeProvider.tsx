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

interface IExchange {
  default: boolean;
  exchangeId: string;
  exchangeName: string;
  exchangeType: string;
}

interface IExchangeContext {
  exchangeList: IExchange[];
  selectedExchange: string;
  setSelectedExchange: (exchange: string) => void;
}

export const ExchangeContext = createContext<IExchangeContext>({
  exchangeList: [],
  selectedExchange: "",
  setSelectedExchange: () => {},
});

export const ExchangeProvider = ({ children }: PropsWithChildren) => {
  const { isAuthenticated } = useContext(AuthContext);
  const { user } = useContext(UserContext);
  const { axios } = useAxios();
  const [exchangeList, setExchangeList] = useState<IExchange[]>([]);
  const [selectedExchange, setSelectedExchange] = useState("");

  const getList = async () => {
    try {
      const response: AxiosResponse<any, any> = await axios.post(
        apiEndPoints.exchangeList,
        {
          userId: user.userId,
        }
      );
    } catch (error) {
      // Handle error
    }
  };

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
      }}
    >
      {children}
    </ExchangeContext.Provider>
  );
};

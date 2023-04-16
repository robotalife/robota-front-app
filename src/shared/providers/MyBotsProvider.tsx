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

interface IBot {
  exchangeType: string;
  id: string;
  logo: string;
  name: string;
  pair: string;
  price: string;
  profit: string;
}

interface IMyBots {
  currentPage: number;
  data: IBot[];
  nextPage: number | null;
  perPage: number;
  remainingCount: number;
  total: number;
  totalPages: number;
}

interface IMyBotsContext {
  botsList: IBot[];
}

export const MyBotsContext = createContext<IMyBotsContext>({
  botsList: [],
});

export const MyBotsProvider = ({ children }: PropsWithChildren) => {
  const { isAuthenticated } = useContext(AuthContext);
  const { axios } = useAxios();

  const [myBotsList, setMyBotsList] = useState<IBot[]>([]);

  const getList = async () => {
    try {
      const response: AxiosResponse<IMyBots, any> = await axios.get(
        apiEndPoints.bots
      );

      const list = response.data;

      setMyBotsList(list.data);
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
    <MyBotsContext.Provider value={{ botsList: myBotsList }}>
      {children}
    </MyBotsContext.Provider>
  );
};

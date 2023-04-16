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

interface IMyBots {
  exchangeType: string;
  id: string;
  logo: string;
  name: string;
  pair: string;
  price: string;
  profit: string;
}

interface IMyBotsContext {
  botsList: IMyBots[];
}

export const MyBotsContext = createContext<IMyBotsContext>({
  botsList: [],
});

export const MyBotsProvider = ({ children }: PropsWithChildren) => {
  const { isAuthenticated } = useContext(AuthContext);
  const { axios } = useAxios();

  const [myBotsList, setMyBotsList] = useState<IMyBots[]>([]);

  const getList = async () => {
    try {
      const response: AxiosResponse<IMyBots[], any> = await axios.get(
        apiEndPoints.bots
      );

      const list = response.data;

      setMyBotsList(list);
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

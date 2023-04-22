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
import { IBot, IMyBots, IMyBotsContext } from "../interfaces/bots";

export const MyBotsContext = createContext<IMyBotsContext>({
  botsList: [],
  loadMyBots: () => {},
});

export const MyBotsProvider = ({ children }: PropsWithChildren) => {
  const { isAuthenticated } = useContext(AuthContext);
  const { axios } = useAxios();

  const [myBotsList, setMyBotsList] = useState<IBot[]>([]);

  const loadMyBots = async () => {
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
      loadMyBots();
    }
  }, [isAuthenticated]);

  return (
    <MyBotsContext.Provider value={{ botsList: myBotsList, loadMyBots }}>
      {children}
    </MyBotsContext.Provider>
  );
};

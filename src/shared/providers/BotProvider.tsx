import {
  createContext,
  PropsWithChildren,
  useCallback,
  useEffect,
  useState,
} from "react";
import useAxios from "../hooks/useAxios";
import routes from "../consts/routes";
import { useParams } from "react-router-dom";
import { AxiosResponse } from "axios";
import apiEndPoints from "../consts/apiEndpoints";

interface IBotData {
  createdAt: string;
  createdBy: string;
  exchangeType: string;
  id: string;
  name: string;
  owner: string | null;
  pair: string;
  price: string;
  strategy: "SHORT" | "LONG";
}

export const BotContext = createContext<{
  botData: IBotData;
}>({
  botData: {} as IBotData,
});

export const BotProvider = ({ children }: PropsWithChildren) => {
  const { botId } = useParams();
  const { axios } = useAxios();
  const [botData, setBotData] = useState<IBotData>({} as IBotData);

  const getBotData = useCallback(async () => {
    try {
      const response: AxiosResponse<IBotData, any> = await axios.get(
        apiEndPoints.getBot(botId as string)
      );

      const data = response.data;
      setBotData(data);
    } catch (error) {
      // Handle error
    }
  }, [setBotData]);

  useEffect(() => {
    getBotData();
  }, [getBotData]);

  return (
    <BotContext.Provider value={{ botData }}>{children}</BotContext.Provider>
  );
};

import {
  createContext,
  PropsWithChildren,
  useCallback,
  useEffect,
  useState,
} from "react";
import useAxios from "../hooks/useAxios";
import { useParams } from "react-router-dom";
import { AxiosResponse } from "axios";
import apiEndPoints from "../consts/apiEndpoints";
import { ISingleBotData } from "../interfaces/bots";

export const BotContext = createContext<{
  botData: ISingleBotData;
}>({
  botData: {} as ISingleBotData,
});

export const BotProvider = ({ children }: PropsWithChildren) => {
  const { botId } = useParams();
  const { axios } = useAxios();
  const [botData, setBotData] = useState<ISingleBotData>({} as ISingleBotData);

  const getBotData = useCallback(async () => {
    try {
      const response: AxiosResponse<ISingleBotData, any> = await axios.get(
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

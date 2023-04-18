import { useCallback } from "react";
import WrapperBox from "../../components/shared/wrapperBox/WrapperBox";
import WrapperBoxHeader from "../../components/shared/wrapperBox/WrapperBoxHeader";
import { useParams } from "react-router-dom";
import useAxios from "../../shared/hooks/useAxios";
import { AxiosResponse } from "axios";
import apiEndPoints from "../../shared/consts/apiEndpoints";

const BotActiveTrades = () => {
  const { botId } = useParams();
  const { axios } = useAxios();
  // const [history, setHistory] = useState<IBotHistoryObj[]>(
  //   [] as IBotHistoryObj[]
  // );

  const signal = useCallback(async (action: "START" | "STOP") => {
    try {
      const response: AxiosResponse<any, any> = await axios.post(
        apiEndPoints.signal,
        {
          action: action,
          botId: botId,
        }
      );

      const data = response.data;
      console.log(data);
    } catch (error) {
      // Handle error
    }
  }, []);

  return (
    <>
      <WrapperBox>
        <WrapperBoxHeader
          title="Active Trades"
          description="Monitor active trades for this bot"
        />
      </WrapperBox>
      <button onClick={() => signal("START")}>start</button>
      <button onClick={() => signal("STOP")}>stop</button>
    </>
  );
};

export default BotActiveTrades;

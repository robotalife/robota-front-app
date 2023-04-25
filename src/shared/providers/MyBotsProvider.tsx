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
import { PaginationObj } from "../interfaces/paginateData";

export const MyBotsContext = createContext<IMyBotsContext>({
  botsList: [],
  paginateData: {} as PaginationObj,
  loadMyBots: () => {},
});

export const MyBotsProvider = ({ children }: PropsWithChildren) => {
  const { isAuthenticated } = useContext(AuthContext);
  const { axios } = useAxios();

  const [myBotsList, setMyBotsList] = useState<IBot[]>([]);
  const [paginateData, setPaginateData] = useState<PaginationObj>(
    {} as PaginationObj
  );

  const loadMyBots = async () => {
    try {
      const response: AxiosResponse<IMyBots, any> = await axios.get(
        apiEndPoints.bots
      );

      const { data, ...tmpPaginate } = response.data;
      console.log(response.data);

      setMyBotsList(data);
      setPaginateData(tmpPaginate as PaginationObj);
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
    <MyBotsContext.Provider
      value={{ botsList: myBotsList, loadMyBots, paginateData }}
    >
      {children}
    </MyBotsContext.Provider>
  );
};

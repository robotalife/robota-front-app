import { Grid } from "@mui/material";
import CopyBox from "../../components/shared/CopyBox";
import { useParams } from "react-router-dom";
import useAxios from "../../shared/hooks/useAxios";
import { useCallback, useEffect, useState } from "react";
import { AxiosResponse } from "axios";
import apiEndPoints from "../../shared/consts/apiEndpoints";

interface ITokens {
  startCommand: string;
  stopCommand: string;
}

const TVTokens = () => {
  const { botId } = useParams();
  const { axios } = useAxios();
  const [tokens, setTokens] = useState<ITokens>({} as ITokens);

  const getTokenData = useCallback(async () => {
    try {
      const response: AxiosResponse<ITokens, any> = await axios.get(
        apiEndPoints.getTokens(botId as string)
      );

      const data = response.data;
      setTokens(data);
      console.log(data);
    } catch (error) {
      // Handle error
    }
  }, [setTokens]);

  useEffect(() => {
    getTokenData();
  }, [getTokenData]);

  return (
    <Grid container spacing={2}>
      <Grid xs={12} md={6} item>
        <CopyBox
          title="Start Order"
          description="Message for trade start signal"
          copyText={tokens.startCommand}
        ></CopyBox>
      </Grid>
      <Grid xs={12} md={6} item>
        <CopyBox
          title="Close Order"
          description="Message to close order at Market Price"
          copyText={tokens.stopCommand}
        ></CopyBox>
      </Grid>
    </Grid>
  );
};

export default TVTokens;

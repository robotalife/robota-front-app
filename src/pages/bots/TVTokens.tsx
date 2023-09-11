import { Grid } from '@mui/material';
import CopyBox from '../../components/shared/CopyBox';
import { useParams } from 'react-router-dom';
import useAxios from '../../shared/hooks/useAxios';
import { useCallback, useEffect, useState } from 'react';
import { AxiosResponse } from 'axios';
import apiEndPoints from '../../shared/consts/apiEndpoints';
import { ITradingViewTokens } from '../../shared/interfaces/bots';
import Loader from '../../components/shared/Loader';

const TVTokens = () => {
  const { botId } = useParams();
  const { axios } = useAxios();
  const [tokens, setTokens] = useState<ITradingViewTokens>({} as ITradingViewTokens);
  const [loading, setLoading] = useState(true);

  const getTokenData = useCallback(async () => {
    setLoading(true);

    try {
      const response: AxiosResponse<ITradingViewTokens, any> = await axios.get(apiEndPoints.getTokens(botId as string));

      const data = response.data;
      setTokens(data);
    } catch (error) {
      // Handle error
    } finally {
      setLoading(false);
    }
  }, [setTokens]);

  useEffect(() => {
    getTokenData();
  }, [getTokenData]);

  if (loading) {
    return <Loader />;
  }

  return (
    <Grid container spacing={2}>
      <Grid xs={12} md={6} item>
        <CopyBox title="Start Order" description="Message for trade start signal" copyText={tokens.startCommand} />
      </Grid>
      <Grid xs={12} md={6} item>
        <CopyBox title="Close Order" description="Message to close order at Market Price" copyText={tokens.stopCommand} />
      </Grid>
    </Grid>
  );
};

export default TVTokens;

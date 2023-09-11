import { useCallback, useContext, useEffect } from 'react';
import { ExchangeContext } from '../../shared/providers/ExchangeProvider';
import { Container, Grid } from '@mui/material';
import Loader from '../../components/shared/Loader';
import ExchangeCard from '../../components/shared/exchangeCard/ExchangeCard';
import AddExchangeCard from '../../components/shared/exchangeCard/AddExchangeCard';
import EmptyList from '../../components/shared/EmptyList';
import { AxiosResponse } from 'axios';
import useAxios from '../../shared/hooks/useAxios';
import apiEndPoints from '../../shared/consts/apiEndpoints';
import useNotify from '../../shared/hooks/useNotify';

const Exchanges = () => {
  const notify = useNotify();
  const { axios } = useAxios();
  const { exchangeList, loading, getList } = useContext(ExchangeContext);

  useEffect(() => {
    getList();
  }, []);

  const excludePaperExchange = (exchange: any) => {
    //todo: this code should change to have the exact type not the type name for display
    return exchange.exchangeType.indexOf('Paper') === -1;
  };
  const deleteExchange = useCallback(async (id: string) => {
    try {
      const response: AxiosResponse<any, any> = await axios.delete(`${apiEndPoints.exchange}/${id}`);
      getList();
      notify('The exchange deleted!', 'success');
    } catch (error) {
      // Handle error
    }
  }, []);

  return (
    <Container maxWidth="xl" sx={{ m: 0 }}>
      {loading ? (
        <Loader />
      ) : //     use the correct list not to filter 2 times
      !!exchangeList.filter(excludePaperExchange).length ? (
        <Grid container spacing={3}>
          {exchangeList.filter(excludePaperExchange).map((exchange) => (
            <Grid item xs={12} sm={6} md={4} key={exchange.exchangeId}>
              <ExchangeCard data={exchange} remove={deleteExchange} />
            </Grid>
          ))}
          <Grid item xs={12} sm={6} md={4}>
            <AddExchangeCard title={'Add Exchange'} description={'You can add an unlimited account'} />
          </Grid>
        </Grid>
      ) : (
        <EmptyList />
      )}
    </Container>
  );
};

export default Exchanges;

import { useContext, useEffect } from "react";
import { ExchangeContext } from "../../shared/providers/ExchangeProvider";
import { Container, Grid } from "@mui/material";
import Loader from "../../components/shared/Loader";
import ExchangeCard from "../../components/shared/exchangeCard/ExchangeCard";
import AddExchangeCard from "../../components/shared/exchangeCard/AddExchangeCard";
import EmptyList from "../../components/shared/EmptyList";

const Exchanges = () => {
  const { exchangeList, loading, getList } = useContext(ExchangeContext);

  useEffect(() => {
    getList();
  }, []);

  return (
    <Container maxWidth="xl" sx={{ m: 0 }}>
      {loading && <Loader />}

      {!loading && !exchangeList.length ? (
        <Grid container spacing={3}>
          {exchangeList.map((exchange) => (
            <Grid item xs={12} sm={6} md={4} key={exchange.exchangeId}>
              <ExchangeCard data={exchange} />
            </Grid>
          ))}
          <Grid item xs={12} sm={6} md={4}>
            <AddExchangeCard
              title={"Add Exchange"}
              description={"You can add an unlimited account"}
            />
          </Grid>
        </Grid>
      ) : (
        <EmptyList />
      )}
    </Container>
  );
};

export default Exchanges;

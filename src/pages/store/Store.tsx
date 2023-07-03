import { useContext } from "react";
import { MyBotsContext } from "../../shared/providers/MyBotsProvider";
import { Container, Grid } from "@mui/material";
import BotCard from "../../components/shared/BotCard/BotCard";
import Pagination from "../../components/shared/Pagination";
import Loader from "../../components/shared/Loader";
import BotFilters from "../../components/shared/BotFilter";
import PageTitle from "../../components/pageStructure/PageTitle";

const Store = () => {
  const { botsList, setFilters, paginateData, loading, filters } =
    useContext(MyBotsContext);

  return (
    <>
      <Container maxWidth={"xl"} sx={{ p: "0!important" }}>
        <Grid container>
          <Grid item xs={12} lg={"auto"}>
            <PageTitle title={"Bot Store"} />
          </Grid>
          <Grid item xs={12} lg>
            {botsList.length > 0 ? <BotFilters /> : <> </>}
          </Grid>
        </Grid>
      </Container>

      {loading ? (
        <Loader />
      ) : (
        <Grid container spacing={3}>
          {Array.isArray(botsList) && botsList.length ? (
            botsList.map((bot) => (
              <Grid item xs={12} sm={6} md={4} lg={"auto"} key={bot.id}>
                <BotCard data={bot} />
              </Grid>
            ))
          ) : (
            <Grid item>There is no bots for you</Grid>
          )}
        </Grid>
      )}
      {botsList.length > 0 ? (
        <Pagination
          currentPage={paginateData.currentPage + 1}
          totalPages={paginateData.totalPages}
          hasNext={paginateData.hasNext}
          hasPrevious={paginateData.hasPrevious}
          next={() => setFilters({ ...filters, page: paginateData.nextPage })}
          previous={() =>
            setFilters({ ...filters, page: paginateData.previousPage })
          }
        />
      ) : (
        <> </>
      )}
    </>
  );
};

export default Store;

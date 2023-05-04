import { useContext } from "react";
import { MyBotsContext } from "../../shared/providers/MyBotsProvider";
import { Grid } from "@mui/material";
import BotCard from "../../components/shared/BotCard/BotCard";
import Pagination from "../../components/shared/Pagination";
import Loader from "../../components/shared/Loader";
import BotFilters from "../../components/shared/BotFilter";

const Bots = () => {
  const { botsList, setBotPage, paginateData, loading } =
    useContext(MyBotsContext);

  return (
    <div>
      <BotFilters />
      {loading ? (
        <Loader />
      ) : (
        <Grid container spacing={3}>
          {Array.isArray(botsList) && botsList.length ? (
            botsList.map((bot) => (
              <Grid item xs={12} sm={6} lg={4} xl={"auto"} key={bot.id}>
                <BotCard data={bot} />
              </Grid>
            ))
          ) : (
            <Grid item>"There is no bots for you"</Grid>
          )}
        </Grid>
      )}
      <Pagination
        currentPage={paginateData.currentPage + 1}
        totalPages={paginateData.totalPages}
        hasNext={paginateData.hasNext}
        hasPrevious={paginateData.hasPrevious}
        next={() => setBotPage(paginateData.nextPage)}
        previous={() => setBotPage(paginateData.previousPage)}
      />
    </div>
  );
};

export default Bots;

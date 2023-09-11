import { useContext } from 'react';
import { MyBotsContext } from '../../shared/providers/MyBotsProvider';
import { Grid } from '@mui/material';
import BotCard from '../../components/shared/BotCard/BotCard';
import Pagination from '../../components/shared/Pagination';
import Loader from '../../components/shared/Loader';
import BotFilters from '../../components/shared/BotFilter';
import Button from '../../components/formElements/Button';
import { useNavigate } from 'react-router-dom';
import routes from '../../shared/consts/routes';
import EmptyList from '../../components/shared/EmptyList';

const Bots = () => {
  const navigate = useNavigate();
  const { botsList, setFilters, paginateData, loading, filters } = useContext(MyBotsContext);

  return (
    <>
      {botsList.length > 0 ? <BotFilters /> : <> </>}
      {loading ? (
        <Loader />
      ) : (
        <Grid container spacing={3}>
          {Array.isArray(botsList) && botsList.length ? (
            botsList.map((bot) => (
              <Grid item xs={12} sm={6} md={4} lg={'auto'} key={bot.id}>
                <BotCard data={bot} link={`${routes.botOverview}/${bot.id}`}>
                  <Button
                    onClick={() => {
                      navigate(`${routes.botOverview}/${bot.id}`);
                    }}
                    variant="outlined"
                    size="small"
                  >
                    View bot detail
                  </Button>
                </BotCard>
              </Grid>
            ))
          ) : (
            <Grid item xs={12}>
              <EmptyList />
            </Grid>
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
          previous={() => setFilters({ ...filters, page: paginateData.previousPage })}
        />
      ) : (
        <> </>
      )}
    </>
  );
};

export default Bots;

import { Card, Container, Grid } from '@mui/material';
import { Outlet } from 'react-router-dom';

const CommonLayout = () => {
  return (
    <Container maxWidth="xl" sx={{ paddingX: { xs: 0, md: 3 } }}>
      <Grid container justifyContent={'center'}>
        <Grid item xs={10} md={6} xl={'auto'}>
          <Outlet />
        </Grid>
      </Grid>
    </Container>
  );
};
export default CommonLayout;

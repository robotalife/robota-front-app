import { Grid } from '@mui/material';
import { Container } from '@mui/system';
import robotaLogoType from '@images/robota-logo-type.svg';
import classes from './Header.module.scss';
import { NavLink } from 'react-router-dom';
import routes from '../../shared/consts/routes';
import TextBadge from '../shared/TextBadge';
import NotificationsDropdown from '../shared/NotificationsDropdown';

const Header = () => {
  return (
    <>
      <Container maxWidth={false}>
        <Grid container justifyContent={'space-between'} alignItems={'center'}>
          <Grid item xs={'auto'}>
            <NavLink to={routes.botsNew} className={classes.logoLink}>
              <img src={robotaLogoType} className={classes.logo} />
            </NavLink>
          </Grid>
          <Grid item xs={'auto'}>
            <TextBadge variation={'primary'}>Beta Version</TextBadge>
          </Grid>
          <Grid item xs />
          <Grid item xs={'auto'}>
            {/* <NotificationsDropdown /> */}
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default Header;

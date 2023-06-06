import { Grid, IconButton } from "@mui/material";
import robotaLogoType from "@images/robota-logo-type.svg";
import classes from "./Header.module.scss";
import { Container } from "@mui/system";
import { IconBell } from "../../shared/icons/Icons";

const Header = () => {
  return (
    <Container maxWidth={false}>
      <Grid container justifyContent={"space-between"}>
        <Grid item xs>
          <img src={robotaLogoType} className={classes.logo} />
        </Grid>
        {/* <Grid item xs={"auto"}>
          <IconButton>
            <IconBell />
          </IconButton>
        </Grid> */}
      </Grid>
    </Container>
  );
};

export default Header;

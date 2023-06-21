import {Grid} from "@mui/material";
import robotaLogoType from "@images/robota-logo-type.svg";
import classes from "./Header.module.scss";
import {Container} from "@mui/system";
import {NavLink} from "react-router-dom";
import routes from "../../shared/consts/routes";

const Header = () => {
    return (
        <Container maxWidth={false}>
            <Grid container justifyContent={"space-between"}>
                <Grid item xs>
                    <NavLink to={routes.botsNew} className={classes.logoLink}>
                        <img src={robotaLogoType} className={classes.logo}/>
                    </NavLink>
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

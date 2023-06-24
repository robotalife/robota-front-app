import {Grid} from "@mui/material";

import robotaLogoType from "@images/robota-logo-type.svg";
import classes from "./Header.module.scss";
import {NavLink} from "react-router-dom";
import routes from "../../shared/consts/routes";
import TextBadge from "../shared/TextBadge";

const Header = () => {
    return (
        // <Container maxWidth={false}>
        //     <Grid container justifyContent={"space-between"} >
        //         <Grid>
        //             <Grid item>
        //             <NavLink to={routes.botsNew} className={classes.logoLink}>
        //                 <img src={robotaLogoType} className={classes.logo}/>
        //             </NavLink>
        //             </Grid>
        //             <Grid>
        //                 <TextBadge variation={"primary"} >Beta Version</TextBadge>
        //             </Grid>
        //         </Grid>
        //         {/* <Grid item xs={"auto"}>
        //   <IconButton>
        //     <IconBell />
        //   </IconButton>
        // </Grid> */}
        //     </Grid>
        // </Container>
        <Grid container alignItems={"center"} spacing={1} >
            <Grid item xs={"auto"}>
                <NavLink to={routes.botsNew} className={classes.logoLink}>
                    <img src={robotaLogoType} className={classes.logo}/>
                </NavLink>
            </Grid>
            <Grid item xs={"auto"}>
                <TextBadge variation={"primary"} >Beta Version</TextBadge>
            </Grid>
        </Grid>
    );
};

export default Header;

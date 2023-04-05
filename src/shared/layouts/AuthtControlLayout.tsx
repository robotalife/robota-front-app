import { Card, Container, Grid } from "@mui/material";
import { Outlet, useNavigate } from "react-router-dom";
import robotaLogoMark from "@images/robota-logo-mark.svg";
import robotaLogoType from "@images/robota-logo-type.svg";
import classes from "./AuthControlLayout.module.scss";
import { AuthContext } from "../providers/AuthProvider";
import { useContext, useEffect } from "react";
import routes from "../consts/routes";

const AuthControlLayout = () => {
  const { isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate(routes.portfolio);
    }
  }, [isAuthenticated]);

  return (
    <div className={classes.authControlWrapper}>
      <Container maxWidth="xl" sx={{ paddingX: { xs: 0, md: 3 } }}>
        <Grid container justifyContent={"center"}>
          <Grid item xs={10} md={6} xl={"auto"}>
            <img src={robotaLogoType} className={classes.desktopLogo} />
            <Card className={classes.authControlCard}>
              <img src={robotaLogoMark} className={classes.mobileLogo} />
              <Outlet />
            </Card>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default AuthControlLayout;

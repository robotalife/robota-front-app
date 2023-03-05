import { Container, createStyles, Theme, Grid } from "@mui/material";
// import { makeStyles } from "@mui/styles";
import { Link, Outlet } from "react-router-dom";
import routes from "../consts/routes";

// const useStyles = makeStyles((theme: Theme) =>
//   createStyles({
//     root: {
//       display: "flex",
//       flexDirection: "column",
//       alignItems: "center",
//       [theme.breakpoints.up("sm")]: {
//         flexDirection: "row",
//       },
//     },
//     item: {
//       margin: theme.spacing(1),
//       padding: theme.spacing(2),
//       backgroundColor: theme.palette.primary.main,
//       color: theme.palette.common.white,
//       [theme.breakpoints.up("sm")]: {
//         margin: theme.spacing(2),
//         padding: theme.spacing(4),
//       },
//     },
//     button: {
//       marginTop: theme.spacing(2),
//       [theme.breakpoints.up("sm")]: {
//         marginTop: 0,
//         marginLeft: theme.spacing(2),
//       },
//     },
//   })
// );

const AccountControlLayout = () => {
  // const classes = useStyles();

  return (
    <div className="">
      <Container>
        <Grid container>
          <Grid item xs={12} md={"auto"}>
            <div>
              <Outlet />
            </div>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default AccountControlLayout;

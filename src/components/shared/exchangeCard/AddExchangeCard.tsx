import { Box, Grid, Typography } from "@mui/material";

import classes from "./ExchangeCard.module.scss";
import Button from "../../formElements/Button";
import { IconAdd, IconSquareAdd } from "../../../shared/icons/Icons";
import {NavLink, useNavigate} from "react-router-dom";
import routes from "../../../shared/consts/routes";

interface Props {
  title: string;
  description: string;
}

const currentPage = window.location.pathname;

const AddExchangeCard = ({ title, description }: Props) => {
  const navigate = useNavigate();

  return (
    <Box className={classes.exchangeCard}>
      <Grid
        container
        justifyContent={"space-between"}
        alignItems={"flex-start"}
        className={classes.borderBottom}
        sx={{ mb: 3 }}
      >
        <Grid item xs="auto">
           <NavLink to={`${routes.exchangeNew}?returnTo=${currentPage}`}>
                <IconSquareAdd style={{ marginBottom: 20 }} />
           </NavLink>
          <Typography className={classes.title}>{title}</Typography>
          <Typography className={classes.description}>{description}</Typography>
        </Grid>
      </Grid>
      <Grid container justifyContent={"space-between"} alignItems={"center"}>
        <Grid item xs={12}>
          <Button
            variant="outlined"
            size="small"
            fullWidth
            onClick={() =>
              navigate(`${routes.exchangeNew}?returnTo=${currentPage}`)
            }
          >
            <IconAdd style={{ marginRight: 8, height: 16, width: 16 }} />
            Add {title}
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AddExchangeCard;

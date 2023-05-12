import { Box, Grid, Typography } from "@mui/material";

import classes from "./ExchangeCard.module.scss";
import Button from "../../formElements/Button";
import { IconAdd, IconSquareAdd } from "../../../shared/icons/Icons";

interface Props {
  title: string;
  description: string;
}

const AddExchangeCard = ({ title, description }: Props) => {
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
          <IconSquareAdd style={{ marginBottom: 20 }} />
          <Typography className={classes.title}>{title}</Typography>
          <Typography className={classes.description}>{description}</Typography>
        </Grid>
      </Grid>
      <Grid container justifyContent={"space-between"} alignItems={"center"}>
        <Grid item xs={12}>
          <Button variant="outlined" size="small" fullWidth>
            <IconAdd style={{ marginRight: 8, height: 16, width: 16 }} />
            Add {title}
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AddExchangeCard;

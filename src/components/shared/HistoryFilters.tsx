import { Grid, MenuItem } from "@mui/material";
import TextField from "../formElements/TextField";
import { IconCalendar } from "../../shared/icons/Icons";
import { useContext } from "react";
import { ExchangeContext } from "../../shared/providers/ExchangeProvider";
import Select from "../formElements/Select";

const HistoryFilters = () => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} lg={3}>
        <TextField
          startIcon={<IconCalendar />}
          placeholder="Data Range"
          label="Created On"
        />
      </Grid>
      <Grid item xs={12} lg={3}>
        <TextField
          startIcon={<IconCalendar />}
          placeholder="Data Range"
          label="Closed On"
        />
      </Grid>
    </Grid>
  );
};

export default HistoryFilters;

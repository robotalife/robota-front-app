import { Grid } from "@mui/material";
import TextField from "../formElements/TextField";
import { IconCalendar } from "../../shared/icons/Icons";

const Filters = () => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={4} lg>
        <TextField
          disabled
          startIcon={<IconCalendar />}
          placeholder="Data Range"
          label="Created On"
        />
      </Grid>
      <Grid item xs={12} md={4} lg>
        <TextField
          disabled
          startIcon={<IconCalendar />}
          placeholder="Data Range"
          label="Closed On"
        />
      </Grid>
      <Grid item xs={12} md={4} lg>
        <TextField disabled placeholder="All" label="Account" />
      </Grid>
      <Grid item xs={12} md={4} lg>
        <TextField disabled placeholder="All" label="Bot On" />
      </Grid>
      <Grid item xs={12} md={4} lg>
        <TextField disabled placeholder="All" label="Strategy" />
      </Grid>
      <Grid item xs={12} md={4} lg>
        <TextField disabled placeholder="All" label="Status" />
      </Grid>
    </Grid>
  );
};

export default Filters;

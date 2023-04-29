import { Grid } from "@mui/material";
import DatePicker from "../formElements/DatePicker";
import moment from "moment";
import { useState } from "react";

const HistoryFilters = () => {
  const [minClosedDate, setMinClosedDate] = useState<Date | null>(null);
  const minCreatedDate = moment(new Date()).subtract(90, "days");

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} lg={3}>
        <DatePicker
          label="Created On"
          onChange={setMinClosedDate}
          minDate={minCreatedDate as unknown as Date}
        />
      </Grid>
      <Grid item xs={12} lg={3}>
        <DatePicker
          label="Closed On"
          disabled={!minClosedDate}
          minDate={minClosedDate as unknown as Date}
        />
      </Grid>
    </Grid>
  );
};

export default HistoryFilters;

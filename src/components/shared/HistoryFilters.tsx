import { Grid, Typography } from '@mui/material';
import { useState } from 'react';
import RangePicker from '../formElements/RangePicker';

interface Props {
  onCreatedChange: (e: (Date | null)[]) => void;
  onClosedChange: (e: (Date | null)[]) => void;
}

const HistoryFilters = ({ onCreatedChange, onClosedChange }: Props) => {
  // const [minClosedDate, setMinClosedDate] = useState<Date | null>(null);
  // const minCreatedDate = moment(new Date()).subtract(90, "days").toDate();

  const [createdOn, setCreatedOn] = useState<(Date | null)[]>([null, null]);
  const [closedOn, setClosedOn] = useState<(Date | null)[]>([null, null]);

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} lg={3}>
        <Typography variant="h6">Created On</Typography>
        <RangePicker
          value={createdOn}
          disabled={false}
          onChange={(e) => {
            setCreatedOn(e);
            onCreatedChange(e);
          }}
        />
      </Grid>
      <Grid item xs={12} lg={3}>
        <Typography variant="h6">Closed On</Typography>
        <RangePicker
          value={closedOn}
          disabled={false}
          onChange={(e) => {
            setClosedOn(e);
            onClosedChange(e);
          }}
        />
      </Grid>
      {/* <Grid item xs={12} lg={3}>
        <DatePicker
          label="Created On"
          autoFocus
          onChange={(e) => {
            setMinClosedDate(e);
            onCreatedChange(e);
          }}
          minDate={minCreatedDate as unknown as Date}
        />
      </Grid>
      <Grid item xs={12} lg={3}>
        <DatePicker
          label="Closed On"
          disabled={!minClosedDate}
          minDate={minClosedDate as unknown as Date}
          onChange={onClosedChange}
        />
      </Grid> */}
    </Grid>
  );
};

export default HistoryFilters;

import { Grid, MenuItem } from "@mui/material";
import TextField from "../formElements/TextField";
import { IconCalendar } from "../../shared/icons/Icons";
import { useContext } from "react";
import { ExchangeContext } from "../../shared/providers/ExchangeProvider";
import Select from "../formElements/Select";

const HistoryFilters = () => {
  const { exchangeList, selectedExchange, setSelectedExchange, pairs } =
    useContext(ExchangeContext);

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={4} lg>
        <TextField
          startIcon={<IconCalendar />}
          placeholder="Data Range"
          label="Created On"
        />
      </Grid>
      <Grid item xs={12} md={4} lg>
        <TextField
          startIcon={<IconCalendar />}
          placeholder="Data Range"
          label="Closed On"
        />
      </Grid>
      <Grid item xs={12} md={4} lg>
        <Select
          id="exchangeId"
          value={selectedExchange}
          label="Exchange"
          onChange={(e) => {
            console.log(e);
          }}
          sx={{ width: "100%" }}
        >
          {exchangeList.map((ex) => (
            <MenuItem value={ex.value} key={ex.label}>
              {ex.label}
            </MenuItem>
          ))}
        </Select>
      </Grid>
      <Grid item xs={12} md={4} lg>
        <Select
          id="exchangeId"
          value={undefined}
          label="Exchange"
          onChange={(e) => {
            console.log(e);
          }}
          sx={{ width: "100%" }}
        >
          <MenuItem value={"undefined"} selected>
            All
          </MenuItem>
          <MenuItem value={"open"}>Open</MenuItem>
          <MenuItem value={"close"}>Close</MenuItem>
        </Select>
      </Grid>
    </Grid>
  );
};

export default HistoryFilters;

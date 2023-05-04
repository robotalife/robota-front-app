import { Grid, MenuItem } from "@mui/material";
import { useContext } from "react";
import Select from "../formElements/Select";
import { ExchangeContext } from "../../shared/providers/ExchangeProvider";

interface Props {
  onCreatedChange?: (e: Date | null) => void;
  onClosedChange?: (e: Date | null) => void;
}

const BotFilters = ({ onCreatedChange, onClosedChange }: Props) => {
  const { exchangeList, selectedExchange, setSelectedExchange, pairs } =
    useContext(ExchangeContext);

  return (
    <Grid
      container
      spacing={2}
      sx={{ mb: 3, pb: 3, borderBottom: "1px solid #eaecf0" }}
    >
      <Grid item xs={12} lg={3}>
        <Select label="Duration" sx={{ width: "100%" }} value={0}>
          <MenuItem value={0} selected>
            All
          </MenuItem>
          <MenuItem value={7}>7 Days</MenuItem>
          <MenuItem value={30}>1 Month</MenuItem>
          <MenuItem value={90}>3 Month</MenuItem>
        </Select>
      </Grid>
      <Grid item xs={12} lg={3}>
        <Select
          label="Exchange"
          id="exchangeId"
          value={selectedExchange}
          // onChange={(e) => {
          //   setFormData({ ...formData, exchangeId: e.target.value });
          //   setSelectedExchange(e.target.value);
          // }}
          sx={{ width: "100%" }}
        >
          {exchangeList.map((ex) => (
            <MenuItem value={ex.value} key={ex.label}>
              {ex.label}
            </MenuItem>
          ))}
        </Select>
      </Grid>
      <Grid item xs={12} lg={3}>
        <Select
          label="Pair"
          id="pair"
          // value={formData.configuration.pair}
          // onChange={(e) =>
          //   setFormData({
          //     ...formData,
          //     configuration: {
          //       ...formData.configuration,
          //       pair: e.target.value,
          //     },
          //   })
          // }
          sx={{ width: "100%" }}
          disabled={!pairs.length}
        >
          {pairs.map((p, index) => (
            <MenuItem value={p.value} key={`${p.value}_${index}`}>
              {p.text}
            </MenuItem>
          ))}
        </Select>
      </Grid>
    </Grid>
  );
};

export default BotFilters;

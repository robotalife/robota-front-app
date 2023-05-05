import { Grid, MenuItem } from "@mui/material";
import { useContext, useState } from "react";
import Select from "../formElements/Select";
import { ExchangeContext } from "../../shared/providers/ExchangeProvider";
import Slider from "../formElements/Slider";

interface Props {
  onCreatedChange?: (e: Date | null) => void;
  onClosedChange?: (e: Date | null) => void;
}

const BotFilters = ({ onCreatedChange, onClosedChange }: Props) => {
  const { exchangeList, selectedExchange, setSelectedExchange, pairs } =
    useContext(ExchangeContext);

  const [value2, setValue2] = useState<number[]>([-100, 100]);
  const minDistance = 20;

  const handleChange2 = (
    event: Event,
    newValue: number | number[],
    activeThumb: number
  ) => {
    if (!Array.isArray(newValue)) {
      return;
    }

    if (newValue[1] - newValue[0] < minDistance) {
      if (activeThumb === 0) {
        const clamped = Math.min(newValue[0], 100 - minDistance);
        setValue2([clamped, clamped + minDistance]);
      } else {
        const clamped = Math.max(newValue[1], minDistance);
        setValue2([clamped - minDistance, clamped]);
      }
    } else {
      setValue2(newValue as number[]);
    }
  };

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
      <Grid item xs={12} lg={3}>
        <Slider
          label={"Profit"}
          getAriaLabel={() => "Minimum distance shift"}
          value={value2}
          onChange={handleChange2}
          valueLabelDisplay="auto"
          disableSwap
          min={-100}
          max={100}
          valueLabelFormat={(e) => `${e}%`}
        />
      </Grid>
    </Grid>
  );
};

export default BotFilters;

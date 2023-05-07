import { Container, Grid, MenuItem } from "@mui/material";
import { SyntheticEvent, useContext, useState } from "react";
import Select from "../formElements/Select";
import { ExchangeContext } from "../../shared/providers/ExchangeProvider";
import Slider from "../formElements/Slider";
import { IBotFilters } from "../../shared/interfaces/bots";
import { MyBotsContext } from "../../shared/providers/MyBotsProvider";

const BotFilters = () => {
  const { exchangeList, selectedExchange, setSelectedExchange, pairs } =
    useContext(ExchangeContext);
  const { filters, loading, setFilters } = useContext(MyBotsContext);
  const minDistance = 20;

  const handleProfitChange = (
    event: Event | SyntheticEvent<Element, Event>,
    newValue: number | number[]
  ) => {
    console.log(event, newValue);
    setFilters({ ...filters, profit: newValue as number[] });
  };

  return (
    <Container maxWidth="xl" sx={{ margin: 0 }}>
      <Grid
        container
        spacing={2}
        sx={{ mb: 3, pb: 3, borderBottom: "1px solid #eaecf0" }}
      >
        <Grid item xs={12} lg={3}>
          <Select
            label="Duration"
            sx={{ width: "100%" }}
            onChange={(e) => {
              setFilters({ ...filters, duration: e.target.value as number });
            }}
            value={filters.duration}
          >
            <MenuItem value={0}>All</MenuItem>
            <MenuItem value={7}>7 Days</MenuItem>
            <MenuItem value={30}>1 Month</MenuItem>
            <MenuItem value={90}>3 Month</MenuItem>
          </Select>
        </Grid>
        <Grid item xs={12} lg={3}>
          <Select
            label="Exchange"
            id="exchangeId"
            value={filters.exchange || selectedExchange}
            onChange={(e) => {
              setFilters({ ...filters, exchange: e.target.value as string });
              setSelectedExchange(e.target.value as string);
            }}
            sx={{ width: "100%" }}
          >
            {exchangeList.map((ex) => (
              <MenuItem value={ex.value} key={ex.label}>
                {ex.label}
              </MenuItem>
            ))}

            <MenuItem value={"all"}>All</MenuItem>
          </Select>
        </Grid>
        <Grid item xs={12} lg={3}>
          <Select
            label="Pair"
            id="pair"
            value={filters.pair || ""}
            sx={{ width: "100%" }}
            disabled={!pairs.length || filters.exchange === "all"}
            onChange={(e) =>
              setFilters({ ...filters, pair: e.target.value as string })
            }
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
            value={filters.profit}
            onChangeCommitted={handleProfitChange}
            valueLabelDisplay="auto"
            min={-100}
            max={100}
            valueLabelFormat={(e) => `${e}%`}
          />
        </Grid>
      </Grid>
    </Container>
  );
};

export default BotFilters;

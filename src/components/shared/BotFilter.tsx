import { Container, Grid } from "@mui/material";
import { SyntheticEvent, useContext, useState } from "react";
import { ExchangeContext } from "../../shared/providers/ExchangeProvider";
import Slider from "../formElements/Slider";
import { MyBotsContext } from "../../shared/providers/MyBotsProvider";
import ComboBox, { AutocompleteOption } from "../formElements/ComboBox";
import { altDurations } from "../../shared/consts/durations";
import Button from "../formElements/Button";
import { IconFilter } from "../../shared/icons/Icons";

const BotFilters = () => {
  const { exchangeList, selectedExchange, setSelectedExchange, pairs } =
    useContext(ExchangeContext);
  const { filters, loading, setFilters } = useContext(MyBotsContext);
  const [showFilters, setShowFilters] = useState(false);

  const comboExchangeList: AutocompleteOption[] = [
    {
      value: "",
      label: "All",
    },
    ...exchangeList.map((exchange) => {
      return { label: exchange.label, value: exchange.value };
    }),
  ];

  const comboPairsList: AutocompleteOption[] = [
    { value: null, label: "All" },
    ...pairs.map((pair) => {
      return { value: pair.value, label: pair.text };
    }),
  ];

  const handleProfitChange = (
    event: Event | SyntheticEvent<Element, Event>,
    newValue: number | number[]
  ) => {
    setFilters({ ...filters, profit: newValue as number[] });
  };

  return (
    <>
      <Grid container justifyContent={"flex-end"} sx={{ mb: 2 }} spacing={2}>
        <Grid item xs={12} lg={"auto"}>
          <Button
            variant="outlined"
            color="primary"
            onClick={() => {
              setShowFilters(!showFilters);
            }}
            fullWidth
          >
            <IconFilter style={{ marginRight: 8 }} />
            Filter
          </Button>
        </Grid>
      </Grid>
      {showFilters && (
        <Grid
          container
          spacing={2}
          sx={{ mb: 3, pb: 3, borderBottom: "1px solid #eaecf0" }}
        >
          <Grid item xs={12} lg={3}>
            <ComboBox
              label={"Duration"}
              sx={{ width: "100%" }}
              options={altDurations}
              onChange={(e, val) => {
                setFilters({
                  ...filters,
                  duration: val !== null ? Number(val.value) : 0,
                });
              }}
              value={
                altDurations.find(
                  (x) => x.value === filters.duration.toString()
                ) || { value: "0", label: "All" }
              }
              disabled={loading}
            />
          </Grid>
          <Grid item xs={12} lg={3}>
            <ComboBox
              label={"Exchange"}
              sx={{ width: "100%" }}
              options={comboExchangeList}
              onChange={(e, val) => {
                setFilters({
                  ...filters,
                  exchange: val !== null && val.value ? val.value : "all",
                });
                setSelectedExchange((val && (val.value as string)) || "");
              }}
              value={
                comboExchangeList.find((x) => x.value === selectedExchange) || {
                  value: "all",
                  label: "All",
                }
              }
              disabled={loading}
            />
          </Grid>
          <Grid item xs={12} lg={3}>
            <ComboBox
              label={"Pair"}
              sx={{ width: "100%" }}
              options={comboPairsList}
              onChange={(e, val) => {
                setFilters({
                  ...filters,
                  pair: val !== null && val.value ? val.value : "all",
                });
              }}
              value={
                comboPairsList.find((pair) => pair.value === filters.pair) || {
                  value: "all",
                  label: "All",
                }
              }
              disabled={!pairs.length || filters.exchange === "all" || loading}
            />
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
              disabled={loading}
            />
          </Grid>
        </Grid>
      )}
    </>
  );
};

export default BotFilters;

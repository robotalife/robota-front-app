import React, { useEffect, useRef } from "react";
import {
  createChart,
  IChartApi,
  ISeriesApi,
  Time,
  CandlestickData,
} from "lightweight-charts";

interface ChartData {
  time: Time;
  open: number;
  high: number;
  low: number;
  close: number;
}

const TradingViewChart = ({ data }: { data: ChartData[] }) => {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const chartInstanceRef = useRef<IChartApi | null>(null);
  const candlestickSeriesRef = useRef<ISeriesApi<
    "Candlestick" | "Line"
  > | null>(null);

  useEffect(() => {
    chartInstanceRef.current = createChart(chartContainerRef.current!, {
      width: 800,
      height: 400,
    });

    candlestickSeriesRef.current =
      chartInstanceRef.current.addCandlestickSeries();

    const formattedData: CandlestickData[] = data.map((item) => ({
      time: item.time,
      open: item.open,
      high: item.high,
      low: item.low,
      close: item.close,
    }));

    candlestickSeriesRef.current.setData(formattedData);

    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.remove();
      }
    };
  }, [data]);

  return <div ref={chartContainerRef}></div>;
};

export default TradingViewChart;

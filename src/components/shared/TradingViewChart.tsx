import { useEffect, useRef } from "react";
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

  // useEffect(() => {
  //   const candleSeries = chart.current.addCandlestickSeries({
  //     upColor: "#4bffb5",
  //     downColor: "#ff4976",
  //     borderDownColor: "#ff4976",
  //     borderUpColor: "#4bffb5",
  //     wickDownColor: "#838ca1",
  //     wickUpColor: "#838ca1",
  //   });

  //   // const areaSeries = chart.current.addAreaSeries({
  //   //   topColor: 'rgba(38,198,218, 0.56)',
  //   //   bottomColor: 'rgba(38,198,218, 0.04)',
  //   //   lineColor: 'rgba(38,198,218, 1)',
  //   //   lineWidth: 2
  //   // });

  //   // areaSeries.setData(areaData);

  //   const volumeSeries = chart.current.addHistogramSeries({
  //     color: "#182233",
  //     lineWidth: 2,
  //     priceFormat: {
  //       type: "volume",
  //     },
  //     overlay: true,
  //     scaleMargins: {
  //       top: 0.8,
  //       bottom: 0,
  //     },
  //   });

  //   volumeSeries.setData(volumeData);
  // }, []);

  // // Resize chart on container resizes.
  // useEffect(() => {
  //   resizeObserver.current = new ResizeObserver((entries) => {
  //     const { width, height } = entries[0].contentRect;
  //     chart.current.applyOptions({ width, height });
  //     setTimeout(() => {
  //       chart.current.timeScale().fitContent();
  //     }, 0);
  //   });

  //   resizeObserver.current.observe(chartContainerRef.current);

  //   return () => resizeObserver.current.disconnect();
  // }, []);

  useEffect(() => {
    chartInstanceRef.current = createChart(chartContainerRef.current!, {
      width: 800,
      height: 650,
      autoSize: true,
      layout: {
        textColor: "#000",
      },
      grid: {
        vertLines: {
          color: "#eee",
        },
        horzLines: {
          color: "#eee",
        },
      },
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

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
  ScriptableContext,
  ChartData,
  ChartOptions,
} from "chart.js";
import { Line } from "react-chartjs-2";

import classes from "./BotCardChart.module.scss";
import { faker } from "@faker-js/faker";
import {IChartData} from "../../../shared/interfaces/bots";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

const options: ChartOptions<"line"> = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false,
      position: "top" as const,
    },
    title: {
      display: false,
      text: "",
    },
  },
  scales: {
    x: {
      border: {
        display: false,
      },
      ticks: {
        display: false,
      },
      grid: {
        display: false,
      },
    },
    y: {
      border: {
        display: false,
      },
      ticks: {
        display: false,
      },
      grid: {
        display: false,
      },
    },
  },
};

interface Props {
  input : IChartData;
}

const data = (
    input: IChartData
): ChartData<"line", number[], string> => {
  let trajectory = -1;
  if(input.data && input.data[0] > input.data[input.data.length-1]){
    trajectory = +1;
  }
  return {
    labels:input.labels,
    datasets: [
      {
        fill: true,
        label: "Dataset 2",
        data: input.data ,
        borderColor:  trajectory<0 ? "#12B76A" : "#F04438",
        borderWidth: 2,
        backgroundColor: (context: ScriptableContext<"line">) => {
          const ctx = context.chart.ctx;
          const gradient = ctx.createLinearGradient(0, -140, 0, 65);
          gradient.addColorStop(0, trajectory<0 ? "#12B76A" : "#F04438");
          gradient.addColorStop(1, "#fff");
          return gradient;
        },
        tension: 0.3,
        pointRadius: 0,
      },
    ],
  };
};

const BotCardChart = ({ input }:  Props) => {
  return (
    <div className={classes.chartWrapper}>
      <Line options={options} data={data(input)} />
    </div>
  );
};

export default BotCardChart;

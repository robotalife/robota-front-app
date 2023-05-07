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

const labels = ["2", "4", "6", "8", "10", "12", "14"];

const data = (
  strategy: "long" | "short"
): ChartData<"line", number[], string> => {
  return {
    labels,
    datasets: [
      {
        fill: true,
        label: "Dataset 2",
        data: labels.map(() => faker.datatype.number({ min: 10, max: 50 })),
        borderColor: strategy === "long" ? "#12B76A" : "#F04438",
        borderWidth: 2,
        backgroundColor: (context: ScriptableContext<"line">) => {
          const ctx = context.chart.ctx;
          const gradient = ctx.createLinearGradient(0, -140, 0, 65);
          gradient.addColorStop(0, strategy === "long" ? "#12B76A" : "#F04438");
          gradient.addColorStop(1, "#fff");
          return gradient;
        },
        tension: 0.3,
        pointRadius: 0,
      },
    ],
  };
};

const BotCardChart = ({ strategy }: { strategy: "short" | "long" }) => {
  return (
    <div className={classes.chartWrapper}>
      <Line options={options} data={data(strategy)} />
    </div>
  );
};

export default BotCardChart;

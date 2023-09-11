import {
  CategoryScale,
  Chart as ChartJS,
  ChartData,
  ChartOptions,
  Filler,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  ScriptableContext,
  Title,
  Tooltip,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

import classes from './OverviewAreaChart.module.scss';
import { faker } from '@faker-js/faker';
import { IChartData } from '../../../shared/interfaces/bots';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Filler, Legend);

const options: ChartOptions<'line'> = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false,
      position: 'top' as const,
    },
    title: {
      display: false,
      text: '',
    },
  },
  scales: {
    x: {
      grid: {
        display: false,
      },
    },
    y: {
      grid: {
        // display: false,
      },
    },
  },
};

const labels = ['2', '4', '6', '8', '10', '12', '14', '16', '18', '20', '22', '24', '26', '28', '30'];

interface Props {
  input: IChartData;
}

const data = (input: IChartData): ChartData<'line', number[], string> => {
  return {
    labels: input.labels,
    datasets: [
      {
        fill: true,
        label: 'Dataset 2',
        data: input.data,
        borderColor: '#7F56D9',
        borderWidth: 2,
        backgroundColor: (context: ScriptableContext<'line'>) => {
          const ctx = context.chart.ctx;
          const gradient = ctx.createLinearGradient(0, -500, 0, 340);
          gradient.addColorStop(0, '#7F56D9ff');
          gradient.addColorStop(1, '#7F56D900');
          return gradient;
        },
        tension: 0.3,
        pointRadius: 0,
      },
    ],
  };
};

const OverviewAreaChart = ({ input }: Props) => {
  return (
    <div className={classes.chartWrapper}>
      <Line options={options} data={data(input)} />
    </div>
  );
};

export default OverviewAreaChart;

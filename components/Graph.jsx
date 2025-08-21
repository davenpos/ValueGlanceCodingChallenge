import { Line } from 'react-chartjs-2';
import {
  Chart,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from 'chart.js';
import { useContext } from 'react';
import { PricesContext } from './Main';

Chart.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend);

export default function Graph() {
  const prices = useContext(PricesContext);

  const chartData = {
    labels: prices.labels,
    datasets: [
      {
        label: 'IBM Stock Price',
        data: prices.data,
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: false,
      },
    },
  };

  return (
    <div>
      <Line data={chartData} options={options} />
    </div>
  );
}

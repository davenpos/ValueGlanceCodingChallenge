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
import { useState, useEffect, useContext } from 'react';
import { PricesContext } from './Main';

Chart.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend);

export default function Graph() {
  const prices = useContext(PricesContext);

  const [size, setSize] = useState(9);

  useEffect(() => {
    function updateSize() {
      if (window.innerWidth >= 768) setSize(12);
      else setSize(9);
    }

    updateSize();

    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  const chartData = {
    labels: prices.labels,
    datasets: [
      {
        label: 'IBM Stock Price',
        data: prices.data,
        fill: false,
        borderColor: 'oklch(79.2% 0.209 151.711)',
        tension: 0.1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: false,
      },
    },
    scales: {
      x: {
        grid: {
          color: 'white',
        },
        ticks: {
          color: 'white',
          font: {
            size,
          },
        },
      },
      y: {
        grid: {
          color: 'white',
        },
        ticks: {
          color: 'white',
          font: {
            size,
          },
        },
      },
    },
  };

  return (
    <div className="h-[300px] md:h-[500px] w-full py-2">
      <Line data={chartData} options={options} />
    </div>
  );
}

// import { useEffect, useState } from 'react';
// import { Line } from 'react-chartjs-2';
//  // Adjust path

// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   LineElement,
//   PointElement,
//   Title,
//   Tooltip,
//   Legend,
// } from 'chart.js';
// import { fetchWeeklySalesCSV } from '../utils/api';

// ChartJS.register(CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend);

// export default function WeeklySalesGraph() {
//   const [salesData, setSalesData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const getData = async () => {
//       try {
//         const data = await fetchWeeklySalesCSV();
//         setSalesData(data);
//       } catch (err) {
//         setError('Failed to load sales data');
//       } finally {
//         setLoading(false);
//       }
//     };
//     getData();
//   }, []);

//   if (loading) return <div>Loading...</div>;
//   if (error) return <div>{error}</div>;

//   const chartData = {
//     labels: salesData.map((data) => data.week),
//     datasets: [
//       {
//         label: 'Weekly Sales',
//         data: salesData.map((data) => parseFloat(data.sales)), // ensure it's numeric
//         borderColor: 'rgb(75, 192, 192)',
//         backgroundColor: 'rgba(75, 192, 192, 0.2)',
//         fill: true,
//       },
//     ],
//   };

//   return (
//     <div className="p-6 bg-white shadow rounded border border-purple-200">
//       <h2 className="text-2xl font-bold text-purple-700 mb-4">Weekly Sales</h2>
//       <Line data={chartData} />
//     </div>
//   );
// }







import { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import axios from 'axios';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend);

export default function WeeklySalesGraph() {
  const [salesData, setSalesData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAndProcessCSV = async () => {
      try {
        const response = await axios.get('http://localhost:8000/download-weekly-sales', {
          responseType: 'blob',
        });

        const text = await response.data.text();
        console.log("Raw CSV Text:\n", text);

        const lines = text.trim().split('\n');
        const headers = lines[0].split(',');

        const rawData = lines.slice(1).map((line) => {
          const values = line.split(',');
          const entry = {};
          headers.forEach((header, index) => {
            entry[header.trim()] = values[index].trim();
          });
          return entry;
        });

        // Aggregate weekly sales per "Week" field
        const weeklyMap = {};

        rawData.forEach((row) => {
          const week = `Week ${row.Week}`;
          const sales = parseFloat(row.weekly_sales);

          if (!weeklyMap[week]) {
            weeklyMap[week] = 0;
          }

          weeklyMap[week] += sales;
        });

        const weeklySales = Object.entries(weeklyMap).map(([week, sales]) => ({
          week,
          sales,
        }));

        console.log("Parsed & Aggregated Weekly Sales:", weeklySales);
        setSalesData(weeklySales);
      } catch (err) {
        setError('Failed to load sales data');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchAndProcessCSV();
  }, []);
  
  const downloadCSV = async () => {
    try {
      const response = await axios.get('http://localhost:8000/download-weekly-sales', {
        responseType: 'blob',
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'weekly_sales.csv'); // Change name as needed
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error('Failed to download CSV:', error);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  const chartData = {
    labels: salesData.map((data) => data.week),
    datasets: [
      {
        label: 'Weekly Sales',
        data: salesData.map((data) => data.sales),
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        fill: true,
      },
    ],
  };

  return (
    <div className="p-6 bg-white shadow rounded border border-purple-200">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-purple-700">Weekly Sales</h2>
        <button
          onClick={downloadCSV}
          className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 transition"
        >
          Download CSV
        </button>
      </div>
      <Line data={chartData} />
    </div>
  );
}







import { useEffect, useState } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend } from 'chart.js';

// Registering necessary chart.js components
ChartJS.register(CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend);

export default function WeeklySalesGraph() {
  const [salesData, setSalesData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWeeklySalesData = async () => {
      try {
        // Making the GET request using axios
        const response = await axios.get('https://e162-146-196-34-107.ngrok-free.app/download-weekly-sales');
        
        // Log the entire response to inspect its structure
        console.log('API Response:', response);
        console.log('API Data:', response.data);

        // Check if the response is an array
        const weeklySales = JSON.parse(response.data);


        // Validate if it's an array
        if (!Array.isArray(weeklySales)) {
          console.log('Response is not an array:', weeklySales);
          throw new Error('Sales data is not in the expected format (array)');
        }

        // If data exists, set it in state
        if (weeklySales.length === 0) {
          setError('No sales data available');
        } else {
          setSalesData(weeklySales);
        }
      } catch (err) {
        // Error handling in case of failure
        setError('Failed to load sales data');
        console.error('Error fetching weekly sales data:', err);
      } finally {
        // Set loading to false after the request is completed
        setLoading(false);
      }
    };

    fetchWeeklySalesData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  // Assuming weeklySales is an array of { week: string, sales: number }
  const chartData = {
    labels: salesData.map((data) => data.week), // X-axis labels (week names)
    datasets: [
      {
        label: 'Weekly Sales',
        data: salesData.map((data) => data.sales), // Y-axis data (sales numbers)
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        fill: true,
      },
    ],
  };

  return (
    <div className="p-6 bg-white shadow rounded border border-purple-200">
      <h2 className="text-2xl font-bold text-purple-700 mb-4">Weekly Sales</h2>
      <Line data={chartData} />
    </div>
  );
}

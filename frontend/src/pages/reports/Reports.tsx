import { useState } from 'react';
import { 
  BarChart2, 
  TrendingUp, 
  Download,
  Calendar,
  Filter,
  ChevronDown
} from 'lucide-react';
import { Bar, Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Reports = () => {
  const [dateRange, setDateRange] = useState('last30');
  const [reportType, setReportType] = useState('responses');

  // Mock data - in a real app this would come from API
  const responseData = {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
    datasets: [
      {
        label: 'SMS Responses',
        data: [120, 150, 180, 90],
        backgroundColor: 'rgba(37, 99, 235, 0.8)',
      },
      {
        label: 'Online Panel Responses',
        data: [80, 120, 140, 100],
        backgroundColor: 'rgba(124, 58, 237, 0.8)',
      },
    ],
  };

  const completionRateData = {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
    datasets: [
      {
        label: 'SMS Completion Rate',
        data: [75, 82, 88, 85],
        borderColor: 'rgb(37, 99, 235)',
        tension: 0.1,
        fill: false,
      },
      {
        label: 'Online Panel Completion Rate',
        data: [70, 75, 85, 82],
        borderColor: 'rgb(124, 58, 237)',
        tension: 0.1,
        fill: false,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div>
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Reports & Analytics</h1>
        <div className="mt-3 flex space-x-3 sm:mt-0">
          <button className="btn btn-outline inline-flex items-center">
            <Calendar className="mr-2 h-4 w-4" />
            <span>Last 30 Days</span>
            <ChevronDown className="ml-2 h-4 w-4" />
          </button>
          <button className="btn btn-primary inline-flex items-center">
            <Download className="mr-2 h-4 w-4" />
            Export Data
          </button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="card overflow-hidden">
          <div className="flex items-center justify-between p-5">
            <div>
              <p className="text-sm font-medium text-gray-500">Total Responses</p>
              <h3 className="mt-1 text-3xl font-semibold text-gray-900">1,234</h3>
            </div>
            <div className="rounded-full bg-primary-100 p-3 text-primary-600">
              <BarChart2 size={20} />
            </div>
          </div>
          <div className="bg-primary-50 px-5 py-1.5">
            <p className="text-xs font-medium text-primary-700">
              ↑ 12% from last month
            </p>
          </div>
        </div>

        <div className="card overflow-hidden">
          <div className="flex items-center justify-between p-5">
            <div>
              <p className="text-sm font-medium text-gray-500">Completion Rate</p>
              <h3 className="mt-1 text-3xl font-semibold text-gray-900">85%</h3>
            </div>
            <div className="rounded-full bg-green-100 p-3 text-green-600">
              <TrendingUp size={20} />
            </div>
          </div>
          <div className="bg-green-50 px-5 py-1.5">
            <p className="text-xs font-medium text-green-700">
              ↑ 5% from last month
            </p>
          </div>
        </div>

        <div className="card overflow-hidden">
          <div className="flex items-center justify-between p-5">
            <div>
              <p className="text-sm font-medium text-gray-500">Average Time</p>
              <h3 className="mt-1 text-3xl font-semibold text-gray-900">8m 12s</h3>
            </div>
            <div className="rounded-full bg-blue-100 p-3 text-blue-600">
              <Clock size={20} />
            </div>
          </div>
          <div className="bg-blue-50 px-5 py-1.5">
            <p className="text-xs font-medium text-blue-700">
              ↓ 30s from last month
            </p>
          </div>
        </div>

        <div className="card overflow-hidden">
          <div className="flex items-center justify-between p-5">
            <div>
              <p className="text-sm font-medium text-gray-500">Drop-off Rate</p>
              <h3 className="mt-1 text-3xl font-semibold text-gray-900">12%</h3>
            </div>
            <div className="rounded-full bg-yellow-100 p-3 text-yellow-600">
              <UserMinus size={20} />
            </div>
          </div>
          <div className="bg-yellow-50 px-5 py-1.5">
            <p className="text-xs font-medium text-yellow-700">
              ↓ 2% from last month
            </p>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="card">
          <div className="border-b border-gray-200 p-5">
            <h3 className="text-lg font-medium text-gray-900">Response Volume</h3>
          </div>
          <div className="p-5">
            <div className="h-80">
              <Bar data={responseData} options={chartOptions} />
            </div>
          </div>
        </div>

        <div className="card">
          <div className="border-b border-gray-200 p-5">
            <h3 className="text-lg font-medium text-gray-900">Completion Rates</h3>
          </div>
          <div className="p-5">
            <div className="h-80">
              <Line data={completionRateData} options={chartOptions} />
            </div>
          </div>
        </div>
      </div>

      {/* Detailed Stats Table */}
      <div className="mt-6">
        <div className="card">
          <div className="border-b border-gray-200 p-5">
            <h3 className="text-lg font-medium text-gray-900">Detailed Statistics</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                    Survey Name
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                    Responses
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                    Completion Rate
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                    Avg. Time
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                    Drop-off Rate
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {[
                  {
                    name: 'Consumer Technology Survey',
                    responses: 342,
                    completionRate: '88%',
                    avgTime: '7m 30s',
                    dropoffRate: '10%',
                  },
                  {
                    name: 'Political Opinion Poll',
                    responses: 1205,
                    completionRate: '92%',
                    avgTime: '8m 45s',
                    dropoffRate: '8%',
                  },
                  {
                    name: 'Healthcare Satisfaction',
                    responses: 567,
                    completionRate: '85%',
                    avgTime: '6m 15s',
                    dropoffRate: '15%',
                  },
                ].map((survey, index) => (
                  <tr key={index}>
                    <td className="whitespace-nowrap px-6 py-4">
                      <div className="text-sm font-medium text-gray-900">{survey.name}</div>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      <div className="text-sm text-gray-900">{survey.responses}</div>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      <div className="text-sm text-gray-900">{survey.completionRate}</div>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      <div className="text-sm text-gray-900">{survey.avgTime}</div>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      <div className="text-sm text-gray-900">{survey.dropoffRate}</div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;